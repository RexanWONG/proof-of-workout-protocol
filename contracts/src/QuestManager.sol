// SPDX-License-Identifier: MIT
// Sepolia : 0xBB87F16d5e565621580eCb612BD622F93EF93595
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./StravaDuration.sol";
import "./ProofOfWorkoutToken.sol";

contract QuestManager is ERC721, ERC721Enumerable, ERC721URIStorage, IERC721Receiver, Ownable {
    StravaDuration _stravaDuration;
    ProofOfWorkoutToken _powToken;
    
    using SafeMath for uint256; 
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Proof of Workout Protocol", "POWP") {
        _stravaDuration = StravaDuration(0x079dd6725908660db193381Af2B8DCa0Cbf94541);
        _powToken = ProofOfWorkoutToken(0x0d0677B34E3F16B41a0b600Ecfd09847C9D64625);
    } 

    uint256 public numOfQuestChallenges;

    uint256 public minPowTokensEasyDifficulty = 0;
    uint256 public minPowTokensMediumDifficulty = 1000;
    uint256 public minPowTokensHardDifficulty = 2000;

    struct Quest {
        uint256 tokenId;
        address creator;
        uint256 minStakeAmount;
        uint256 minWorkoutDuration;
        uint256 questDifficulty;
        uint256 minQuestDuration;
        address[] completedUsers;
        string metadataURI; 
    }

    struct QuestChallenges {
        uint256 challengeId;
        uint256 questTokenId;
        address submitter;
        uint256 workoutDuration;
        uint256 stakeAmount;
        uint256 startTime;
        bool completed;
    }

    mapping(uint256 => Quest) public quests;
    mapping(uint256 => QuestChallenges) public questChallenges;

    function createQuest (
        uint256 _minWorkoutDuration,
        uint256 _minStakeAmount,
        uint256 _questDifficulty,
        uint256 _minQuestDuration,
        string memory _metadataURI 
    ) public {  
        require(_questDifficulty == 1 || _questDifficulty == 2 || _questDifficulty == 3);

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(address(this), tokenId);
        _setTokenURI(tokenId, _metadataURI);

        Quest storage newQuest = quests[tokenId];

        newQuest.tokenId = tokenId;
        newQuest.creator = msg.sender;
        newQuest.minStakeAmount = _minStakeAmount;
        newQuest.minWorkoutDuration = _minWorkoutDuration;
        newQuest.questDifficulty = _questDifficulty;
        newQuest.minQuestDuration = _minQuestDuration;
        newQuest.metadataURI = _metadataURI;  
    } 

    function startQuest(
        uint256 _questTokenId
    ) payable public {
        Quest storage quest = quests[_questTokenId];
        require(msg.value >= quest.minStakeAmount, "You must stake enough ether to begin this quest");

        uint256 userPowTokenBalance = _powToken.getBalanceOfAddress(msg.sender);
        if (quest.questDifficulty == 2) {
            require(userPowTokenBalance >= minPowTokensMediumDifficulty);
        } else if (quest.questDifficulty == 3) {
            require(userPowTokenBalance >= minPowTokensHardDifficulty);
        }

        QuestChallenges storage newQuestChallenge = questChallenges[numOfQuestChallenges];

        newQuestChallenge.challengeId = numOfQuestChallenges;
        newQuestChallenge.questTokenId = _questTokenId;
        newQuestChallenge.submitter = msg.sender;
        newQuestChallenge.stakeAmount = msg.value;
        newQuestChallenge.startTime = block.timestamp;
        newQuestChallenge.completed = false;
    }

    function submitQuest(uint256 _challengeId, uint256 _activityId, string memory _authCode) payable public {
        QuestChallenges storage questChallenge = questChallenges[_challengeId];
        Quest storage quest = quests[questChallenge.questTokenId];

        require(questChallenge.submitter == msg.sender, "You must be this quest challenge's challenger");
        require(block.timestamp - questChallenge.startTime <= quest.minQuestDuration, "Time has passed, sorry");
        require(questChallenge.completed == false, "This quest has been completed");

        _stravaDuration.requestActivityDuration(_activityId, _authCode); 
        uint256 activityDuration = _stravaDuration.getDuration(_activityId);

        require(activityDuration >= quest.minQuestDuration, "Activity duration not long enough");

        uint256 powTokenReward = _powToken.computePowTokenReward(
            questChallenge.stakeAmount, 
            questChallenge.workoutDuration, 
            quest.questDifficulty  
        );

        questChallenge.completed = true;
        quest.completedUsers.push(msg.sender);
        payable(msg.sender).transfer(questChallenge.stakeAmount);
        safeTransferFrom(address(this), msg.sender, quest.tokenId); 
        _powToken.mintFromQuestCompletion(msg.sender, powTokenReward);
    }

    function failQuest(uint256 _challengeId) payable public {
        QuestChallenges storage questChallenge = questChallenges[_challengeId];
        Quest storage quest = quests[questChallenge.questTokenId];

        require(questChallenge.completed == false, "Quest has been completed");
        require(block.timestamp - questChallenge.startTime >= quest.minQuestDuration, "Quest challenge not yet over");
        require(quest.creator == msg.sender, "Only the creator of the quest can call this function");

        payable(msg.sender).transfer(questChallenge.stakeAmount);
        _powToken.burnFromFailure(questChallenge.submitter);
    }

    function getQuests() public view returns (Quest[] memory) {
        Quest[] memory allQuests = new Quest[](_tokenIdCounter.current());

        for (uint256 i = 0; i < _tokenIdCounter.current(); ++i) {
            Quest storage item = quests[i];
            allQuests[i] = item;
        }
        
        return allQuests;
    }

    function getQuestChallenges() public view returns (QuestChallenges[] memory) {
        QuestChallenges[] memory allQuestChallenges = new QuestChallenges[](numOfQuestChallenges);

        for (uint256 i = 0; i < numOfQuestChallenges ; ++i) {
            QuestChallenges storage item = questChallenges[i];
            allQuestChallenges[i] = item;
        }
        
        return allQuestChallenges;
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function onERC721Received(address, address, uint256, bytes memory) public virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }
}

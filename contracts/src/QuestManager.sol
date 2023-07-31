// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./StravaDuration.sol";
import "./ProofOfWorkoutToken.sol";
import "./AccountManager.sol";

contract QuestManager is ERC1155, Ownable, ProofOfWorkoutToken {
    StravaDuration stravaDuration;
    AccountManager accountManager;
    
    using SafeMath for uint256; 
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC1155("") ProofOfWorkoutToken() {
        // stravaDuration = StravaDuration()
        accountManager = AccountManager(0xf1A51D384aB338C5e2870200E1db04FFcB41364c);
    } 

    uint256 public numOfQuestChallenges;

    struct Quest {
        uint256 tokenId;
        address creator;
        uint256 currentNumOfWinners;
        uint256 maxQuestWinners;
        uint256 minWorkoutDuration;
        uint256 minStakeAmount;
        uint256 questDifficulty;
        uint256 minQuestDuration;
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
    mapping(uint256 => string) private _tokenURIs; 
    mapping(uint256 => QuestChallenges) public questChallenges;

    function createQuest (
        uint256 _maxQuestWinners,
        uint256 _minWorkoutDuration,
        uint256 _minStakeAmount,
        uint256 _questDifficulty,
        uint256 _minQuestDuration,
        string memory _metadataURI 
    ) public {  
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _mint(address(this), tokenId, _maxQuestWinners, bytes(_metadataURI));

        Quest storage newQuest = quests[tokenId];

        newQuest.tokenId = tokenId;
        newQuest.creator = msg.sender;
        newQuest.currentNumOfWinners = 0;
        newQuest.maxQuestWinners = _maxQuestWinners;
        newQuest.minWorkoutDuration = _minWorkoutDuration;
        newQuest.minStakeAmount = _minStakeAmount;
        newQuest.questDifficulty = _questDifficulty;
        newQuest.minQuestDuration = _minQuestDuration;
        newQuest.metadataURI = _metadataURI; 

        _setTokenURI(tokenId, _metadataURI);
    } 

    function startQuest(
        uint256 _questTokenId
    ) payable public {
        Quest storage quest = quests[_questTokenId];
        require(msg.value >= quest.minStakeAmount, "You must stake enough ether to begin this quest");

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

        require(quest.currentNumOfWinners < quest.maxQuestWinners, "Quest expired");
        require(questChallenge.submitter == msg.sender, "You must be this quest challenge's challenger");
        require(block.timestamp - questChallenge.startTime <= quest.minQuestDuration, "Time has passed, sorry");
        require(questChallenge.completed == false, "This quest has been completed");

        stravaDuration.requestActivityDuration(_activityId, _authCode); 
        uint256 activityDuration = stravaDuration.getDuration(_activityId);

        require(activityDuration >= quest.minQuestDuration, "Activity duration not long enough");

        uint256 powTokenReward = ProofOfWorkoutToken.computePowTokenReward(
            questChallenge.stakeAmount, 
            questChallenge.workoutDuration, 
            quest.questDifficulty  
        );

        questChallenge.completed = true;
        payable(msg.sender).transfer(questChallenge.stakeAmount);
        _safeTransferFrom(address(this), msg.sender, questChallenge.questTokenId, 1, "");
        ProofOfWorkoutToken._mintFromQuestCompletion(msg.sender, powTokenReward);

        quest.currentNumOfWinners++; 
    }

    function failQuest(uint256 _challengeId) payable public {
        QuestChallenges storage questChallenge = questChallenges[_challengeId];
        Quest storage quest = quests[questChallenge.questTokenId];

        require(questChallenge.completed == false, "Quest has been completed");
        require(block.timestamp - questChallenge.startTime >= quest.minQuestDuration, "Quest challenge not yet over");
        require(quest.creator == msg.sender, "Only the creator of the quest can call this function");

        payable(msg.sender).transfer(questChallenge.stakeAmount);
        ProofOfWorkoutToken._burnFromFailure(questChallenge.submitter);
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

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(exists(tokenId), "ERC1155Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        require(exists(tokenId), "ERC1155Metadata: URI query for nonexistent token");
        string memory _tokenURI = _tokenURIs[tokenId];

        return _tokenURI;
    }

    function exists(uint256 tokenId) public view returns (bool) {
        return tokenId <= _tokenIdCounter.current();
    }
}

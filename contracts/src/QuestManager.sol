// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract QuestManager is ERC1155, Ownable {
    using SafeMath for uint256; 
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC1155("") {}

    uint256 public numOfQuestChallenges;

    struct Quest {
        uint256 tokenId;
        address creator;
        uint256 maxQuestWinners;
        uint256 minWorkoutDuration;
        uint256 minStakeAmount;
        uint256 questDifficulty;
        uint256 maxQuestDuration;
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

    function startQuest(
        uint256 _questTokenId
    ) payable public {
        Quest storage quest = quests[_questTokenId];
        require(msg.value >= quest.minStakeAmount, "You must stake enough ether to begin this quest");
    
        uint256 serviceFee = (msg.value.mul(3)).div(100);
        (bool sentToOwner, ) = owner().call{value: serviceFee}("");
        require(sentToOwner, "Failed to send Ether to the owner");

        uint256 questCreatorFee = (msg.value.mul(4)).div(100);
        (bool sentToQuestCreator, ) = quest.creator.call{value: questCreatorFee}("");
        require(sentToQuestCreator, "Failed to send Ether to the quest creator");

        QuestChallenges storage newQuestChallenge = questChallenges[numOfQuestChallenges];

        newQuestChallenge.challengeId = numOfQuestChallenges;
        newQuestChallenge.questTokenId = _questTokenId;
        newQuestChallenge.submitter = msg.sender;
        newQuestChallenge.stakeAmount = msg.value;
        newQuestChallenge.startTime = block.timestamp;
        newQuestChallenge.completed = false;
    }

    function createQuest (
        uint256 _maxQuestWinners,
        uint256 _minWorkoutDuration,
        uint256 _minStakeAmount,
        uint256 _questDifficulty,
        uint256 _maxQuestDuration,
        string memory _metadataURI 
    ) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _mint(address(this), tokenId, _maxQuestWinners, bytes(_metadataURI));

        Quest storage newQuest = quests[tokenId];

        newQuest.tokenId = tokenId;
        newQuest.creator = msg.sender;
        newQuest.maxQuestWinners = _maxQuestWinners;
        newQuest.minWorkoutDuration = _minWorkoutDuration;
        newQuest.minStakeAmount = _minStakeAmount;
        newQuest.questDifficulty = _questDifficulty;
        newQuest.maxQuestDuration = _maxQuestDuration;
        newQuest.metadataURI = _metadataURI; 

        _setTokenURI(tokenId, _metadataURI);
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

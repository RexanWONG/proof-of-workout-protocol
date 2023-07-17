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

    constructor() ERC1155("https://myapi.com/{id}.json") {}

    struct Quest {
        uint256 tokenId;
        address creator;
        uint256 maxSubmissions;
        uint256 minDuration;
        uint256 minStakeAmount;
        uint256 createdTime;
        uint256 expiryTime;
    }

    mapping(uint256 => Quest) public _quests;

    function createQuest (
        uint256 _maxSubmissions,
        uint256 _minDuration,
        uint256 _minStakeAmount,
        uint256 _questDuration
    ) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _mint(msg.sender, tokenId, _maxSubmissions, "");

        Quest storage newQuest = _quests[tokenId];

        newQuest.tokenId = tokenId;
        newQuest.creator = msg.sender;
        newQuest.maxSubmissions = _maxSubmissions;
        newQuest.minDuration = _minDuration;
        newQuest.minStakeAmount = _minStakeAmount;
        newQuest.createdTime = block.timestamp;
        newQuest.expiryTime = block.timestamp + _questDuration;
    }

    function uri(uint256 _tokenId) override public pure returns (string memory) {
        return string(
            abi.encodePacked(
                "https://bafybeigndwui32yqiyzuswty73v74phdr7cgwkuh7mzyyfeezkengom75q.ipfs.nftstorage.link/",
                Strings.toString(_tokenId),".json"
            )
        );
    }

}

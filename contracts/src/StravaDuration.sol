// SPDX-License-Identifier: MIT 
// Sepolia : 0x079dd6725908660db193381Af2B8DCa0Cbf94541
pragma solidity 0.8.17;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

import "@openzeppelin/contracts/utils/Strings.sol";
  
contract StravaDuration is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;
   
    bytes32 private jobId;
    uint256 private fee;

    string public baseUrl;

    mapping(uint256 => uint256) public activityDurations;
    mapping(bytes32 => uint256) private requestIdToActivityId;

    event RequestMovingTime(bytes32 indexed requestId, uint256 volume);

    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
        setChainlinkOracle(0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD);
        jobId = "ca98366cc7314957b8c012c72f05aeeb";  
        fee = (1 * LINK_DIVISIBILITY) / 10; 

        baseUrl = "https://1954-173-244-62-58.ngrok-free.app/activity-duration?id=";
    }

    function requestActivityDuration(uint256 _activityId, string memory _authCode) public returns (bytes32 requestId) {
        if(activityDurations[_activityId] != 0){
            uint256 movingTime = activityDurations[_activityId];
            emit RequestMovingTime(0, movingTime); 
            return 0;
        } else {
            Chainlink.Request memory req = buildChainlinkRequest(  
                jobId,
                address(this),
                this.fulfill.selector
            );

            string memory apiUrl = returnApiUrl(_activityId, _authCode);

            req.add(
                "get",
                apiUrl
            );

            req.add("path", "moving_time"); 

            req.addInt("times", 1);

            requestId = sendChainlinkRequest(req, fee);
            requestIdToActivityId[requestId] = _activityId;
            return requestId;
        }
    }

    function fulfill(
        bytes32 _requestId,
        uint256 _movingTime
    ) public recordChainlinkFulfillment(_requestId) {
        uint256 activityId = requestIdToActivityId[_requestId];
        activityDurations[activityId] = _movingTime;

        emit RequestMovingTime(_requestId, _movingTime);
    }

    function getDuration(uint256 _activityId) public view returns (uint256) {
        return activityDurations[_activityId];
    }


    function returnApiUrl(uint256 _activityId, string memory _authCode) public view returns (string memory) {
        return string(
            abi.encodePacked(
                baseUrl, Strings.toString(_activityId), "&code=", _authCode
            )
        );
    }

    function updateBaseURL(string memory _newBaseUrl) public onlyOwner {
        baseUrl = _newBaseUrl;
    }

    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }
}
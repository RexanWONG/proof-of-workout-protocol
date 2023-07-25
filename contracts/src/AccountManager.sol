// SPDX-License-Identifier: MIT
// Sepolia : 0xD1C2bC232963430a40572F57024E444ffC10b666
pragma solidity 0.8.17;

contract AccountManager {
    struct Account {
        address walletAddress;
        bool isRegistered;
        uint256 stravaId;
    }

    mapping (address => Account) public accounts;

    function registerAccount(address _walletAddress, uint256 _stravaId) public {
        Account storage newRegisteredAccount = accounts[_walletAddress];
        require(_walletAddress == msg.sender, "You must be the owner of the wallet address to call this function");
        require(newRegisteredAccount.isRegistered == false, "Wallet address already registered");

        newRegisteredAccount.walletAddress = msg.sender;
        newRegisteredAccount.isRegistered = true;
        newRegisteredAccount.stravaId = _stravaId;
    }
 
    function checkIfAccountIsRegistered(address _walletAddress) public view returns (bool) {
        Account storage account = accounts[_walletAddress]; 
        return account.isRegistered;
    }

    function getRegisteredAccountDetails(address _walletAddress) public view returns (address, bool, uint256) {
        Account storage account = accounts[_walletAddress];

        return (
            account.walletAddress,
            account.isRegistered,
            account.stravaId
        );
    }
}
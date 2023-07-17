// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract ProofOfWorkoutToken is ERC20, ERC20Burnable, Pausable, Ownable {
    using SafeMath for uint256;
    
    uint256 public constant MAX_SUPPLY = 24 * 10**6 * 10**18; // 24 million POW tokens.
    uint256 public constant MAX_MINT_AMOUNT = 5000 * 10**18; // The cap is set to 5000 POW tokens.
    uint256 public HALVING_SUPPLY = MAX_SUPPLY / 2; // The supply at which rewards are halved.
    uint256 public CURRENT_MAX_REWARD_AMOUNT = MAX_MINT_AMOUNT; // The max supply of POW tokens that can be rewarded

    constructor() ERC20("ProofOfWorkout", "POW") {}
    
    function mint(address to, uint256 amount) public onlyOwner {
        require(amount <= CURRENT_MAX_REWARD_AMOUNT, "Cannot mint more than current reward per transaction");
        require(totalSupply() + amount <= MAX_SUPPLY, "Max supply exceeded");
        
        _mint(to, amount);
        
        // Halve the reward if the total supply has passed the halving threshold
        if(totalSupply() >= HALVING_SUPPLY){
            CURRENT_MAX_REWARD_AMOUNT = CURRENT_MAX_REWARD_AMOUNT.div(2);
            HALVING_SUPPLY = HALVING_SUPPLY.div(2); 
        }
    }

    function burnFromFailure(address from, uint256 amount) public onlyOwner {
        // Burn 5% of tokens upon quest failure
        uint256 burnAmount = (amount * 5).div(100);
        _burn(from, burnAmount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}

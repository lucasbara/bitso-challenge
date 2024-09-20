// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// @title Bitso Token Contract
// @author Lucas Barallobre 
// @notice This contract implements an ERC-20 token called Bitso (BTS) for the dApp exercise
contract Bitso is ERC20, ReentrancyGuard {
    uint256 public constant CLAIM_AMOUNT = 100 * 10**18; // 100 tokens with 18 decimals

    constructor(uint256 initialSupply) ERC20("Bitso", "BTS") {
        _mint(msg.sender, initialSupply);
    }

    // @notice Allows users to claim 100 BTS tokens whenever they need
    function claimTokens() external nonReentrant {
        _mint(msg.sender, CLAIM_AMOUNT);
    }
}

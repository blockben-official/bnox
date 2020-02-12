pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "./BNOXStandardExt.sol";

/// @author Blockben
/// @title BNOXToken
/// @notice BNOXToken implementation
contract BNOXToken is BNOXStandardExt, ERC20Detailed {

    /// @notice Constructor: creating initial supply and setting one admin
    /// @dev Not working with decimal numbers
    /// @param initialSupply The inital supply for the token
    constructor(uint256 initialSupply, address superadmin) BNOXStandardExt(superadmin) ERC20Detailed("BNOX Gold", "BNOX", 2) public {
        setDestinationAccountWL(msg.sender, true);
        setSourceAccountWL(msg.sender, true);
        _mint(msg.sender, initialSupply);
    }
}




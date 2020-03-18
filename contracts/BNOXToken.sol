pragma solidity 0.5.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "./BNOXStandardExt.sol";

/// @author Blockben
/// @title BNOXToken
/// @notice BNOXToken implementation
contract BNOXToken is BNOXStandardExt, ERC20Detailed {

    /// @notice Constructor: creating initial supply and setting one admin
    /// @dev Not working with decimal numbers
    /// @param superadmin superadmnin of the token
    constructor(address superadmin) BNOXStandardExt(superadmin) ERC20Detailed("BlockNoteX", "BNOX", 2) public {
    }
}




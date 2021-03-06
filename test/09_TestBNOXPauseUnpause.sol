pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BNOXToken.sol";

contract TestBNOXPauseUnpause {

  function test027Pause() public {

    address superAdmin = address(0xd6417e40ff10479CF3Fd14b395D0058827a693Fd);

    BNOXToken bnox = new BNOXToken(superAdmin);

    bnox.pause();

    Assert.equal(bnox.paused(), true, "The contract must be paused");

  }

  function test028Unpause() public {

    address superAdmin = address(0xd6417e40ff10479CF3Fd14b395D0058827a693Fd);

    BNOXToken bnox = new BNOXToken(superAdmin);

    bnox.pause();

    bnox.unpause();

    Assert.equal(bnox.paused(), false, "The contract must be unpaused");

  }

}
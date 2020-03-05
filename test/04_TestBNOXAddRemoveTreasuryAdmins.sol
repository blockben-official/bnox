pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BNOXToken.sol";

contract TestBNOXAddRemoveTreasuryAdmins {

  function test015AddTreasuryAdmin() public {

    address superAdmin = address(0xd6417e40ff10479CF3Fd14b395D0058827a693Fd);

    BNOXToken bnox = new BNOXToken(superAdmin);

    address newAdmin = 0xB9751d5cD0740Fa35D54542f11dB7a9fcAe2cf80;

    bnox.addTreasuryAdmin(newAdmin);

    Assert.equal(bnox.isTreasuryAdmin(newAdmin), true, "The newly added admin must be a treasury admin");
  }


  function test016RemoveAdmin() public {

    address superAdmin = address(0xd6417e40ff10479CF3Fd14b395D0058827a693Fd);

    BNOXToken bnox = new BNOXToken(superAdmin);

    address newAdmin = 0xB9751d5cD0740Fa35D54542f11dB7a9fcAe2cf80;

    bnox.addTreasuryAdmin(newAdmin);

    bnox.removeTreasuryAdmin(newAdmin);

    Assert.equal(bnox.isTreasuryAdmin(newAdmin), false, "The removed treasury admin must not be a treasury admin");
  }
}
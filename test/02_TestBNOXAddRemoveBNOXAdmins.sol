pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BNOXToken.sol";

contract TestBNOXAddRemoveBNOXAdmins {

  function test011AddBNOXAdmin() public {

    address superAdmin = address(0xd6417e40ff10479CF3Fd14b395D0058827a693Fd);

    BNOXToken bnox = new BNOXToken(100000000,superAdmin);

    address newAdmin = 0xB9751d5cD0740Fa35D54542f11dB7a9fcAe2cf80;

    bnox.addBNOXAdmin(newAdmin);

    Assert.equal(bnox.isBNOXAdmin(newAdmin), true, "The newly added admin must be an admin");
  }


  function test012RemoveBNOXAdmin() public {

    address superAdmin = address(0xd6417e40ff10479CF3Fd14b395D0058827a693Fd);

    BNOXToken bnox = new BNOXToken(100000000,superAdmin);

    address newAdmin = 0xB9751d5cD0740Fa35D54542f11dB7a9fcAe2cf80;

    bnox.addBNOXAdmin(newAdmin);

    bnox.removeBNOXAdmin(newAdmin);

    Assert.equal(bnox.isBNOXAdmin(newAdmin), false, "The removed admin must not be an admin");
  }
}
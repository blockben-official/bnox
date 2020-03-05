pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BNOXToken.sol";

contract TestBNOXAddRemoveKYCAdmins {

  function test013AddKYCAdmin() public {

    address superAdmin = address(0xd6417e40ff10479CF3Fd14b395D0058827a693Fd);

    BNOXToken bnox = new BNOXToken(superAdmin);

    address newAdmin = 0xB9751d5cD0740Fa35D54542f11dB7a9fcAe2cf80;

    bnox.addKYCAdmin(newAdmin);

    Assert.equal(bnox.isKYCAdmin(newAdmin), true, "The newly added admin must be an KYC admin");
  }


  function test014RemoveKYCAdmin() public {

    address superAdmin = address(0xd6417e40ff10479CF3Fd14b395D0058827a693Fd);

    BNOXToken bnox = new BNOXToken(superAdmin);

    address newAdmin = 0xB9751d5cD0740Fa35D54542f11dB7a9fcAe2cf80;

    bnox.addKYCAdmin(newAdmin);

    bnox.removeKYCAdmin(newAdmin);

    Assert.equal(bnox.isKYCAdmin(newAdmin), false, "The removed admin must not be a KYC admin");
  }
}
pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BNOXToken.sol";

contract TestBNOXSetAddresses {

  function test019SetTreasuryAddress() public {

    address superAdmin = address(0xd6417e40ff10479CF3Fd14b395D0058827a693Fd);

    BNOXToken bnox = new BNOXToken(superAdmin);

    address newTreasuryAddress = 0xB9751d5cD0740Fa35D54542f11dB7a9fcAe2cf80;

    bnox.setTreasuryAddress(newTreasuryAddress);

    Assert.equal(bnox.treasuryAddress(), newTreasuryAddress, "Treasury address does not match");
  }

  function test020SetGeneralFeeAddress() public {

    address superAdmin = address(0xd6417e40ff10479CF3Fd14b395D0058827a693Fd);

    BNOXToken bnox = new BNOXToken(superAdmin);

    address newFeeAddress = 0xB9751d5cD0740Fa35D54542f11dB7a9fcAe2cf80;

    bnox.setFeeAddress(newFeeAddress);

    Assert.equal(bnox.feeAddress(), newFeeAddress, "Fee address does not match");
  }

  function test021SetBsoAddress() public {

    address superAdmin = address(0xd6417e40ff10479CF3Fd14b395D0058827a693Fd);

    BNOXToken bnox = new BNOXToken(superAdmin);

    address newBsopoolAddress = 0xB9751d5cD0740Fa35D54542f11dB7a9fcAe2cf80;

    bnox.setBsopoolAddress(newBsopoolAddress);

    Assert.equal(bnox.bsopoolAddress(), newBsopoolAddress, "Bsopool address does not match");
  }


}
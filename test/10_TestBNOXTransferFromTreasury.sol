pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BNOXToken.sol";

contract TestBNOXTransferFromTreasury {

  function test029TransferFromTreasury() public {

    address superAdmin = address(0xd6417e40ff10479CF3Fd14b395D0058827a693Fd);

    BNOXToken bnox = new BNOXToken(100000000,superAdmin);

    address newFeeAddress = 0xB9751d5cD0740Fa35D54542f11dB7a9fcAe2cf80;

    bnox.setFeeAddress(newFeeAddress);
    bnox.setBsopoolAddress(newFeeAddress);
    bnox.setDestinationAccountWL(newFeeAddress, true);
    bnox.setDestinationAccountWL(newFeeAddress, true);

    bnox.setDestinationAccountWL(0xd6417e40ff10479CF3Fd14b395D0058827a693Fd, true);
    bnox.setTreasuryAddress(0xd6417e40ff10479CF3Fd14b395D0058827a693Fd);
    bnox.setSourceAccountWL(address(this), true);

    bnox.transfer(0xd6417e40ff10479CF3Fd14b395D0058827a693Fd, 10000);

    Assert.equal(bnox.balanceOf(0xd6417e40ff10479CF3Fd14b395D0058827a693Fd), 10000, "Owner should have 1000 BNOX after mint");
    Assert.equal(bnox.balanceOf(address(this)), 99990000, "Rest account balance should be 99990000");

  }

}
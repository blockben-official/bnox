pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BNOXToken.sol";

contract TestBNOXSetWhitelist {

  function test023SourceAccountWhitelisting() public {

    address superAdmin = address(0xd6417e40ff10479CF3Fd14b395D0058827a693Fd);

    BNOXToken bnox = new BNOXToken(100000000,superAdmin);

    address addressToWhitelist = 0xB9751d5cD0740Fa35D54542f11dB7a9fcAe2cf80;

    bnox.setSourceAccountWL(addressToWhitelist, true);

    Assert.equal(bnox.getSourceAccountWL(addressToWhitelist), true, "The whitelisted address does not match");

  }

  function test024DestinationAccountWhitelisting() public {

    address superAdmin = address(0xd6417e40ff10479CF3Fd14b395D0058827a693Fd);

    BNOXToken bnox = new BNOXToken(100000000,superAdmin);

    address addressToWhitelist = 0xB9751d5cD0740Fa35D54542f11dB7a9fcAe2cf80;

    bnox.setDestinationAccountWL(addressToWhitelist, true);

    Assert.equal(bnox.getDestinationAccountWL(addressToWhitelist), true, "The whitelisted address does not match");

  }

}
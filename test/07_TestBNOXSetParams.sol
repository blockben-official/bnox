pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BNOXToken.sol";

contract TestBNOXSetParams {

  function test022SetUrl() public {

    address superAdmin = address(0xd6417e40ff10479CF3Fd14b395D0058827a693Fd);

    BNOXToken bnox = new BNOXToken(superAdmin);

    string memory newUrl = "http://xxx.x";

    bnox.setUrl(newUrl);

    Assert.equal(bnox.url(), newUrl, "Set url does not match");
  }


  function test023SetGeneralFee() public {

    address superAdmin = address(0xd6417e40ff10479CF3Fd14b395D0058827a693Fd);

    BNOXToken bnox = new BNOXToken(superAdmin);

    uint16 newGeneralFee16 = 100;
    uint256 newGeneralFee256 = newGeneralFee16;

    bnox.setGeneralFee(newGeneralFee16);

    uint256 resultFee256 = bnox.generalFee();

    Assert.equal(resultFee256, newGeneralFee256, "General fee value does not match");
  }

  function test024SetBsolFee() public {

    address superAdmin = address(0xd6417e40ff10479CF3Fd14b395D0058827a693Fd);

    BNOXToken bnox = new BNOXToken(superAdmin);

    uint16 newBsoFee16 = 66;
    uint256 newBsoFee256 = newBsoFee16;

    bnox.setBsoFee(newBsoFee16);

    uint256 resultBsoFee256 = bnox.bsoFee();

    Assert.equal(resultBsoFee256, newBsoFee256, "Bso fee value does not match");
  }



}
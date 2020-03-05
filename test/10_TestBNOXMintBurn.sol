pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BNOXToken.sol";

contract TestBNOXSetMintBurn {

  function test029Mint() public {

    address superAdmin = address(0xd6417e40ff10479CF3Fd14b395D0058827a693Fd);

    BNOXToken bnox = new BNOXToken(superAdmin);

    // for KYC, originator has to be a KYC admin
    bnox.addKYCAdmin(address(this));

    bnox.setDestinationAccountWL(tx.origin, true);
    bnox.setSourceAccountWL(tx.origin, true);
    bnox.setTreasuryAddress(tx.origin);

    bnox.addTreasuryAdmin(address(this));

    bnox.mint(tx.origin, 10000);

    uint expectedIncreasedTokenSupply = 10000;

    Assert.equal(bnox.balanceOf(tx.origin), 10000, "Owner should have 1000 BNOX after mint");

    Assert.equal(bnox.totalSupply(), expectedIncreasedTokenSupply, "Token supply must be 10000 after mint");

  }

  function test030MintToAccount() public {

    address superAdmin = address(0xd6417e40ff10479CF3Fd14b395D0058827a693Fd);
    address toMint = address(0xF6baac6F8979Fab38a73E28307299d9cf2DAD4c0);

    BNOXToken bnox = new BNOXToken(superAdmin);

    // for KYC, originator has to be a KYC admin
    bnox.addKYCAdmin(address(this));

    bnox.setDestinationAccountWL(toMint, true);
    bnox.setSourceAccountWL(toMint, true);

    bnox.addTreasuryAdmin(address(this));

    bnox.mint(toMint, 10000);

    uint expectedIncreasedTokenSupply = 10000;

    Assert.equal(bnox.balanceOf(toMint), 10000, "To mint account should have 1000 BNOX after mint");

    Assert.equal(bnox.totalSupply(), expectedIncreasedTokenSupply, "Token supply must be 10000 after mint");

  }


}
pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BNOXToken.sol";

contract TestBNOXTokenInitialParameters {

  function test001TokenName() public {
    BNOXToken bnox = BNOXToken(DeployedAddresses.BNOXToken());

    string memory tokenName = "BNOX Gold";

    Assert.equal(bnox.name(), tokenName, "Token name must be BNOX Gold");
  }

  function test002InitialSupply() public {
    BNOXToken bnox = BNOXToken(DeployedAddresses.BNOXToken());

    uint initialTokenSuppy = 100000000;

    Assert.equal(bnox.totalSupply(), initialTokenSuppy, "Initial token supply must be 100000000");
  }

  function test003TokenSymbol() public {
    BNOXToken bnox = BNOXToken(DeployedAddresses.BNOXToken());

    string memory tokenSymbol = "BNOX";

    Assert.equal(bnox.symbol(), tokenSymbol, "Token symbol must be BNOX");
  }

  function test004InitialTokenAllocation() public {
    BNOXToken bnox = BNOXToken(DeployedAddresses.BNOXToken());

    uint expectedTokenSupply = 100000000;

    Assert.equal(bnox.balanceOf(tx.origin), expectedTokenSupply, "Owner should have 100000000 BNOX initially");
  }

  function test005InitialAdmin() public {
    BNOXToken bnox = BNOXToken(DeployedAddresses.BNOXToken());

    bool expected = true;

    Assert.equal(bnox.isBNOXAdmin(tx.origin), expected, "Install address must be admin");
  }

  function test006AdminDestinationWL() public {
    BNOXToken bnox = BNOXToken(DeployedAddresses.BNOXToken());

    bool expected = true;

    Assert.equal(bnox.getDestinationAccountWL(tx.origin), expected, "Install address must be destination whitelisted");
  }

  function test007AdminSourceWL() public {
    BNOXToken bnox = BNOXToken(DeployedAddresses.BNOXToken());

    bool expected = true;

    Assert.equal(bnox.getSourceAccountWL(tx.origin), expected, "Install address must be source whitelisted");
  }

  function test008AdminTreasury() public {
    BNOXToken bnox = BNOXToken(DeployedAddresses.BNOXToken());
    
    address nulll = 0x0000000000000000000000000000000000000000;

    Assert.equal(bnox.treasuryAddress(), nulll, "Treasury address must be null");
  }

  function test009Paused() public {
    BNOXToken bnox = BNOXToken(DeployedAddresses.BNOXToken());

    bool expected = false;

    Assert.equal(bnox.paused(), expected, "Contras must not be paused after install");
  }

  function test010NoAnAdmin() public {
    BNOXToken bnox = BNOXToken(DeployedAddresses.BNOXToken());

    bool expected = true;

    Assert.equal(bnox.isBNOXAdmin(0xB9751d5cD0740Fa35D54542f11dB7a9fcAe2cf80), expected, "Other admin address must not be admin");
  }


//  function testInitialBalanceWithNewMetaCoin() {
//    MetaCoin meta = new MetaCoin();

//    uint expected = 10000;

//    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
//  }
}
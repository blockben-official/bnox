var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var BalanceInitiator;

contract('BNOXToken', function(accounts) {
    it("104. test of BNOXToken: initial allocatin of tokens", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.balanceOf(accounts[0], {from: accounts[0]});             
        }).then(function(result) {
            BalanceInitiator = result;
            assert.equal(BalanceInitiator, 0, "Initial balance of the initiator not ok"); 
        }); 
    });
});

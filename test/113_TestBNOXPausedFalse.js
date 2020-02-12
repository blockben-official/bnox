var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var paused;

contract('BNOXToken', function(accounts) {
    it("113. test of BNOXToken: Initial Token paused is false", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.paused({from: accounts[0]});             
        }).then(function(result) {
            paused = result;
            assert.equal(paused, false, "Initially the token should not be paused"); 
        }); 
    });
});

var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var Balance;
var Balance;
var Supply;

contract('BNOXToken', function(accounts) {
    it("167. test of BNOXToken: Mint token but not whitelisted", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.mint(accounts[1], 155, {from: accounts[0]});             
        }).then(function(result) {
            assert(false, "Calling mint to a non whitelisted account is not allowed");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert(true, "Calling mint to a non whitelisted account is not allowed");   
        });
    });
});

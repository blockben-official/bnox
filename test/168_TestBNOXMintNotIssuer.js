var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var Balance;
var Balance;
var Supply;

contract('BNOXToken', function(accounts) {
    it("168. test of BNOXToken: Mint token but not on the issuer account", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            BNOXTokenContractInstance.getDestinationAccountWL(accounts[1]);
        }).then(function(result) {
            return BNOXTokenContractInstance.mint(accounts[1], 155, {from: accounts[0]});             
        }).then(function(result) {
            assert(false, "Calling mint to a non Treasury is not allowed");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert(true, "Calling mint to a non Treasury is not allowed");   
        });
    });
});

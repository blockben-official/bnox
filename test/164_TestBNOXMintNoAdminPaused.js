var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var Balance;
var Balance;
var Supply;

contract('BNOXToken', function(accounts) {
    it("164. test of BNOXToken: Mint token without admin rights, paused", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.pause({from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.mint(accounts[0], 155, {from: accounts[0]});             
        }).then(function(result) {
            assert(false, "Mint is not possible if the token is paused");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert(true, "Mint is not possible if the token is paused");   
        });
    });
});

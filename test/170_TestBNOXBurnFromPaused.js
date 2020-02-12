var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var Balance;
var Supply;
var event;

contract('BNOXToken', function(accounts) {
    it("170. test of BNOXToken: Burn token from, paused", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.addBNOXAdmin(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.approve(accounts[1], 1550000, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.pause({from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.burnFrom(accounts[0], 1550000, {from: accounts[1]});             
        }).then(function(result) {
        }).then(function(result) {
            assert(false, "Mint is not possible if the token is paused");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert(true, "Mint is not possible if the token is paused");   
        });
    });
});

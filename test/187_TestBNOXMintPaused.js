var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var Balance;
var Balance;
var Supply;

contract('BNOXToken', function(accounts) {
    it("187. test of BNOXToken: Mint token paused contract", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.addTreasuryAdmin(accounts[0], {from: accounts[0]});              
        }).then(function(result) {
            return BNOXTokenContractInstance.addKYCAdmin(accounts[0], {from: accounts[0]});              
        }).then(function(result) {
            return BNOXTokenContractInstance.setDestinationAccountWL(accounts[0], {from: accounts[0]});              
        }).then(function(result) {
            return BNOXTokenContractInstance.pause({from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.mint(accounts[0], 155, {from: accounts[0]});             
        }).then(function(result) {
            assert(false, "Mint is not possible if the token is paused");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert.include(errorMessage, 'The token is paused!');
            assert(true, "Mint is not possible if the token is paused");   
        });
    });
});

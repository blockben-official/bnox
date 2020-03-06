var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var Balance;
var Supply;
var event;

contract('BNOXToken', function(accounts) {
    it("194. test of BNOXToken: Burn token from, paused", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.addTreasuryAdmin(accounts[0], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.addTreasuryAdmin(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setTreasuryAddress(accounts[0], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.addKYCAdmin(accounts[0], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setDestinationAccountWL(accounts[0], true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setSourceAccountWL(accounts[0], true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.mint(accounts[0], 1550000, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.approve(accounts[1], 1550000, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.pause({from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.burn(1550000, {from: accounts[1]});             
        }).then(function(result) {
        }).then(function(result) {
            assert(false, "Mint is not possible if the token is paused");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert.include(errorMessage, 'The token is paused!');
            assert(true, "Mint is not possible if the token is paused");   
        });
    });
});

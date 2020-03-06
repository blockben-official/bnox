var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var fromBalance;
var toBalance;
var event;

contract('BNOXToken', function(accounts) {
    it("209. test of BNOXToken: Transfer - Destination account not whitelisted", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.setFeeAddress(accounts[5], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.addKYCAdmin(accounts[0], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setBsopoolAddress(accounts[6], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setSourceAccountWL(accounts[5],true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setSourceAccountWL(accounts[6],true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setSourceAccountWL(accounts[0],true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.transfer(accounts[1], 100 ,{from: accounts[0]});             
        }).then(function(result) {
            assert(false, "Destination account not whitelisted");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert.include(errorMessage, 'locked by the destination account whitelist');
            assert(true, "Destination account not whitelisted");   
        });
    });
});
var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var fromBalance;
var toBalance;
var event;

contract('BNOXToken', function(accounts) {
    it("185. test of BNOXToken: Transfer - Sourcen account not whitelisted", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.setFeeAddress(accounts[5], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setBsopoolAddress(accounts[6], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setDestinationAccountWL(accounts[5],true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setDestinationAccountWL(accounts[1],true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.transfer(accounts[1], 100 ,{from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.transfer(accounts[0], 100 ,{from: accounts[1]});             
        }).then(function(result) {
            assert(false, "Source account not whitelisted");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert(true, "Source account not whitelisted");   
        });
    });
});
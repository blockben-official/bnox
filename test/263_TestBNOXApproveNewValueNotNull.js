var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var fromBalance;
var toBalance;
var event;
var amountAllowed;

contract('BNOXToken', function(accounts) {
    it("263. test of BNOXToken: Approve - Paused", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.setFeeAddress(accounts[5], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.addKYCAdmin(accounts[0], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setBsopoolAddress(accounts[6], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setDestinationAccountWL(accounts[5],true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setDestinationAccountWL(accounts[6],true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.approve(accounts[2],1000000, {from: accounts[0]});
        }).then(function(result) {
            return BNOXTokenContractInstance.approve(accounts[2],500000, {from: accounts[0]});
        }).then(function(result) {
            assert(false, "Approve must be zero first");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert.include(errorMessage, 'approve must be set to zero first');
            assert(true, "Approve must be zero first");   
        });
    });
});

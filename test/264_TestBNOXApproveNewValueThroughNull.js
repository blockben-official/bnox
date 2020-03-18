var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var fromBalance;
var toBalance;
var event;
var amountAllowed;

contract('BNOXToken', function(accounts) {
    it("264. test of BNOXToken: Approve - Paused", function() {
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
            return BNOXTokenContractInstance.approve(accounts[2],0, {from: accounts[0]});
        }).then(function(result) {
            return BNOXTokenContractInstance.approve(accounts[2],500000, {from: accounts[0]});
        }).then(function(result) {
            return BNOXTokenContractInstance.allowance(accounts[0],accounts[2]);
        }).then(function(result) {
            amountAllowed = result;    
            assert.equal(amountAllowed,500000, "Allowed amount must be 500000");   
        });
    });
});

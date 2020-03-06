var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var fromBalance;
var toBalance;
var event;

contract('BNOXToken', function(accounts) {
    it("216. test of BNOXToken: TransferFrom - without allowance", function() {
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
            return BNOXTokenContractInstance.setDestinationAccountWL(accounts[1],true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setSourceAccountWL(accounts[0],true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setSourceAccountWL(accounts[2],true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.transferFrom(accounts[0], accounts[1], 50 ,{from: accounts[2]});             
        }).then(function(result) {
            assert(false, "No allowance for transfer from");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert.include(errorMessage, 'transfer amount exceeds balance');
            assert(true, "No allowance for transfer from");   
        });
    });
});

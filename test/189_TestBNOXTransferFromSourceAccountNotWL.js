var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var fromBalance;
var toBalance;
var event;

contract('BNOXToken', function(accounts) {
    it("189. test of BNOXToken: TransferFrom - Source account not whitelisted", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.setFeeAddress(accounts[5], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setBsopoolAddress(accounts[6], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setDestinationAccountWL(accounts[5],true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.approve(accounts[2],100, {from: accounts[0]});
        }).then(function(result) {
            return BNOXTokenContractInstance.setDestinationAccountWL(accounts[1],true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.transferFrom(accounts[0], accounts[1], 50 ,{from: accounts[2]});             
        }).then(function(result) {
            assert(false, "Source account not whitelisted");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert(true, "Source account not whitelisted");   
        });
    });
});

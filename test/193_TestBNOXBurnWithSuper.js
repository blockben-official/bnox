var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var Balance;
var Supply;
var event;

contract('BNOXToken', function(accounts) {
    it("193. test of BNOXToken: Burn token from with super admin", function() {
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
            return BNOXTokenContractInstance.burn(1550000, {from: accounts[9]});             
        }).then(function(result) {
            assert(false, "Calling mint to a non Treasury is not allowed");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert.include(errorMessage, 'caller does not have the TreasuryAdmin role', 'string contains substring');
            assert(true, "Calling mint to a non Treasury is not allowed");   
        });
    });
});

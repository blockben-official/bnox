var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var isAdmin;
var event;

contract('BNOXToken', function(accounts) {
    it("136. test of BNOXToken: Remove a KYC admin with treasury admin", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.addKYCAdmin(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.addTreasuryAdmin(accounts[2], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.removeKYCAdmin(accounts[1], {from: accounts[2]});             
        }).then(function(result) {
            assert(false, "Removing a KYC admin from a non admin account is not allowed");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert.include(errorMessage, 'caller does not have the BNOXAdmin role', 'string contains substring');
            assert(true, "Removing a KYC admin from a non admin account is not allowed");   
        });
    });
});

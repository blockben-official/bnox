var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var isAdmin;
var event;

contract('BNOXToken', function(accounts) {
    it("139. test of BNOXToken: Remove an admin with KYC admin", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.addTreasuryAdmin(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.addKYCAdmin(accounts[2], {from: accounts[1]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.removeTreasuryAdmin(accounts[1], {from: accounts[2]});             
        }).then(function(result) {
            assert(false, "Removing a treasury admin from a non BNOX admin account is not allowed");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert.include(errorMessage, 'caller does not have the BNOXAdmin role', 'string contains substring');
            assert(true, "Removing a treasury admin from a non BNOX admin account is not allowed");   
        });
    });
});

var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var errorMessage;

contract('BNOXToken', function(accounts) {
    it("142. test of BNOXToken: Add an admin with KYC admin", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.addKYCAdmin(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.addBNOXAdmin(accounts[2], {from: accounts[1]});             
        }).then(function(result) {
            assert(false, "Adding an admin from a non admin account is not allowed");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert.include(errorMessage, 'caller does not have the BNOXAdmin role', 'string contains substring');
            assert(true, "Addmin and admin from a non admin account is not allowed");   
        });
    });
});

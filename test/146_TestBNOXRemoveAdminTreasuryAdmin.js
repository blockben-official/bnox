var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var isAdmin;
var event;

contract('BNOXToken', function(accounts) {
    it("146. test of BNOXToken: Remove an admin with treasury admin", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.addTreasuryAdmin(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.addBNOXAdmin(accounts[2], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.removeBNOXAdmin(accounts[2], {from: accounts[1]});             
        }).then(function(result) {
            assert(false, "Removing an admin from a non admin account is not allowed");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert.include(errorMessage, 'caller does not have the BNOXAdmin role', 'string contains substring');
            assert(true, "Removing an admin from a non admin account is not allowed");   
        });
    });
});

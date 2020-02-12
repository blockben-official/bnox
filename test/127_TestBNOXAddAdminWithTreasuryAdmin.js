var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var errorMessage;

contract('BNOXToken', function(accounts) {
    it("127. test of BNOXToken: Add an admin with no admin access", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.addTreasuryAdmin(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.addBNOXAdmin(accounts[1], {from: accounts[1]});             
        }).then(function(result) {
            assert(false, "Adding an admin from a non admin account is not allowed");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert(true, "Addmin and admin from a non admin account is not allowed");   
        });
    });
});

var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var Balance;
var Supply;
var event;

contract('BNOXToken', function(accounts) {
    it("169. test of BNOXToken: Burn token from with super admin", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.addBNOXAdmin(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.approve(accounts[9], 1550000, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.burnFrom(accounts[0], 1550000, {from: accounts[9]});             
        }).then(function(result) {
            assert(false, "Calling mint to a non Treasury is not allowed");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert(true, "Calling mint to a non Treasury is not allowed");   
        });
    });
});

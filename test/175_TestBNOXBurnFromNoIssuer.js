var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var Balance;
var Balance;
var Supply;

contract('BNOXToken', function(accounts) {
    it("175. test of BNOXToken: Burn from token with admin rights but with allowance but not an treasury", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.addBNOXAdmin(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.approve(accounts[0], 200, {from: accounts[1]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.burnFrom(accounts[1], 155, {from: accounts[0]});             
        }).then(function(result) {
            assert(false, "Calling burn from a non Treasury account is not allowed");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert(true, "Calling burn from a non Treasury account is not allowed");   
        });
    });
});

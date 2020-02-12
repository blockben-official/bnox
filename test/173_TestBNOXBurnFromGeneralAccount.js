var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var Balance;
var Balance;
var Supply;

contract('BNOXToken', function(accounts) {
    it("173. test of BNOXToken: Burn from token without admin rights", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.burnFrom(accounts[1], 155, {from: accounts[0]});             
        }).then(function(result) {
            assert(false, "Calling burn from a non treasury admin account is not allowed");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert(true, "Calling burn from a non treasury admin account is not allowed");   
        });
    });
});

var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var Balance;
var Balance;
var Supply;

contract('BNOXToken', function(accounts) {
    it("189. test of BNOXToken: Mint token without any admin rights", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.mint(accounts[1], 155, {from: accounts[1]});             
        }).then(function(result) {
            assert(false, "Calling mint from a non admin account is not allowed");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert.include(errorMessage, 'caller does not have the TreasuryAdmin role', 'string contains substring');
            assert(true, "Calling mint from a non admin account is not allowed");   
        });
    });
});

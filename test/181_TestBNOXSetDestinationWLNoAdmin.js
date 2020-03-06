var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var Balance;
var Balance;
var Supply;

contract('BNOXToken', function(accounts) {
    it("181. test of BNOXToken: set destination lock without admin rights", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.setDestinationAccountWL(accounts[0],true, {from: accounts[1]});             
        }).then(function(result) {
            assert(false, "Calling setDestinationAddressLock from a non admin account is not allowed");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert.include(errorMessage, 'caller does not have the KYCAdmin role', 'string contains substring');
            assert(true, "Calling setDestinationAddressLock from a non admin account is not allowed");   
        });
    });
});

var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var paused1;
var paused2;
var paused3;

contract('BNOXToken', function(accounts) {
    it("117. test of BNOXToken: pause no right", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.paused({from: accounts[0]});             
        }).then(function(result) {
            paused1 = result;
            return BNOXTokenContractInstance.pause({from: accounts[1]});    
        }).then(function(result) {
            assert(false, "Pause is allowed only from the BNOX role");                     
        }).catch(function(error) {
            errorMessage = error.toString();
            assert.include(errorMessage, 'caller does not have the BNOXAdmin role', 'string contains substring');
            assert(true, "Addmin a KYC admin from a non admin account is not allowed");   
        });
    });
});

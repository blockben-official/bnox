var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var generalFee;
var event;

contract('BNOXToken', function(accounts) {
    it("170. test of BNOXToken: Set general fee KYC admin", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.addKYCAdmin(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setGeneralFee(accounts[1], {from: accounts[1]});             
        }).then(function(result) {
            assert(false, "Calling setGeneralFee from a non admin account is not allowed");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert.include(errorMessage, 'caller does not have the BNOXAdmin role', 'string contains substring');
            assert(true, "Calling setGeneralFee from a non admin account is not allowed");   
        });
    });
});


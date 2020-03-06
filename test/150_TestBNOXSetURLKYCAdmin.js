var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var url;

contract('BNOXToken', function(accounts) {
    it("150. test of BNOXToken: Set url from KYC admin", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.addKYCAdmin(accounts[1], {from: accounts[1]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setUrl("http://test", {from: accounts[1]});             
        }).then(function(result) {
            assert(false, "Calling setSourceAddressLock from a non BNOX admin account is not allowed");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert.include(errorMessage, 'caller does not have the BNOXAdmin role', 'string contains substring');
            assert(true, "Calling setSourceAddressLock from a non BNOX admin account is not allowed");   
        });
    });
});


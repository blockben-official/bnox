var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var bsopoolAddress;
var event;

contract('BNOXToken', function(accounts) {
    it("166. test of BNOXToken: Set bsopool address treasury admin", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.addTreasuryAdmin(accounts[1], {from: accounts[1]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setBsopoolAddress(accounts[1], {from: accounts[1]});             
        }).then(function(result) {
            assert(false, "Calling setBsopoolAddress from a non admin account is not allowed");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert.include(errorMessage, 'caller does not have the BNOXAdmin role', 'string contains substring');
            assert(true, "Calling setBsopoolAddress from a non admin account is not allowed");   
        });
    });
});


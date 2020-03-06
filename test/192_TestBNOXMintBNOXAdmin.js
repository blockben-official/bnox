var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var Balance;
var Balance;
var Supply;

contract('BNOXToken', function(accounts) {
    it("192. test of BNOXToken: Mint with BNOX admin", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
        }).then(function(result) {
            return BNOXTokenContractInstance.addKYCAdmin(accounts[0], {from: accounts[0]});              
        }).then(function(result) {
            return BNOXTokenContractInstance.setDestinationAccountWL(accounts[1], {from: accounts[0]});              
        }).then(function(result) {
            return BNOXTokenContractInstance.mint(accounts[1], 155, {from: accounts[0]});             
        }).then(function(result) {
            assert(false, "Calling mint to a non Treasury is not allowed");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert.include(errorMessage, 'caller does not have the TreasuryAdmin role', 'string contains substring');
            assert(true, "Calling mint to a non Treasury is not allowed");   
        });
    });
});

var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var issuerAddress;
var event;

contract('BNOXToken', function(accounts) {
    it("156. test of BNOXToken: Set isstreasury user address from treasury admin", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.addTreasuryAdmin(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setTreasuryAddress(accounts[1], {from: accounts[1]});             
        }).then(function(result) {
            assert(false, "Calling setTreasuryAddress from a non admin account is not allowed");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert.include(errorMessage, 'caller does not have the BNOXAdmin role', 'string contains substring');
            assert(true, "Calling setTreasuryAddress from a non admin account is not allowed");   
        });
    });
});

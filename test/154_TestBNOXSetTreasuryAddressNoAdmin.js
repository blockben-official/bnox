var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var issuerAddress;
var event;

contract('BNOXToken', function(accounts) {
    it("154. test of BNOXToken: Set isstreasury user address no right", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
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


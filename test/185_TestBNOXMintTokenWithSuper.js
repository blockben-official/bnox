var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var Balance;
var Balance;
var Supply;
var event;

contract('BNOXToken', function(accounts) {
    it("185. test of BNOXToken: Mint token with super", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.mint(accounts[0], 1550000, {from: accounts[9]});             
        }).then(function(result) {
            assert(false, "Calling mint is only possible from treasuryadmin");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert.include(errorMessage, 'caller does not have the TreasuryAdmin role', 'string contains substring');
            assert(true, "Calling mint is only possible from treasuryadmin");   
        });
    });
});

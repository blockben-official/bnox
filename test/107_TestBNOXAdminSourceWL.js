var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var isWhitelisted;

contract('BNOXToken', function(accounts) {
    it("107. test of BNOXToken: Initial Token Admin is source account whitelisted", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.getSourceAccountWL(accounts[0], {from: accounts[0]});             
        }).then(function(result) {
            isWhitelisted = result;
            assert.equal(isWhitelisted, true, "Initial token admin is not source account whitelisted"); 
        }); 
    });
});

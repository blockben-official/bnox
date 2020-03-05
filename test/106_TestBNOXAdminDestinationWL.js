var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var isWhitelisted;

contract('BNOXToken', function(accounts) {
    it("106. test of BNOXToken: Initial Token Admin is destination account whitelisted", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.getDestinationAccountWL(accounts[0], {from: accounts[9]});             
        }).then(function(result) {
            isWhitelisted = result;
            assert.equal(isWhitelisted, false, "Initial token admin is not destionation account whitelisted"); 
        }); 
    });
});

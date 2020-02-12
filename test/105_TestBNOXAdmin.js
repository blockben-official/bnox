var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var isAdmin;

contract('BNOXToken', function(accounts) {
    it("105. test of BNOXToken: Initial Token Admin", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.isBNOXAdmin(accounts[0], {from: accounts[0]});             
        }).then(function(result) {
            isAdmin = result;
            assert.equal(isAdmin, true, "Initial token admin is not ok"); 
        }); 
    });
});

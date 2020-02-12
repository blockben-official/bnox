var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var isAdmin;

contract('BNOXToken', function(accounts) {
    it("114. test of BNOXToken: account[1] is not Initial Token Admin ", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.isBNOXAdmin(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            isAdmin = result;
            assert.equal(isAdmin, false, "account[1] should not be initial token admin"); 
        }); 
    });
});

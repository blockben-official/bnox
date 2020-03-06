var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var paused1;
var paused2;
var paused3;

contract('BNOXToken', function(accounts) {
    it("120. test of BNOXToken: pause unpause scenario superadmin", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.paused({from: accounts[9]});             
        }).then(function(result) {
            paused1 = result;
            return BNOXTokenContractInstance.pause({from: accounts[9]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.paused({from: accounts[9]});             
        }).then(function(result) {
            paused2 = result;
            return BNOXTokenContractInstance.unpause({from: accounts[9]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.paused({from: accounts[9]});             
        }).then(function(result) {
            paused3 = result;
            assert.equal(paused1, false, "Initially the token should not be paused"); 
            assert.equal(paused2, true, "After the first pause the token must be paused"); 
            assert.equal(paused3, false, "After unpause, the token should not be paused"); 
        }); 
    });
});

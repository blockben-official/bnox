var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var LockValue1;
var LockValue2;

contract('BNOXToken', function(accounts) {
    it("154. test of BNOXToken: Set source lock with super", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.getSourceAccountWL(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            LockValue1 = result; 
            return BNOXTokenContractInstance.setSourceAccountWL(accounts[1],true, {from: accounts[9]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.getSourceAccountWL(accounts[1], {from: accounts[0]});
        }).then(function(result) {
            LockValue2 = result; 
            assert.equal(LockValue1, false, "Inital lock value must be false");  
            assert.equal(LockValue2, true, "Last lock value must be true"); 
        });
    });
});

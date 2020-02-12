var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var LockValue1;
var LockValue2;

contract('BNOXToken', function(accounts) {
    it("156. test of BNOXToken: Set destination lock", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.getDestinationAccountWL(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            LockValue1 = result; 
            return BNOXTokenContractInstance.setDestinationAccountWL(accounts[1],true, {from: accounts[9]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.getDestinationAccountWL(accounts[1], {from: accounts[0]});
        }).then(function(result) {
            LockValue2 = result; 
            assert.equal(LockValue1, false, "Inital lock value must be false");  
            assert.equal(LockValue2, true, "Last lock value must be true"); 
        });
    });
});

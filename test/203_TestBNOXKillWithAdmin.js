var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var Balance;
var Balance;
var url;

contract('BNOXToken', function(accounts) {
    it("203. test of BNOXToken: call selfdestrcut", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.pause({from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.kill(accounts[0], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setUrl("http://test", {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.url({from: accounts[0]});             
        }).then(function(result) {
            assert(false, "Token should be dead");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert.include(errorMessage, 'Returned values aren');
            assert(true, "Token should be dead");   
        });
    });
});

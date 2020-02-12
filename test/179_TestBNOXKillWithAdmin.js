var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var Balance;
var Balance;
var Supply;

contract('BNOXToken', function(accounts) {
    it("179. test of BNOXToken: call selfdestrcut", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.kill(accounts[0], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setUrl("http://test", {from: accounts[0]});             
        }).then(function(result) {
            assert(false, "Token should be dead");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert(true, "Token should be dead");   
        });
    });
});

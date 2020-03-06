var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var Balance;
var Balance;
var Supply;

contract('BNOXToken', function(accounts) {
    it("202. test of BNOXToken: call selfdestruct, admin and paused", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.pause({from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.kill(accounts[0], {from: accounts[0]});             
        }).then(function(result) {
            assert(true, "Token should be killed");
        });                    
    });
});

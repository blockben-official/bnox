var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var Balance;
var Balance;
var Supply;

contract('BNOXToken', function(accounts) {
    it("201. test of BNOXToken: call selfdestrcut withput paused", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.kill(accounts[0], {from: accounts[0]});             
        }).then(function(result) {
            assert(false, "Token should be locked to be killed");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert.include(errorMessage, 'only paused contract can be killed', 'string contains substring');
            assert(true, "Token should locked to be killed");   
        });
    });
});

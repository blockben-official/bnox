var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var treasuryAddress;
var nullAddress = "0x0000000000000000000000000000000000000000"

contract('BNOXToken', function(accounts) {
    it("108. test of BNOXToken: Initial Treasury must be 0x0", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.treasuryAddress({from: accounts[0]});             
        }).then(function(result) {
            treasuryAddress = result;
            assert.equal(treasuryAddress, nullAddress, "Initial treasury address must be the null address"); 
        }); 
    });
});

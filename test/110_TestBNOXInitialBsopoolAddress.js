var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var bsopoolAddress;
var nullAddress = "0x0000000000000000000000000000000000000000"

contract('BNOXToken', function(accounts) {
    it("110. test of BNOXToken: Initial bsopool address must be 0x0", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.bsopoolAddress({from: accounts[0]});             
        }).then(function(result) {
            bsopoolAddress = result;
            assert.equal(bsopoolAddress, nullAddress, "Initial bsopool address must be the null address"); 
        }); 
    });
});

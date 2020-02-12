var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var bsopoolFee;

contract('BNOXToken', function(accounts) {
    it("111. test of BNOXToken: Initial bsopool fee must be 0", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.bsoFee({from: accounts[0]});             
        }).then(function(result) {
            bsopoolFee = result;
            assert.equal(bsopoolFee, 0, "Initial bsopool fee must be 0"); 
        }); 
    });
});

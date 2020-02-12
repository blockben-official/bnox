var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var feeAddress;
var nullAddress = "0x0000000000000000000000000000000000000000"

contract('BNOXToken', function(accounts) {
    it("109. test of BNOXToken: Initial General fee address must be 0x0", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.feeAddress({from: accounts[0]});             
        }).then(function(result) {
            feeAddress = result;
            assert.equal(feeAddress, nullAddress, "Initial general fee address must be the null address"); 
        }); 
    });
});

var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var feeAddress;
var event;

contract('BNOXToken', function(accounts) {
    it("139. test of BNOXToken: Set fee address", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.setFeeAddress(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            event = result.logs[0].event;
            return BNOXTokenContractInstance.feeAddress({from: accounts[0]});             
        }).then(function(result) {
            feeAddress = result; 
            assert.equal(feeAddress, accounts[1], "Fee address do not match");  
            assert.equal(event, "BNOXFeeAddressChange", "BNOXFeeAddressChange event not raised");                                     
        });
    });
});

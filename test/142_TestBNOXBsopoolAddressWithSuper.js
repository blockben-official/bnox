var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var bsopoolAddress;
var event;

contract('BNOXToken', function(accounts) {
    it("142. test of BNOXToken: Set bsopool address with superadmin", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.setBsopoolAddress(accounts[1], {from: accounts[9]});             
        }).then(function(result) {
            event = result.logs[0].event;
            return BNOXTokenContractInstance.bsopoolAddress({from: accounts[0]});             
        }).then(function(result) {
            bsopoolAddress = result; 
            assert.equal(bsopoolAddress, accounts[1], "bsopoolAddress address do not match");  
            assert.equal(event, "BNOXBSOPOOLAddressChange", "BNOXBSOPOOLAddressChange event not raised");                                     
        });
    });
});

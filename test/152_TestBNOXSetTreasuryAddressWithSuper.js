var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var treasuryAddress;
var event;

contract('BNOXToken', function(accounts) {
    it("152. test of BNOXToken: Set treasury address with superadmin", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.setTreasuryAddress(accounts[1], {from: accounts[9]});             
        }).then(function(result) {
            event = result.logs[0].event;
            return BNOXTokenContractInstance.treasuryAddress({from: accounts[0]});             
        }).then(function(result) {
            treasuryAddress = result; 
            assert.equal(treasuryAddress, accounts[1], "Issuer address do not match");  
            assert.equal(event, "BNOXTreasuryAddressChange", "BNOXTreausryAddressChange event not raised");                                     
        });
    });
});

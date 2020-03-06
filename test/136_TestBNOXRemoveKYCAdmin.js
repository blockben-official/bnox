var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var isAdmin;
var event;

contract('BNOXToken', function(accounts) {
    it("122. test of BNOXToken: Remove a KYC admin", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.addKYCAdmin(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.removeKYCAdmin(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            event = result.logs[0].event;
            return BNOXTokenContractInstance.isKYCAdmin(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            isAdmin = result;
            assert.equal(isAdmin, false, "account[1] must not be KYC admin"); 
            assert.equal(event, "BNOXKYCAdminRemoved", "BNOXKYCAdminRemoved event not raised");                                    
        }); 
    });
});

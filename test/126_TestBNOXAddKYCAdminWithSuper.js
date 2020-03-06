var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var isAdmin;
var event;

contract('BNOXToken', function(accounts) {
    it("126. test of BNOXToken: Add a KYC admin with superadmin", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.addKYCAdmin(accounts[1], {from: accounts[9]});             
        }).then(function(result) {
            event = result.logs[0].event;
            return BNOXTokenContractInstance.isKYCAdmin(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            isAdmin = result;
            assert.equal(isAdmin, true, "account[1] must be KYC admin"); 
            assert.equal(event, "BNOXKYCAdminAdded", "BNOXKYCAdminAdded event not raised");                                    
       }); 
    });
});

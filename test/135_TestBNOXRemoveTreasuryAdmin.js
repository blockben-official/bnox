var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var isAdmin;
var event;

contract('BNOXToken', function(accounts) {
    it("135. test of BNOXToken: Remove an admin", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.addTreasuryAdmin(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.removeTreasuryAdmin(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            event = result.logs[0].event;
            return BNOXTokenContractInstance.isTreasuryAdmin(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            isAdmin = result;
            assert.equal(isAdmin, false, "account[1] must not be initial token admin"); 
            assert.equal(event, "BNOXTreasuryAdminRemoved", "BNOXTreasuryAdminRemoved event not raised");                                    
        }); 
    });
});

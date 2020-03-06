var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var Balance;
var Balance;
var Supply;

contract('BNOXToken', function(accounts) {
    it("206. test of BNOXToken: Mint token without admin rights", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.addTreasuryAdmin(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.kill(accounts[1], {from: accounts[1]});             
        }).then(function(result) {
            assert(false, "Calling mint from a non admin account is not allowed");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert(true, "Calling mint from a non admin account is not allowed");   
        });
    });
});

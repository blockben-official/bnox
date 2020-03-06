var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var Balance;
var Supply;
var event;

contract('BNOXToken', function(accounts) {
    it("195. test of BNOXToken: Burn token", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.addTreasuryAdmin(accounts[0], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.addTreasuryAdmin(accounts[1], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setTreasuryAddress(accounts[0], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.addKYCAdmin(accounts[0], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setDestinationAccountWL(accounts[0], true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setSourceAccountWL(accounts[0], true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.mint(accounts[0], 1550000, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.approve(accounts[1], 1550000, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.burn(1550000, {from: accounts[1]});             
        }).then(function(result) {
            event = result.logs[0].event;
            return BNOXTokenContractInstance.balanceOf(accounts[0], {from: accounts[0]});             
        }).then(function(result) {
            Balance = result;
            return BNOXTokenContractInstance.totalSupply({from: accounts[0]});             
        }).then(function(result) {
            Supply = result;
            assert.equal(Balance, 0, "Balance is not ok");  
            assert.equal(Supply, 0, "Supply is not ok"); 
            assert.equal(event, "Transfer", "Transfer event not raised");                                    
        }); 
    });
});

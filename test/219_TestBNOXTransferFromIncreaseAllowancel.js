var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var fromBalance;
var toBalance;
var event;

contract('BNOXToken', function(accounts) {
    it("219. test of BNOXToken: TransferFrom - increasing allowance Good Case", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.addTreasuryAdmin(accounts[0], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.addKYCAdmin(accounts[0], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setDestinationAccountWL(accounts[0],true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.mint(accounts[0], 50000000, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setFeeAddress(accounts[5], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setBsopoolAddress(accounts[6], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setSourceAccountWL(accounts[0],true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setDestinationAccountWL(accounts[5],true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setDestinationAccountWL(accounts[6],true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.approve(accounts[2],1000000, {from: accounts[0]});
        }).then(function(result) {
            return BNOXTokenContractInstance.setDestinationAccountWL(accounts[1],true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setSourceAccountWL(accounts[2],true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.increaseAllowance(accounts[2],1000000, {from: accounts[0]});
        }).then(function(result) {
            return BNOXTokenContractInstance.transferFrom(accounts[0], accounts[1], 1500000 ,{from: accounts[2]});             
        }).then(function(result) {
            event = result.logs[0].event;
            return BNOXTokenContractInstance.balanceOf.call(accounts[0]);             
        }).then(function(balance) {
            fromBalance = balance.toNumber();
            return BNOXTokenContractInstance.balanceOf.call(accounts[1]);             
        }).then(function(balance) {
            toBalance = balance.toNumber();
            assert.equal(fromBalance, 48500000, "BNOX token allocation after transfer - from balance");            
            assert.equal(toBalance, 1500000, "BNOX token allocation after transfer - to balance");                        
            assert.equal(event, "Transfer", "Transfer event not raised");                                    
        });
    });
});

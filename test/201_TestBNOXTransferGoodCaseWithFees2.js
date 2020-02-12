var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var fromBalance;
var toBalance;
var feeBalance;
var bsoBalance;
var event;

contract('BNOXToken', function(accounts) {
    it("201. test of BNOXToken: Transfer - Good Case with fees 2", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.setTreasuryAddress(accounts[9], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setGeneralFee(66, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setBsoFee(100, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setFeeAddress(accounts[5], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setBsopoolAddress(accounts[6], {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setDestinationAccountWL(accounts[5],true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setDestinationAccountWL(accounts[6],true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.setDestinationAccountWL(accounts[1],true, {from: accounts[0]});             
        }).then(function(result) {
            return BNOXTokenContractInstance.transfer(accounts[1], 1000000 ,{from: accounts[0]});             
        }).then(function(result) {
            event = result.logs[0].event;
            return BNOXTokenContractInstance.balanceOf.call(accounts[5]);             
        }).then(function(balance) {
            feeBalance = balance.toNumber();
            return BNOXTokenContractInstance.balanceOf.call(accounts[6]);             
        }).then(function(balance) {
            bsoBalance = balance;
            return BNOXTokenContractInstance.balanceOf.call(accounts[0]);             
        }).then(function(balance) {
            fromBalance = balance.toNumber();
            return BNOXTokenContractInstance.balanceOf.call(accounts[1]);             
        }).then(function(balance) {
            toBalance = balance.toNumber();
            assert.equal(fromBalance, 99000000, "BNOX token allocation after transfer - from balance");            
            assert.equal(toBalance, 998340, "BNOX token allocation after transfer - to balance");                        
            assert.equal(feeBalance, 660, "BNOX token allocation after transfer - general Fee balance");                        
            assert.equal(bsoBalance, 1000, "BNOX token allocation after transfer - bspo Fee balance");                        
            assert.equal(event, "Transfer", "Transfer event not raised");                                    
        });
    });
});
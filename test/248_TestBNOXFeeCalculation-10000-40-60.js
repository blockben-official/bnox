var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var fromBalance;
var toBalance;
var feeBalance;
var bsoBalance;
var event;

contract('BNOXToken', function(accounts) {
	it("248. test of BNOXToken: Fee calculation 1000000 - 0.040% - 0.060%", function() {
		return BNOXTokenContract.deployed().then(function(instance) {
			BNOXTokenContractInstance = instance;
			return BNOXTokenContractInstance.addTreasuryAdmin(accounts[0], {from: accounts[0]});
		}).then(function(result) {
			return BNOXTokenContractInstance.addKYCAdmin(accounts[0], {from: accounts[0]});
		}).then(function(result) {
			return BNOXTokenContractInstance.setDestinationAccountWL(accounts[0],true, {from: accounts[0]});
		}).then(function(result) {
			return BNOXTokenContractInstance.setSourceAccountWL(accounts[0],true, {from: accounts[0]});
		}).then(function(result) {
			return BNOXTokenContractInstance.mint(accounts[0], 50000000, {from: accounts[0]});
		}).then(function(result) {
			return BNOXTokenContractInstance.setTreasuryAddress(accounts[9], {from: accounts[0]});
		}).then(function(result) {
			return BNOXTokenContractInstance.setGeneralFee(40, {from: accounts[0]});
		}).then(function(result) {
			return BNOXTokenContractInstance.setBsoFee(60, {from: accounts[0]});
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
			return BNOXTokenContractInstance.transfer(accounts[1], 1000000,{from: accounts[0]});
		}).then(function(result) {
			event = result.logs[0].event;
			return BNOXTokenContractInstance.balanceOf.call(accounts[5]);
		}).then(function(balance) {
			feeBalance = balance.toNumber();
			return BNOXTokenContractInstance.balanceOf.call(accounts[6]);
		}).then(function(balance) {
			bsoBalance = balance.toNumber();
			return BNOXTokenContractInstance.balanceOf.call(accounts[0]);
		}).then(function(balance) {
			fromBalance = balance.toNumber();
			return BNOXTokenContractInstance.balanceOf.call(accounts[1]);
		}).then(function(balance) {
			toBalance = balance.toNumber();
			assert.equal(fromBalance, 49000000, "BNOX token allocation after transfer - from balance");
			assert.equal(toBalance, 999000, "BNOX token allocation after transfer - to balance");
			assert.equal(bsoBalance, 600, "BNOX token allocation after transfer - BSO Fee balance");
			assert.equal(feeBalance, 400, "BNOX token allocation after transfer - Processing Fee balance");
			assert.equal(event, "Transfer", "Transfer event not raised");
		});
	});
});
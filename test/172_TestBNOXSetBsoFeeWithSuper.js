var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var bsoFee;
var event;

contract('BNOXToken', function(accounts) {
    it("172. test of BNOXToken: Set bso transaction fee with superadmin", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.setBsoFee(111, {from: accounts[9]});             
        }).then(function(result) {
            event = result.logs[0].event;
            return BNOXTokenContractInstance.bsoFee({from: accounts[0]});             
        }).then(function(result) {
            bsoFee = result; 
            assert.equal(bsoFee, 111, "Bso fee amount do not match");  
            assert.equal(event, "BNOXBSOFeeChange", "BNBNOXBSOFeeChangeOXGeneralFeeChange event not raised");                                     
        });
    });
});

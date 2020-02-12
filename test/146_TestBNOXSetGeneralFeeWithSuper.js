var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var generalFee;
var event;

contract('BNOXToken', function(accounts) {
    it("146. test of BNOXToken: Set general transaction fee with superadmin", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.setGeneralFee(111, {from: accounts[9]});             
        }).then(function(result) {
            event = result.logs[0].event;
            return BNOXTokenContractInstance.generalFee({from: accounts[0]});             
        }).then(function(result) {
            generalFee = result; 
            assert.equal(generalFee, 111, "General fee amount do not match");  
            assert.equal(event, "BNOXGeneralFeeChange", "BNOXGeneralFeeChange event not raised");                                     
        });
    });
});

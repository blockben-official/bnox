var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var generalFee;

contract('BNOXToken', function(accounts) {
    it("112. test of BNOXToken: Initial generalFee fee must be 0", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.generalFee({from: accounts[0]});             
        }).then(function(result) {
            generalFee = result;
            assert.equal(generalFee, 0, "Initial general Fee fee must be 0"); 
        }); 
    });
});

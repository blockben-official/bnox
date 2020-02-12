var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var InitialSupply;

contract('BNOXToken', function(accounts) {
    it("102. test of BNOXToken: Initial Supply", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.totalSupply({from: accounts[0]});             
        }).then(function(result) {
            InitialSupply = result;
            assert.equal(InitialSupply, 100000000, "Initial total supply is not ok");  
        }); 
    });
});

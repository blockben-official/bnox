var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var TokenName;

contract('BNOXToken', function(accounts) {
    it("101. test of BNOXToken: Name", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.name({from: accounts[0]});             
        }).then(function(result) {
            TokenName = result;
            assert.equal(TokenName, "BlockNoteX", "Tokenname is not ok");  
        }); 
    });
});


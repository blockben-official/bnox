var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var TokenSymbol;

contract('BNOXToken', function(accounts) {
    it("103. test of BNOXToken: Symbol", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.symbol({from: accounts[0]});             
        }).then(function(result) {
            TokenSymbol = result;
            assert.equal(TokenSymbol, "BNOX", "Token symbol is not ok"); 
        }); 
    });
});

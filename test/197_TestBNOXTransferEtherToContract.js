var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var fromBalance;
var toBalance;
var event;

contract('BNOXToken', function(accounts) {
    it("197. test of BNOXToken: Transfer ether to contact must fail", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return TokenToBeTesteBNOXTokenContractInstancedInstance.sendTransaction({
                from: accounts[0],
                gas: 210000,
                value: 10000000
            });
            }).then(function(result) {
                assert(false, "Sending ether to token should not be possible");    
            }).catch(function(error) {
                errorMessage = error.toString();
                assert(true, "More transfer than allowed");   
            });
    });
});

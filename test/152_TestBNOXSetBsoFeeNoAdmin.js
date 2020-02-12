var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var bsoFee;
var event;

contract('BNOXToken', function(accounts) {
    it("152. test of BNOXToken: Set general fee  no right", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.setBsoFee(accounts[1], {from: accounts[1]});             
        }).then(function(result) {
            assert(false, "Calling setBsoFee from a non admin account is not allowed");            
        }).catch(function(error) {
            errorMessage = error.toString();
            assert(true, "Calling setBsoFee from a non admin account is not allowed");   
        });
    });
});


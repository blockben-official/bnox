var BNOXTokenContract = artifacts.require("BNOXToken");
var BNOXTokenContractInstance;
var url;
var event;

contract('BNOXToken', function(accounts) {
    it("147. test of BNOXToken: Set url with superadmin", function() {
        return BNOXTokenContract.deployed().then(function(instance) {
            BNOXTokenContractInstance = instance;
            return BNOXTokenContractInstance.setUrl("http://test", {from: accounts[9]});             
        }).then(function(result) {
            event = result.logs[0].event;
            return BNOXTokenContractInstance.url({from: accounts[0]});             
        }).then(function(result) {
            url = result; 
            assert.equal(url, "http://test", "Set utl does not match");  
            assert.equal(event, "BNOXUrlSet", "BNOXUrlSet event not raised");                                     
        });
    });
});

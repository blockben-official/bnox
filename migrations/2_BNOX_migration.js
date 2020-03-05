const BNOXToken = artifacts.require("BNOXToken");
// TEST SCENARIO: Superadmin is nr 9
const Superadmin = "0xf6baac6f8979fab38a73e28307299d9cf2dad4c0";

module.exports = function(deployer) {
  deployer.deploy(BNOXToken, Superadmin);
};


const FaucetContract = artifacts.require("faucet");

module.exports = function (deployer) {
  deployer.deploy(FaucetContract);
};

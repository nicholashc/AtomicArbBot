require('dotenv').config();
const ArbBot = artifacts.require("ArbBot");

module.exports = async function (deployer, network, accounts) {
  try {
    if (network === 'development') {
      const res = await deployer.deploy(ArbBot, accounts[0]);
      console.log(res);
    } else if (network === 'ropsten') {
      deployer.deploy(ArbBot, process.env.ROPSTEN_ADDRESS);
    } else {
      //for mainnet
    }
  } catch (e) {
    console.log("Error", e);
  }
};

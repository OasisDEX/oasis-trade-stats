const config = require("./config.json");
const Web3 = require("web3");

const PRIVATE_NETWORK = "private";

const network = process.env.NETWORK || DEFAULT_NETWORK;

/** If unknown network is provided,
 *  then the configuration for private network is used *
 */
const networkConfig = config[network] || config[PRIVATE_NETWORK];

const provider = networkConfig.provider;
const proxyFactoryAddress = networkConfig.proxyFactory;

if(!proxyFactoryAddress) {
  console.log("Missing Proxy Factory address. Check config.json!");
  process.exit(1);
}
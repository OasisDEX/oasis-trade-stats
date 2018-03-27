const config = require("./config.json");
const proxyFactoryAbi = require("./abi/dsProxyFactory.json").abi;
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

const web3 = new Web3(provider);
const proxyFactoryInstance = new web3.eth.Contract(proxyFactoryAbi,proxyFactoryAddress);

console.log(proxyFactoryInstance);

function isAddressAProxy(address){
   return proxyFactoryInstance.methods.isProxy(address).call();
}

(async () => {
  const result = await isAddressAProxy("0x25cf21ce1f31fd5fb77490c2160a6ed3ab70c909");
  console.log(result);
})();
const config = require("./config.json");

const network = process.env.NETWORK;
const proxyFactoryAddress = config[network].proxyFactory;
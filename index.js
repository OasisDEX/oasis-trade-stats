const debug = require('debug')('runtime');
const mongoose = require('mongoose');
const config = require("./config.json");
const proxyFactoryAbi = require("./abi/dsProxyFactory.json").abi;
const marketAbi = require("./abi/matchingMarket.json").abi;
const Web3 = require("web3");

const tradeSchema = require("./schemas/trade");

const PRIVATE_NETWORK = "private";

const network = process.env.NETWORK || DEFAULT_NETWORK;

/** If unknown network is provided,
 *  then the configuration for private network is used *
 */
const networkConfig = config[network] || config[PRIVATE_NETWORK];

const providerAddress = networkConfig.provider;
const marketAddress = networkConfig.market;
const proxyFactoryAddress = networkConfig.proxyFactory;

if (!marketAddress) {
  console.log("Missing Market address. Check config.json!");
  process.exit(1);
}

if (!proxyFactoryAddress) {
  console.log("Missing Proxy Factory address. Check config.json!");
  process.exit(1);
}

const web3 = new Web3(new Web3.providers.HttpProvider(providerAddress));

const proxyFactory = web3.eth.contract(proxyFactoryAbi).at(proxyFactoryAddress);
const market = web3.eth.contract(marketAbi).at(marketAddress);

function isAddressAProxy(address) {
  return new Promise((resolve, reject) => {
    proxyFactory.isProxy(address, (err, isProxy) => {
      if (!err) {
        resolve(isProxy);
      } else {
        debug(`Couldn't validate if address ${address} was proxy due to ${err}`);
        reject(false);
      }
    });
  });
}

function connectToDB(URI) {
  return new Promise((resolve, reject) => {
    "use strict";
    mongoose.connect(URI);

    const db = mongoose.connection;

    db.on('error', (error) => {
      debug(`Cannot connect to db ${error}`);
      reject()
    });

    db.once('open', () => {
      console.log(`Successfully connected to ${URI} \n`);
      resolve(db);
    });
  })
}

async function listen() {
  console.log("Web3 version:", web3.version.api);
  console.log("-----------------------------------------------");
  console.log("Network: ", network);
  console.log("Server: ", providerAddress);
  console.log("Market Address: ", marketAddress);
  console.log("Proxy Factory Address: ", proxyFactoryAddress);
  console.log("-----------------------------------------------");


  await connectToDB("mongodb://localhost/oasisDirect");
  const compiled = mongoose.Schema(tradeSchema);
  const Trade = mongoose.model('Trade', compiled);


  console.log("Listening for incoming trades...");

  market.LogTake({}, async (error, incomingTrade) => {
    const { args:tradeDetails , transactionHash:txHash, blockNumber} = incomingTrade;
    const { taker, pay_gem:quote, buy_gem:base, give_amt:paid, take_amt:received  } = tradeDetails;
    const baseSymbol = networkConfig.tokens[base] || base;
    const quoteSymbol = networkConfig.tokens[quote] || quote;

    const isProxy = await isAddressAProxy(taker);
    
    console.log(isProxy, taker,txHash,blockNumber,paid.valueOf(), received.valueOf(),base,quote,baseSymbol,quoteSymbol);

    const trade = new Trade({
      isProxy,
      taker,
      txHash,
      blockNumber,
      paid:paid.valueOf(),
      received:received.valueOf(),
      base,
      quote,
      baseSymbol,
      quoteSymbol
    });

    console.log(`New trade for ${taker}`);

    trade.save((error) => {
      "use strict";
      if (error) {
        debug(`Couldn't save trade for ${taker} with txHash: ${txHash}`);
      }
    })
  })
}

listen();


// This is a hack to keep the process alive.
// Refer to: https://stackoverflow.com/questions/23622051/how-to-forcibly-keep-a-node-js-process-from-terminating
process.stdin.on("data", () => {
});
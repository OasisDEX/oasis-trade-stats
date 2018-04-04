module.exports = {
  isProxy: Boolean,
  taker: {
    type: String,
    validate: {
      validator: (address) => {
        "use strict";
        return /^0x[a-fA-F0-9]{40}$/.test(address);
      },
      message:
        "{VALUE} is not a valid ethereum address"
    }
  },
  txHash: {
    type: String,
    validate: {
      validator: (txHash) => {
        "use strict";
        return /^0x[a-fA-F0-9]{64}$/.test(txHash);
      },
      message:
        "{VALUE} is not a valid tx hash"
    }
  },
  blockNumber: Number,
  paid: String, //use regex for numbers
  received: String, //use regex for numbers
  paidToken: {
    type: String,
    validate: {
      validator: (address) => {
        "use strict";
        return /^0x[a-fA-F0-9]{40}$/.test(address);
      },
      message:
        "{VALUE} is not a valid ethereum address"
    }
  },
  receivedToken: {
    type: String,
    validate: {
      validator: (address) => {
        "use strict";
        return /^0x[a-fA-F0-9]{40}$/.test(address);
      },
      message:
        "{VALUE} is not a valid ethereum address"
    }
  },
  paidTokenSymbol:String,
  receivedTokenSymbol:String,
  date:String
};
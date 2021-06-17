const Web3 = require('web3');

var provider = new Web3.providers.WebsocketProvider('wss://data-seed-prebsc-1-s1.binance.org:8545');
var web3Ws = new Web3(provider);
module.exports = web3Ws;
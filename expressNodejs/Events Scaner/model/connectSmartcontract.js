const web3Ws = require('./web3');
const listen = require('./listen');
const mongo = require('./mongodb');
var contractAbi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "old",
				"type": "uint256"
			}
		],
		"name": "info",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_old",
				"type": "uint256"
			}
		],
		"name": "setvalue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getvalue",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "infor",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "old",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

var contractAddress = "0xe07108F0568d33D5097C16c5D465d467FfC8f69F";

MyContract = new web3Ws.eth.Contract(contractAbi, contractAddress);
var eventName = 'info';
var test =MyContract.methods.getvalue().call({from: '0xE0D2D6e03d0ebC6B5F931c13320d2BFF8C0EabBb'}, function(error, result) {
    console.log(result);
});
console.log("aaaaaaaaaa",test );
listen.subscribeLogEvent(MyContract, eventName, function(data){
	console.log("data Events = ", data);
	mongo.insertDatabase(data);
});

module.exports = {
	test: test
}


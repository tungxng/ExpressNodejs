const web3Ws = require('./web3');
const subscribedEvents = {}
const mongodb = require('./mongodb')

function subscribeLogEvent(contract, eventName,callback) {
  const eventJsonInterface = web3Ws.utils._.find(
    contract._jsonInterface,
    o => o.name === eventName && o.type === 'event',
  )
  const subscription = web3Ws.eth.subscribe('logs', {
    address: contract.options.address,
    topics: [eventJsonInterface.signature]
  }, (error, result) => {
    if (!error) {
      const eventObj = web3Ws.eth.abi.decodeLog(
        eventJsonInterface.inputs,
        result.data,
        result.topics.slice(1)
      )      
      callback(eventObj);
    }
  }).on("data", function (transaction) {
    console.log(transaction.transactionHash);
  });

  subscribedEvents[eventName] = subscription
  console.log(`subscribed to event '${eventName}' of contract '${contract.options.address}' `)
}

module.exports = {
  subscribeLogEvent
}
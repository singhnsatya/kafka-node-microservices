var kafka = require('kafka-node');
var HighLevelConsumer = kafka.Consumer;
var Client = kafka.KafkaClient;

var client = new Client('localhost:2181');
var topics = [{
  topic: 'node-test'
}];


var options = {
    autoCommit: false,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024
  };
  var consumer = new HighLevelConsumer(client, topics, options);
  
  consumer.on('message', function(message) {
    console.log(message.value);
  });
  
  consumer.on('error', function(err) {
    console.log('error', err);
  });
  
  process.on('SIGINT', function() {
    consumer.close(true, function() {
      process.exit();
    });
  });
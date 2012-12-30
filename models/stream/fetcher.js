
var request = require('superagent')
  , Stream = require('stream').Stream
  , util = require('util')
  , maxRetries = require('../../secrets').request_retries;

var Fetcher = module.exports = function(url, extract) {

  Stream.call(this);

  this.url = url;
};

util.inherits(Fetcher, Stream);

Fetcher.prototype.fetch = function() {

  var self = this;
  var retries = 0;

  try {

    function reTry(){ 
      retries++;
      console.log(self.url);
      request(self.url, function(res){
        
        if (res.ok) {
          self.emit('data', res.text); 
        }

      }).on('error', function(){
        if (retries < maxRetries){
          console.log('retring from response [%s / %s] ...', retries, maxRetries);
          reTry(); //TODO: manage errors
        }
      });

    }

    reTry();
  }
  catch(e){
    console.log('ERROR %s', e);

    if (retries < maxRetries) {
      console.log('retring from error [%s / %s] ...', retries, maxRetries);
      reTry();
    } 
  }

};


var request = require('superagent')
  , Stream = require('stream').Stream
  , util = require('util')
  , maxRetries = app.secrets.request_retries;

var Fetcher = module.exports = function(url, extract) {

  Stream.call(this);

  this.url = url;
};

util.inherits(Fetcher, Stream);

Fetcher.prototype.fetch = function() {
  var self = this
    , retries = 0;

  function reTry(){ 
    retries++;
    
    request(self.url, function(res){
      
      if (res.ok) {
        self.emit('data', res.text); 
      }

    }).on('error', function(){
      if (retries < maxRetries){
        console.log('retring [%s / %s] ...', retries, maxRetries);
        reTry(); //TODO: manage errors
      }
    });

  }

  reTry();
};

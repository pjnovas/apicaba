
var request = require('superagent')
  , Stream = require('stream').Stream
  , util = require('util')
  , maxRetries = app.secrets.request_retries;

var Fetcher = module.exports = function(url, preview) {

  Stream.call(this);

  this.url = url;
  this.preview = preview;
};

util.inherits(Fetcher, Stream);

Fetcher.prototype.fetch = function() {
  var self = this
    , retries = 0;

  function reTry(){ 
    retries++;
    
    var req = request.get(self.url);
    req.buffer();
    
    req.parse( function (res, fn) {

      res.text = '';
      res.setEncoding('utf8');

      res.on('data', function(chunk){ 

        res.text += chunk;

        if (self.preview) {
          res.destroy();
          fn(null, chunk);
        }
      });

      res.on('end', fn);
    });

    req.end(function(err, res){
      if (err){
        if (retries < maxRetries){
          console.log('retring [%s / %s] ...', retries, maxRetries);
          return reTry(); //TODO: manage errors
        }
      }
      
      if (res.ok) {
        self.emit('data', res.text); 
      }
    });
  }

  reTry();
};
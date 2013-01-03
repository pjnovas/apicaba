
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

      res.setEncoding('ascii');

      res.on('data', function(chunk){ 
        if (self.preview) {
          res.destroy();
          self.emit('data', chunk);
          fn(null, chunk);
        }
        else {
          self.emit('data', chunk);
        }
      });

      res.on('end', function(){
        self.emit('end');
        fn(null);
      });

    });

    req.on('error', function(err){
      if (retries < maxRetries){
        console.log('retring [%s / %s] ...', retries, maxRetries);
        return reTry(); 
      }
      else {
        self.emit('error', 
          new Error('Server not responded after ' + retries + ' re-tries'));
      }
    });

    req.end();
  }

  reTry();
};
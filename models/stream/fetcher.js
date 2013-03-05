
var http = require('http')
  , url = require('url')
  , Stream = require('stream').Stream
  , util = require('util')
  , iconv = require('iconv-lite')
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

    var req = http.request(url.parse(self.url), function(res) {

      res.on('data', function (buffer) {
        var decoded = iconv.decode(buffer, 'latin1');
        if (self.preview) {
          res.destroy();
        }
        self.emit('data', decoded);
      });

      res.on('end', function(){
        self.emit('end');
      });

    });

    req.on('error', function(e) {
      console.log('RES >>>>> ERROR ' + e.message);  

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


var request = require('superagent')
  , Stream = require('stream').Stream
  , util = require('util');


var Fetcher = module.exports = function(url, extract) {

  Stream.call(this);

  this.url = url;
};

util.inherits(Fetcher, Stream);

Fetcher.prototype.fetch = function() {

  var self = this;

  request(this.url, function(res){

    // need to add logic for zip and rar data
    if(res.ok) self.emit('data', res.text); 

  });

};

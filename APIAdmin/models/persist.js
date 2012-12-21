
var Stream = require('stream').Stream
  , fs = require('fs')
  , util = require('util')
  , resources = require('../../collections/resources');

var Persist = module.exports = function(name) {

  Stream.call(this);
  this.writable = true;

  this.name = name;
};

util.inherits(Persist, Stream);

Persist.prototype.write = function(data) {
  var self = this;

  resources.create({
    name: this.name,
    data: data
  }, function(err){
    if (err) throw err;
    self.emit('end');
  });

};

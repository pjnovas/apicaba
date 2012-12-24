
var Stream = require('stream').Stream
  , fs = require('fs')
  , util = require('util')
  , resources = require('../../collections/resources');

var Persist = module.exports = function(name, group) {

  Stream.call(this);
  this.writable = true;

  this.name = name;
  this.canonical = name.toLowerCase().replace(/ /g, '-');
  this.group = group;
};

util.inherits(Persist, Stream);

Persist.prototype.write = function(data) {
  var self = this;

  resources.create({
    name: this.name,
    canonical: this.canonical,
    group: this.group,
    data: data
  }, function(err){
    if (err) throw err;
    self.emit('end');
  });

};

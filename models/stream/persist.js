
var Stream = require('stream').Stream
  , util = require('util')
  , resources = require('../../collections/resources');

var Persist = module.exports = function(name, group) {

  Stream.call(this);
  this.writable = true;

  this.name = name;
  this.canonical = name.toLowerCase().replace(/ /g, '-');
  this.group = group;

  this.temp = [];
};

util.inherits(Persist, Stream);

Persist.prototype.write = function(data) {
  //TODO: move from memory to a TEMP collection
  this.temp = this.temp.concat(data);
};

Persist.prototype.end = function() {
  var self = this;
  
  resources.create({
    name: this.name,
    canonical: this.canonical,
    group: this.group,
    data: this.temp
  }, function(err){
    if (err) {
      throw err;
      self.emit('error', err);
    }

    self.emit('end');
  });
};
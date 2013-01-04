
var Stream = require('stream').Stream
  , util = require('util')
  , resources = require('../../collections/resources')
  , temp = require('../../collections/temp');

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
  temp.pushData(this.name, data);
};

Persist.prototype.end = function() {
  var self = this;
  
  temp.getData(this.name, function(err, tempRes){

    resources.create({
      name: self.name,
      canonical: self.canonical,
      group: self.group,
      count: tempRes.data.length,
      data: tempRes.data
    }, function(err){
      if (err) {
        throw err;
        self.emit('error', err);
      }

      self.emit('end');
      temp.clean(self.name);

    });
  });
};
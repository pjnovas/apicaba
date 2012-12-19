
var Stream = require('stream').Stream
  , fs = require('fs')
  , util = require('util');

var Persist = module.exports = function(name, path) {

  Stream.call(this);

  this.name = name;
  this.path = path;
};

util.inherits(Persist, Stream);

Persist.prototype.write = function(data) {
  var self = this,
    dataStr = JSON.stringify(data);

  fs.writeFile(this.path + '/' + this.name + '.json', dataStr, function (err) {
    if (err) throw err;
    self.emit('data', dataStr);
  });

};

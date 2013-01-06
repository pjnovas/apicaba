
var Stream = require('stream').Stream
  , util = require('util')
  , resources = require('../../collections/resources');

var Persist = module.exports = function(name, group, fields) {

  Stream.call(this);
  this.writable = true;

  this.name = name;
  this.group = group;
  this.fields = fields;

  //TODO: manage á é í ó ú & special chars

  this.canonical = name.toLowerCase().replace(/ /g, '-');
  this.resourceColl = name.toLowerCase().replace(/ /g, '_');
  this.count = 0;
};

util.inherits(Persist, Stream);

Persist.prototype.write = function(data) {
  this.count += data.length;
  resources.pushTempData(this.resourceColl + '_temp', data);
};

Persist.prototype.end = function() {
  var self = this;

  resources.renameResource(this.resourceColl + '_temp', this.resourceColl);

  resources.create({
    name: self.name,
    canonical: self.canonical,
    group: self.group,
    collection: this.resourceColl,
    count: this.count,
    fields: this.fields
  }, function(err){
    if (err) {
      throw err;
      self.emit('error', err);
    }

    self.count = 0;
    self.emit('end');
  });  
};

var Stream = require('stream').Stream
  , util = require('util')
  , resources = require('../../collections/resources');

var Persist = module.exports = function(job) {

  Stream.call(this);
  this.writable = true;

  this.name = job.name;
  this.canonical = job.canonical;
  this.description = job.description;
  this.group = job.group;
  this.fields = job.source.fields;

  this.resourceColl = this.canonical.replace(/-/g, '_');
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
    name: this.name,
    description: this.description,
    canonical: this.canonical,
    group: this.group,
    collection: this.resourceColl,
    count: this.count,
    columns: this.fields
  }, function(err){
    if (err) {
      throw err;
      self.emit('error', err);
    }

    self.count = 0;
    self.emit('end');
  });  
};
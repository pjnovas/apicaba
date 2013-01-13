
var EventEmitter = require('events').EventEmitter
  , Fetcher = require('./stream/fetcher')
  , Formatter = require('./stream/formatter')
//  , Sanitizer = require('./stream/sanitizer')
  , Persist = require('./stream/persist')
  , util = require('util');

var Job = module.exports = function (options) {

  this._id = (options && options._id && options._id.toString()) || '';
  this.resource = (options && options.name) || '';
  this.group = (options && options.group) || '';

  if(options && options.source) {
    this.fetcher = new Fetcher(options.source.url);
    this.formatter = new Formatter(options.source);
    this.persist = new Persist(options.name, options.description, options.group, options.source.fields);
  }

  this.cronJob;
}

util.inherits(Job, EventEmitter);

Job.prototype.run = function() {
  var self = this;

  this.emit('run');

  this.fetcher
    .pipe(this.formatter)
    .pipe(this.persist);

  this.persist.on('end', function(){
    self.persist.removeAllListeners('end');
    self.emit('done');
  });

  this.fetcher.fetch();
};

Job.prototype.cronJob = function(cronJob) {
  if (!cronJob)
    return this.cronJob;
  else this.cronJob = cronJob;
};

Job.prototype.destroy = function() {

  //TODO: checkout how to destroy streams
  /*
  this.fetcher.destroy();
  this.formatter.destroy();
  this.persist.destroy();
  */

  this.fetcher = null;
  this.formatter = null;
  this.persist = null;

  this.cronJob.stop();
  this.cronJob = null;
  
  this
    .removeAllListeners('run')
    .removeAllListeners('done')
    .removeAllListeners('error');
};

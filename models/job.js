
var EventEmitter = require('events').EventEmitter
  , Fetcher = require('./stream/fetcher')
  , Formatter = require('./stream/formatter')
  , Persist = require('./stream/persist')
  , util = require('util');

var Job = module.exports = function (job) {

  this._id = (job && job._id && job._id.toString()) || '';
  this.resource = (job && job.name) || '';
  this.group = (job && job.group) || '';

  if(job && job.source) {
    this.fetcher = new Fetcher(job.source.url);
    this.formatter = new Formatter(job.source);
    this.persist = new Persist(job);
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

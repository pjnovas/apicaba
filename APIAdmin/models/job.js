
var EventEmitter = require('events').EventEmitter
  , Fetcher = require('./stream/fetcher')
  , Formatter = require('./stream/formatter')
//  , Sanitizer = require('./stream/sanitizer')
  , Persist = require('./stream/persist')
  , util = require('util');

var Job = module.exports = function (options) {

  this.resource = (options && options.name) || '';

  if(options && options.source) {
    this.fetcher = new Fetcher(options.source.url, options.source.extract);
    this.formatter = new Formatter(options.source.parser);
    this.persist = new Persist(options.name);
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
    self.emit('done');
  });

  this.fetcher.fetch();
};

Job.prototype.cronJob = function(cronJob) {
  if (!cronJob)
    return this.cronJob;
  else this.cronJob = cronJob;
};
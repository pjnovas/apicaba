
var EventEmitter = require('events').EventEmitter
  , Fetcher = require('./fetcher')
  , Formatter = require('./formatter')
//  , Sanitizer = require('./sanitizer')
  , Persist = require('./persist')
  , util = require('util');

var Job = module.exports = function (options, appConfigs) {

  this.resource = (options && options.name) || '';

  if(options && options.source && appConfigs && appConfigs.dest) {
    this.fetcher = new Fetcher(options.source.url, options.source.extract);
    this.formatter = new Formatter(options.source.parser);
    this.persist = new Persist(options.name, appConfigs.dest);
  }
}

util.inherits(Job, EventEmitter);

Job.prototype.run = function() {
  var self = this;

  this.emit('run');

  this.fetcher
    .pipe(this.formatter)
    .pipe(this.persist)
    .pipe(process.stdout);

  this.fetcher.fetch();
  
  self.emit('done');
};

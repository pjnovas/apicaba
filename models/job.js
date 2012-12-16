
var events = require('events')
  , Fetcher = require('./fetcher')
  , Formatter = require('./formatter')
//  , Sanitizer = require('./sanitizer')
//  , Persist = require('./persist');

function Job(options){
  this.resource = (options && options.name) || '';

  if(options && options.source) {
    this.fetcher = new Fetcher(options.source.url, options.source.extract);
    this.formatter = new Formatter(options.source.parser);
  }
}

module.exports = Job;
module.exports.prototype = new events.EventEmitter();

module.exports.prototype.run = function(){
 
  this.fetcher.pipe(this.formatter).pipe(process.stdout); 
 
  //this.fetcher.fetch();

  this.emit('run');
}

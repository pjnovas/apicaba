
var events = require('events');

function Job(options){
  this.resource = (options && options.name) || '';
}

module.exports = Job;
module.exports.prototype = new events.EventEmitter();

module.exports.prototype.run = function(){

  this.emit('run');
}

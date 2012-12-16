
var events = require('events');

function Job(resourceId){
  this.resource = resourceId;
}

module.exports = Job;
module.exports.prototype = new events.EventEmitter();

module.exports.prototype.run = function(){

  this.emit('run', this.resource);
}


var events = require('events')
  , fs = require('fs')
  , Job = require('./job');

var emitter = new events.EventEmitter();
var jobs = [];

function initialize(configs, done){
  fs.readdir(configs, function(err, files){

    for(var i=0; i<files.length; i++) {
      createJob(configs + '/' + files[i]);
    }

    done();
  });
  
  return this;
}

function createJob(fileName){
  var cfg = require(fileName);
  
  var job = new Job(cfg);
  job.on('run', function(){
    emitter.emit('run', this);
  });

  jobs.push(job);
}

var scheduler = module.exports = emitter;

scheduler.initialize = initialize;
scheduler.getJobs = function(){
  return jobs;
};

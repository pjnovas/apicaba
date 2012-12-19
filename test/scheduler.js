
var expect = require('expect.js')
  , scheduler = require('../models/scheduler.js')
  , Job = require('../models/job.js')
  , events = require('events')
  , fs = require('fs')
  , configPath = __dirname + '/config'
  , appConfig = { "dest": "./test/data" };

describe('scheduler', function(){

  describe('#initialize', function(){

    it('should have method initialize', function(){
      expect(scheduler.initialize).to.be.a('function');
    });

    it('should receive a path with configs and create jobs', function(done){
      scheduler.initialize(configPath, appConfig, function(){
        fs.readdir(configPath, function(err, files){
          expect(scheduler.getJobs().length).to.be.equal(files.length);
          done();
        });
      });
    });
  
  });

  describe('#getJobs', function(){

    it('should have a method getJobs with an array of jobs created', function(){
      expect(scheduler.getJobs).to.be.a('function');
      var jobs = scheduler.getJobs();
      expect(jobs).to.be.an('array');
    });

  });

  describe('events', function(){

    it('should allow to suscribe to a job run or done', function(done){
      scheduler
        .on('run', function(job){
          expect(job).to.be.a(Job);
          scheduler.removeAllListeners('run');
        })
        .on('done', function(job){
          expect(job).to.be.a(Job);
          scheduler.removeAllListeners('done');
          done();
        })
        .initialize(configPath, appConfig);
    });

  });
});

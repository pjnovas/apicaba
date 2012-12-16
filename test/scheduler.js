
var expect = require('expect.js')
  , scheduler = require('../models/scheduler.js')
  , Job = require('../models/job.js')
  , events = require('events')
  , configPath = __dirname + '/config';

describe('scheduler', function(){

  describe('#initialize', function(){

    it('should have method initialize', function(){
      expect(scheduler.initialize).to.be.a('function');
    });

    it('should receive a path with configs and create jobs', function(done){
      scheduler.initialize(configPath, function(){
        expect(scheduler.getJobs().length).to.be.equal(1);
        done();
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
      scheduler.on('run', function(job){
        expect(job).to.be.a(Job);
        done();
      });

      scheduler.initialize(configPath, function(){
        scheduler.getJobs()[0].run();
      });
    });

  });
});

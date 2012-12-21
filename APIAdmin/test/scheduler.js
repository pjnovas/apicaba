
var expect = require('expect.js')
  , scheduler = require('../models/scheduler')
  , resources = require('../../collections/resources')

  , db = app.db
  , mockGBA = app.mockGBA
  , name = 'bicis_Create';

describe('Scheduler', function(){
  var jobInfo = {
    "name": name,
    "cron": "*/40 * * * * *", //every 40 seconds
    "source": {
      "url": mockGBA + "bicis.csv",
      "parser": "csv"
    }
  };

  after(function(){
    scheduler
      .removeAllListeners('run')
      .removeAllListeners('done');

    db.jobs.remove();
  })

  it("should allow to add a job and run it immediatly", function(done){

     scheduler
      .on('run', checkJob)
      .on('done', jobDone)
      .initialize(function(err){
        expect(err).to.not.be.ok();
      });

    function checkJob(job){
      expect(job.resource).to.be.equal(name);
    }

    function jobDone(job){
      expect(job.resource).to.be.equal(name);

      done();
    }

    scheduler.addJob(jobInfo, true);
  });

});

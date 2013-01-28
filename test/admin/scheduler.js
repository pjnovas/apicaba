
var expect = require('expect.js')
  , scheduler = require('../../models/scheduler')
  , resources = require('../../collections/resources')
  , jobs = require('../../collections/jobs')

  , db = app.db
  , ObjectId = require('mongojs').ObjectId
  , mockGBA = app.mockGBA
  , name = 'bicis_Create'
  , group = 'urbano';

describe('Scheduler', function(){
  var jobInfo = {
    "name": name,
    "canonical": 'bicis_Create',
    "group": "urbano",
    "cron": "*/40 * * * * *", //every 40 seconds
    "source": {
      "url": mockGBA + "bicis.csv",
      "parser": "csv",
      "fields": [{
        "name": "id",
        "type": "string"
      },{
        "name": "nombre",
        "type": "string"
      },{
        "name": "latitud",
        "type": "string"
      },{
        "name": "longitud",
        "type": "string"
      }]
    }
  };

  after(function(){
    scheduler
      .removeAllListeners('run')
      .removeAllListeners('done');

    db.jobs.remove();
  });

  it("should allow to add a job and run it immediatly", function(done){

     scheduler
      .on('run', checkJob)
      .on('done', jobDone)
      .initialize(function(err){
        expect(err).to.not.be.ok();
      });

    function checkJob(job){
      expect(job.resource).to.be.equal(name);
      expect(job.group).to.be.equal(group);
    }

    function jobDone(job){
      expect(job.resource).to.be.equal(name);
      expect(job.group).to.be.equal(group);

      jobs.getById(job._id, function(err, jobFound){
        expect(err).to.not.be.ok();

        expect(jobFound).to.have.property('createdAt');
        expect(jobFound.createdAt).to.be.a(Date);
        
        expect(jobFound).to.have.property('lastRun');
        expect(jobFound.lastRun).to.be.a(Date);
        
        done();
      });
    }

    jobs.create(jobInfo, function(err, job){
      scheduler.addJob(jobInfo, true);
    });

  });

});

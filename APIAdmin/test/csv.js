
var expect = require('expect.js')
  , scheduler = require('../models/scheduler')
  , resources = require('../../collections/resources')

  , db = app.db
  , mockGBA = app.mockGBA
  , name = 'bicis';

describe('#CSV', function(){
  
  before(function(done){
    createTestJobs(done);
  });

  after(function(done){
    scheduler
      .removeAllListeners('run')
      .removeAllListeners('done');

    clearJobs(done);
  });

  it("should create a Scheduled Job and run it in 1 second generating a Resource", function(done){
    var hasRun = false;

    scheduler
      .on('run', checkJob)
      .on('done', jobDone)
      .initialize(function(err){
        expect(err).to.not.be.ok();
      });

    setTimeout(function(){
      expect(hasRun).to.be.equal(true);
    }, 1005);

    function checkJob(job){
      expect(job.resource).to.be.equal(name);
      hasRun = true;
    }

    function jobDone(job){
      expect(job.resource).to.be.equal(name);
      resources.getByName(name, checkResource);
    }

    function checkResource(err, resource){
      expect(resource.name).to.be.equal(name);
      expect(resource.data).to.be.an('array');
      expect(resource.data.length).to.be.equal(28);

      var aBiciData = resource.data[0];
      expect(aBiciData).to.have.property('EtacionID');
      expect(aBiciData).to.have.property('EstacionNombre');
      expect(aBiciData).to.have.property('cLat');
      expect(aBiciData).to.have.property('cLong');

      done();
    }

  });

});

function createTestJobs(done){

  db.jobs.insert({
    "name": name,
    "cron": "* * * * * *",
    "source": {
      "url": mockGBA + "bicis.csv",
      "parser": "csv"
    }
  });

  done();
}

function clearJobs(done){

  db.jobs.remove();

  done();
}
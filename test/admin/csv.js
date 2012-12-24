
var expect = require('expect.js')
  , scheduler = require('../../models/scheduler')
  , resources = require('../../collections/resources')

  , db = app.db
  , mockGBA = app.mockGBA
  , name = 'bicis'
  , group = 'urbano';

describe('#CSV', function(){
  
  before(function(done){
    clearData(function(){
      createTestJobs(done);
    });
  });

  after(function(done){
    scheduler
      .removeAllListeners('run')
      .removeAllListeners('done');

    clearData(done);
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

      resources.getByGroupName(group, function(err, _resources){
        expect(err).to.not.be.ok();
        expect(_resources).to.be.an('array');
        expect(_resources.length).to.be.equal(1);
        expect(_resources[0].name).to.be.equal(name);

        resources.getByName(name, checkResource);  
      });

    }, 1500);

    function checkJob(job){
      expect(job.resource).to.be.equal(name);
      hasRun = true;
    }

    function jobDone(job){
      expect(job.resource).to.be.equal(name);
    }

    function checkResource(err, resource){
      expect(err).to.not.be.ok();
      expect(resource.name).to.be.equal(name);
      expect(resource.data).to.be.an('array');
      expect(resource.data.length).to.be.equal(28);

      var aBiciData = resource.data[5];
      expect(aBiciData).to.be.an('object');
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
    "group": group,
    "cron": "* * * * * *",
    "source": {
      "url": mockGBA + "bicis.csv",
      "parser": "csv"
    }
  });

  done();
}

function clearData(done){

  db.jobs.remove();
  db.resources.remove();

  done();
}
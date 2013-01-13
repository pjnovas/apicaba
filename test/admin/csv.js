
var expect = require('expect.js')
  , scheduler = require('../../models/scheduler')
  , resources = require('../../collections/resources')

  , db = app.db
  , mockGBA = app.mockGBA
  , canonical = 'bicis-locas'
  , collection = 'bicis_locas'
  , jobTest = {
    "name": "bicis locas",
    "description": "Bicicletas locas y magicas",
    "group": "urbano",
    "cron": "* * * * * *",
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

      resources.getByGroupName(jobTest.group, function(err, _resources){
        expect(err).to.not.be.ok();
        expect(_resources).to.be.an('array');
        expect(_resources.length).to.be.equal(1);
        expect(_resources[0].name).to.be.equal(jobTest.name);
        expect(_resources[0].description).to.be.equal(jobTest.description);

        resources.getByName(jobTest.name, checkResource);
      });

    }, 1500);

    function checkJob(job){
      expect(job.resource).to.be.equal(jobTest.name);
      hasRun = true;
    }

    function jobDone(job){
      expect(job.resource).to.be.equal(jobTest.name);
    }

    function checkResource(err, resource){

      expect(err).to.not.be.ok();
      expect(resource.name).to.be.equal(jobTest.name);
      expect(resource.description).to.be.equal(jobTest.description);
      expect(resource.canonical).to.be.equal(canonical);
      expect(resource.group).to.be.equal(jobTest.group);
      expect(resource.count).to.be.equal(28);
      expect(resource.collection).to.be.equal(collection);

      expect(resource.columns).to.be.an('array');

      for (var i = 0; i < resource.columns.length; i++){
        expect(resource.columns[i]).to.be.eql(jobTest.source.fields[i]);
      }

      done();
    }

  });

  it("should create a resource collection by its canonical name with undersocre", function(done){
    
     resources.getByQuery(collection, {}, function(err, resourceList){

      expect(err).to.not.be.ok();
      expect(resourceList).to.be.an('array');
      expect(resourceList.length).to.be.equal(28);

      var aBiciData = resourceList[5];
      expect(aBiciData).to.be.an('object');
      expect(aBiciData).to.have.property('id');
      expect(aBiciData).to.have.property('nombre');
      expect(aBiciData).to.have.property('latitud');
      expect(aBiciData).to.have.property('longitud');
      
      done();
        
    });
  });

});

function createTestJobs(done){

  db.jobs.insert(jobTest);

  done();
}

function clearData(done){

  db.jobs.remove();
  db.resources.remove();

  done();
}
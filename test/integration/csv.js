
var expect = require('expect.js')
  , Job = require('../../models/job.js')
  , fs = require('fs')
  , dataDir = './test/integration/data'
  , fullDir = __dirname + '/data/bicis.json'
  , config = require(__dirname + '/config/bicis.json')
  , appConfig = {
      dest: dataDir
    };

describe('Integration #CSV', function(){

  afterEach(function(done){
    fs.lstat(fullDir, function(err, stats){
      if (stats) {
        fs.unlink(dataDir + '/bicis.json', function(err){
          if (err) throw err;
          done();
        });
      }
      else done();
    });
  });

  it("should create a JSON file parsing from a CSV file", function(done){
    var job = new Job(config, appConfig);

    job
      .on('run', function(){
        expect(this.resource).to.be.equal('bicis');
      })
      .on('done', function(){
        expect(this.resource).to.be.equal('bicis');

        var bicis = require('./data/bicis.json');
        expect(bicis.length).to.be.equal(27);
        done();
      })
      .run();
  });

});

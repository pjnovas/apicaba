
var expect = require('expect.js')
  request = require('superagent')
  , Job = require('../../models/job.js')
  , fs = require('fs')
  , dataDir = '../../data'
  , file = '/bicis.json'
  , APIServerURL = 'http://localhost:3000/api/v1/'
  , config = require(__dirname + '/config/bicis.json')
  , appConfig = {
      dest: './data'
    };

describe('Integration #CSV', function(){

  require('../../webserver').start();

  afterEach(function(done){
    fs.realpath(appConfig.dest, function (err, resolvedPath) {
      if (err) throw err;

      fs.lstat(resolvedPath + file, function(err, stats){
        if (stats) {
          fs.unlink(resolvedPath + file, function(err){
            if (err) throw err;
            done();
          });
        }
        else done();
      });
    });
  });

  it("should create a JSON file parsing from a CSV URL and expose on the Rest API", function(done){
    var job = new Job(config, appConfig);

    job
      .on('run', function(){
        expect(this.resource).to.be.equal('bicis');
      })
      .on('done', function(){
        expect(this.resource).to.be.equal('bicis');
        var bicis = require(dataDir + file);
        expect(bicis.length).to.be.equal(28);

        request(APIServerURL + 'bicis', function(res){

          expect(res.ok).to.be.ok();
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.equal(28);
        
          done();  
        });
      })
      .run();
  });

});

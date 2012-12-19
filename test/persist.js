var expect = require('expect.js')
  , Persist = require('../models/persist.js')
  , Stream = require('stream').Stream
  , fs = require('fs')
  , config = require(__dirname + '/config/test.json')
  , dataDir = './test/data'
  , fullDir = __dirname + '/data/bicicletas.json';

describe('Persist', function(){

  afterEach(function(done){
    fs.lstat(fullDir, function(err, stats){
      if (stats) {
        fs.unlink(dataDir + '/bicicletas.json', function(err){
          if (err) throw err;
          done();
        });
      }
      else done();
    });
  });

  it('should be a Class and inherit from Stream', function(){
    expect(Persist).to.be.a('function');
    var persist = new Persist();
    expect(persist).to.be.a(Persist);
    expect(persist).to.be.a(Stream);
  });

  describe('#write()', function(){

    it('should be able to write data to a json file', function(done){
      var jsonDummyData = { "hello": "world" };
      var persist = new Persist('bicicletas', dataDir);

      persist.on('data', function(data){
        expect(data).to.be.a('string');
        expect(data).to.be.equal("{\"hello\":\"world\"}");

        fs.lstat(fullDir, function(err, stats){
          expect(err).to.not.be.ok();
          expect(stats.isFile()).to.be.ok();
          done();
        });
      });

      persist.write(jsonDummyData);
    });

  });

  describe('events', function(){

    it('should expose event data passing the formatted data', function(done){
      var persist = new Persist("bicicletas", dataDir);

      persist.on('data', function(data){
        expect(data).to.be.a('string');
        expect(data).to.be.equal("{\"persist\":\"me\"}");
        done();
      });

      persist.write({ persist: "me" });
    });

  });

});



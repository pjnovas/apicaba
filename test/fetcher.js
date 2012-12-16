var expect = require('expect.js')
  , Fetcher = require('../models/fetcher.js')
  , Stream = require('stream').Stream
  , config = require(__dirname + '/config/test.json')
  , configZip = require(__dirname + '/config/zip.json');

describe('Fetcher', function(){

  it('should be a Class and inherit from Stream', function(){
    expect(Fetcher).to.be.a('function');
    var fetcher = new Fetcher(config.source.url); // bicicletas
    expect(fetcher).to.be.a(Fetcher);
    expect(fetcher).to.be.a(Stream);
  });

  describe('#fetch()', function(){

    it('should have a method named fetch()', function(){
      var fetcher = new Fetcher();
      expect(fetcher.fetch).to.be.a('function');
    });

    it('should be able to extract a ZIP file'/*, function(done){
      var fetcher = new Fetcher(configZip.source.url, configZip.source.extract);

      fetcher.on('data', function(data){
        expect(data).to.be.a('string');
        done();
      });

      fetcher.fetch();
    }*/);

  });

  describe('events', function(){

    it('should expose event data passing the fetched data', function(done){
      var fetcher = new Fetcher(config.source.url);

      fetcher.on('data', function(data){
        expect(data).to.be.a('string');
        done();
      });

      fetcher.fetch();
    });

  });

});


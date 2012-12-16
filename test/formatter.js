var expect = require('expect.js')
  , Formatter = require('../models/formatter.js')
  , Stream = require('stream').Stream
  , config = require(__dirname + '/config/test.json');

describe('Formatter', function(){

  it('should be a Class and inherit from Stream', function(){
    expect(Formatter).to.be.a('function');
    var formatter = new Formatter(config.source.url); // bicicletas
    expect(formatter).to.be.a(Formatter);
    expect(formatter).to.be.a(Stream);
  });

  describe('#fetch()', function(){

  });

  describe('events', function(){

    it('should expose event data passing the formatted data', function(done){
      var formatter = new Formatter();

      formatter.on('data', function(data){
        expect(data).to.be.a('string');
        done();
      });

      formatter.write("format me");
    });

  });

});



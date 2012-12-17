var expect = require('expect.js')
  , Formatter = require('../models/formatter.js')
  , Stream = require('stream').Stream
  , config = require(__dirname + '/config/test.json')
  , sinon = require('sinon');

describe('Formatter', function(){

  it('should be a Class and inherit from Stream', function(){
    expect(Formatter).to.be.a('function');
    var formatter = new Formatter(config.source.url); // bicicletas
    expect(formatter).to.be.a(Formatter);
    expect(formatter).to.be.a(Stream);
  });

  describe('#write()', function(){

    it('should be able to format csv data', function(done){
      var csvDummyData = "pepe, loco";
      var formatter = new Formatter('csv');

      var spy_formatCSV = sinon.stub(formatter, "formatCSV", function(csv){
        expect(csv).to.be.equal(csvDummyData);
        spy_formatCSV.restore();
        done();
      });

      formatter.write(csvDummyData);
    });

    it('should be able to format xml data', function(done){
      var xmlDummyData = "<node>pepe loco</node>";
      var formatter = new Formatter('xml');

      var spy_formatXML = sinon.stub(formatter, "formatXML", function(csv){
        expect(csv).to.be.equal(xmlDummyData);
        spy_formatXML.restore();
        done();
      });

      formatter.write(xmlDummyData);
    });

    it('should be able to pass the exact same data if no format is specify', function(done){
      var noFormaDummyData = "hello formatter";
      var formatter = new Formatter();

      formatter.on('data', function(data){
        expect(data).to.be.a('string');
        expect(data).to.be.equal(noFormaDummyData);
        done();
      });

      formatter.write(noFormaDummyData);
    });
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




var expect = require('expect.js')
  , Job = require('../models/job.js')
  , events = require('events');

describe('Job', function(){

  it('should be a Class and inherit from EventEmitter', function(){
    expect(Job).to.be.a('function');
    var job = new Job();
    expect(job).to.be.a(Job);
    expect(job).to.be.a(events.EventEmitter);
  });

  it('should allow to set a resource id by constructor', function(){
    var idResource = 'testResource'
      , job = new Job(idResource);

    expect(job.resource).to.be.equal(idResource);
  });

  describe('#run()', function(){

    it('should have a method named run()', function(){
      var job = new Job();
      expect(job.run).to.be.a('function');
    });

  });

  describe('events', function(){

    it('should expose event run telling the resource id', function(done){
      var idResource = 'testResource'
        , job = new Job(idResource);

      job.on('run', function(id){
        expect(id).to.be.equal(idResource);
        done();
      });

      job.run();
    });

  });

});


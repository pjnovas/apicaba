
var expect = require('expect.js')
  , Job = require('../models/job.js')
  , events = require('events')
  , config = require(__dirname + '/config/test.json');

describe('Job', function(){

  it('should be a Class and inherit from EventEmitter', function(){
    expect(Job).to.be.a('function');
    var job = new Job();
    expect(job).to.be.a(Job);
    expect(job).to.be.a(events.EventEmitter);
  });

  it('should allow to set configuration by constructor', function(){
    var job = new Job(config);
    expect(job.resource).to.be.equal(config.name);
  });

  describe('#run()', function(){

    it('should have a method named run()', function(){
      var job = new Job();
      expect(job.run).to.be.a('function');
    });

  });

  describe('events', function(){

    it('should expose event run telling the resource id', function(done){
      var job = new Job(config);

      job.on('run', function(){
        expect(this.resource).to.be.equal(config.name);
        done();
      });

      job.run();
    });

  });

});



var expect = require('expect.js')
  , csv = require('../models/csv.js')
  , fs = require('fs')
  , testFilePath = __dirname + '/testServer/public/test.csv';

describe('CSV', function(){
  var dummyData;

  before(function(done){

    fs.readFile(testFilePath, 'utf8', function(err, data) {
      if (err) throw err;
      dummyData = data;
      done();
    });
  });

  it('should be a function', function(){
    expect(csv).to.be.a('function');
  });

  it('should return a valid JSON array', function(){
    var parsed = csv(dummyData);
    expect(parsed).to.be.an('array');
  });

  it('should parse all rows', function(){
    var parsed = csv(dummyData);
    expect(parsed.length).to.be.equal(28);
  });

  it('should parse the header as field info', function(){
    var parsed = csv(dummyData);
    expect(parsed[0].hasOwnProperty('EtacionID')).to.be.equal(true);
    expect(parsed[0].hasOwnProperty('EstacionNombre')).to.be.equal(true);
    expect(parsed[0].hasOwnProperty('cLat')).to.be.equal(true);
    expect(parsed[0].hasOwnProperty('cLong')).to.be.equal(true);
  });

});





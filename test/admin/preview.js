
var expect = require('expect.js')
  , Preview = require('../../models/preview')
  , mockGBA = app.mockGBA
  , job = {
    "url": mockGBA + "bicis.csv",
    "parser": "csv",
    "delimiter": ","
  };

describe('Preview', function(){
  
  it("should create a Preview of a Resource", function(done){
    
    var prev = new Preview(job.url, job.parser, job.delimiter);

    prev.run(function(err, prevData){
      expect(err).to.not.be.ok();

      expect(prevData).to.be.an('object');
      expect(prevData.data).to.be.an('array');
      expect(prevData.data.length).to.be.equal(10);

      expect(prevData.fields).to.be.an('array');
      expect(prevData.fields[0].name).to.be.equal('EstacionID');
      expect(prevData.fields[1].name).to.be.equal('EstacionNombre');
      expect(prevData.fields[2].name).to.be.equal('cLat');
      expect(prevData.fields[3].name).to.be.equal('cLong');  

      done();
    });

  });

});

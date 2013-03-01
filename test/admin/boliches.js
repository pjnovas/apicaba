
var expect = require('expect.js')
  , Preview = require('../../models/preview')
  , mockGBA = app.mockGBA
  , job = {
    "url": mockGBA + "inspectores.csv",
    "parser": "csv",
    "delimiter": ","
  };

describe('Preview Inspectores', function(){
  
  it("should create a Preview of a Resource", function(done){
    
    var prev = new Preview(job.url, job.parser, job.delimiter);

    prev.run(function(err, prevData){
      expect(err).to.not.be.ok();
      
      expect(prevData).to.be.an('object');
      expect(prevData.data).to.be.an('array');
      expect(prevData.data.length).to.be.equal(10);

      expect(prevData.fields).to.be.an('array');
      expect(prevData.fields[0].name).to.be.equal('ORDEN');
      expect(prevData.fields[1].name).to.be.equal('DEPARTAMENTO');
      expect(prevData.fields[2].name).to.be.equal('DIVISION');
      expect(prevData.fields[3].name).to.be.equal('EQUIPO');
      expect(prevData.fields[4].name).to.be.equal('INSPECTOR');
      expect(prevData.fields[5].name).to.be.equal('FOTO');
      expect(prevData.fields[6].name).to.be.equal('FICHA CENSAL');
      expect(prevData.fields[7].name).to.be.equal('SUPERVISOR');

      done();
    });

  });

});

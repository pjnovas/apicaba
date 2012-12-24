
var expect = require('expect.js')
  , groups = require('../../collections/groups')
  , resources = require('../../collections/resources')
  , request = require('superagent')
  , host = app.server;

describe('#Groups', function(){
  
  it("should retrieve a list of groups when api/grupos/ is called", function(done){
    request(host + 'api/grupos', function(res){
      expect(res.ok).to.be.ok();
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(3);

      expect(res.body[0].name).to.be.equal("Desarrollo Urbano");
      expect(res.body[1].name).to.be.equal("Finanzas Públicas");
      expect(res.body[2].name).to.be.equal("Información Digital");

      expect(res.body[0].url).to.be.equal(host + "api/desarrollo-urbano");
      expect(res.body[1].url).to.be.equal(host + "api/finanzas-publicas");
      expect(res.body[2].url).to.be.equal(host + "api/informacion-digital");

      done();
    });
  });

  it("should retrieve the list of resources when api/finanzas-publicas/ is called", function(done){
    request(host + 'api/finanzas-publicas', function(res){
      expect(res.ok).to.be.ok();
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(2);

      expect(res.body[0].name).to.be.equal("Pauta Publicitaria 2012");
      expect(res.body[1].name).to.be.equal("Sueldos Funcionarios");

      expect(res.body[0].url).to.be.equal(host + "api/finanzas-publicas/pauta-publicitaria-2012");
      expect(res.body[1].url).to.be.equal(host + "api/finanzas-publicas/sueldos-funcionarios");

      done();
    });
  });

  it("should retrieve a resource when api/finanzas-publicas/pauta-publicitaria-2012 is called", function(done){
    request(host + 'api/finanzas-publicas/pauta-publicitaria-2012', function(res){
      expect(res.ok).to.be.ok();
      expect(res.body).to.be.an('object');
      
      expect(res.body.name).to.be.equal('Pauta Publicitaria 2012');
      expect(res.body.group).to.be.equal('Finanzas Públicas');
      expect(res.body.parent).to.be.equal(host + "api/finanzas-publicas/");

      expect(res.body.data).to.be.an('array');
      expect(res.body.data.length).to.be.equal(3);
      
      done();
    });
  });
});


var expect = require('expect.js')
  , groups = require('../collections/groups')
  , resources = require('../collections/resources')
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

      expect(res.body[1].name).to.be.equal("Sueldos Funcionarios");
      expect(res.body[0].name).to.be.equal("Pauta Publicitaria 2012");

      expect(res.body[1].url).to.be.equal(host + "api/finanzas-publicas/sueldos-funcionarios");
      expect(res.body[0].url).to.be.equal(host + "api/finanzas-publicas/pauta-publicitaria-2012");

      done();
    });
  });
});

describe('#Resources', function(){
  
  it("should retrieve a resource when api/finanzas-publicas/pauta-publicitaria-2012 is called", function(done){
    request(host + 'api/finanzas-publicas/pauta-publicitaria-2012', function(res){
      expect(res.ok).to.be.ok();
      expect(res.body).to.be.an('object');
      
      expect(res.body.name).to.be.equal('Pauta Publicitaria 2012');
      expect(res.body.group).to.be.an('object');
      expect(res.body.group.name).to.be.equal('Finanzas Públicas');
      expect(res.body.group.url).to.be.equal(host + "api/finanzas-publicas/");
      
      expect(res.body.count).to.be.equal(3);
      expect(res.body.columns.length).to.be.equal(2);

      done();
    });
  });

  it("should retrieve a list of resources when is called with q=preview", function(done){
    request(host + 'api/finanzas-publicas/pauta-publicitaria-2012?q=preview', function(res){

      expect(res.ok).to.be.ok();
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(3);

      var pauta = res.body[1];
      expect(pauta.medio).to.be.equal("A MEDIO CAMINO");
      expect(pauta.monto).to.be.equal(25338.60);
      
      done();
    });
  });

  it("should retrieve a list of resources found when is called with a query", function(done){
    request(host + 'api/finanzas-publicas/pauta-publicitaria-2012?medio=AM1010', function(res){

      expect(res.ok).to.be.ok();
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(1);

      var pauta = res.body[0];
      expect(pauta.medio).to.be.equal("AM1010");
      expect(pauta.monto).to.be.equal(6338.60);
      
      done();
    });
  });

});


var expect = require('expect.js')
  , groups = require('../collections/groups')
  , resources = require('../collections/resources')
  , request = require('superagent')
  , host = app.server;

describe('#Categories', function(){
  
  it("should retrieve a list of categories when api/categorias/ is called", function(done){
    request(host + 'api/categories', function(res){
      expect(res.ok).to.be.ok();
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(11);

      expect(res.body[3].name).to.be.equal("Finanzas Públicas");
      expect(res.body[3].uri).to.be.equal(host + "api/categorias/finanzas-publicas");
      
      done();
    });
  });

  it("should retrieve the details of the category when api/categorias/finanzas-publicas/ is called", function(done){
    request(host + 'api/categorias/finanzas-publicas', function(res){
      expect(res.ok).to.be.ok();
      var category = res.body;

      expect(category).to.be.an('object');
      
      expect(category.name).to.be.equal("Finanzas Públicas");
      //expect(res.body.uri).to.be.equal(hsot + "api/categorias/finanzas-publicas");
      
      expect(category.groups).to.be.an('array');
      expect(category.groups.length).to.be.equal(2);

      expect(category.groups[0].name).to.be.equal("Ejecución Presupuestaria 2012");
      expect(category.groups[1].name).to.be.equal("Pauta Publicitaria");

      expect(category.groups[0].uri).to.be.equal(host + "api/grupos/ejecucion-presupuestaria-2012");
      expect(category.groups[1].uri).to.be.equal(host + "api/grupos/pauta-publicitaria");

      expect(category.groups[0].description).to.be.equal("Información acorde a la Ley 70 la cual establece que el Poder Ejecutivo");
      expect(category.groups[1].description).to.be.equal("Montos (IVA incluído) destinados a las contrataciones de publicidad");

      done();
    });
  });

});

describe('#Groups', function(){
  
  it("should retrieve a list of groups when api/grupos/ is called", function(done){
    request(host + 'api/grupos', function(res){
      expect(res.ok).to.be.ok();
      var groups = res.body;
      expect(groups).to.be.an('array');
      expect(groups.length).to.be.equal(4);

      expect(groups[0].name).to.be.equal("Áreas de Protección Histórica");
      expect(groups[1].name).to.be.equal("Visitas a la web de GCBA 2011");
      expect(groups[2].name).to.be.equal("Ejecución Presupuestaria 2012");
      expect(groups[3].name).to.be.equal("Pauta Publicitaria");

      expect(groups[0].uri).to.be.equal(host + "api/grupos/areas-proteccion-historica");
      expect(groups[1].uri).to.be.equal(host + "api/grupos/visitas-web-GCBA-2011");
      expect(groups[2].uri).to.be.equal(host + "api/grupos/ejecucion-presupuestaria-2012");
      expect(groups[3].uri).to.be.equal(host + "api/grupos/pauta-publicitaria");

      expect(groups[0].description).to.be.equal("Información sobre las zonas de la Ciudad consultadas.");
      expect(groups[1].description).to.be.equal("Información sobre el análisis del trafico de visitas de la web");
      expect(groups[2].description).to.be.equal("Información acorde a la Ley 70 la cual establece que el Poder Ejecutivo");
      expect(groups[3].description).to.be.equal("Montos (IVA incluído) destinados a las contrataciones de publicidad");

      expect(groups[0].category).to.be.equal(host + "api/desarrollo-urbano");
      expect(groups[1].category).to.be.equal(host + "api/informacion-digital");
      expect(groups[2].category).to.be.equal(host + "api/finanzas-publicas");
      expect(groups[3].category).to.be.equal(host + "api/finanzas-publicas");

      done();
    });
  });

  it("should retrieve the details of the group when api/grupos/pauta-publicitaria/ is called", function(done){
    request(host + 'api/grupos/pauta-publicitaria', function(res){
      expect(res.ok).to.be.ok();
      
      var group = res.body;

      expect(group).to.be.an('object');
      expect(group.name).to.be.equal("Pauta Publicitaria");
      expect(group.description).to.be.equal("Montos (IVA incluído) destinados a las contrataciones de publicidad");
      expect(group.category).to.be.equal(host + "api/finanzas-publicas");

      expect(group.resources).to.be.an('array');
      expect(group.resources.length).to.be.equal(1);
      expect(group.resources[0].name).to.be.equal("Pauta Publicitaria 2012");
      expect(group.resources[0].description).to.be.equal("Montos (IVA incluído) destinados a pauta publicitaria 2012 según medio proveedor.");
      expect(group.resources[0].uri).to.be.equal(host + "api/recursos/pauta-publicitaria-2012");

      done();
    });
  });
});

describe('#Resources', function(){
  
  it("should return a Status Code 206 when api/recursos/ is called" /*, function(done){
    request(host + 'api/recursos/', function(res){
      expect(res.ok).to.be.ok();
      //TODO: check res.code
      done();
    });
  }*/);

  it("should retrieve a resource when api/recursos/pauta-publicitaria-2012/ is called", function(done){
    request(host + 'api/recursos/pauta-publicitaria-2012', function(res){
      expect(res.ok).to.be.ok();
      var resource = res.body;
      expect(resource).to.be.an('object');
      
      expect(resource.name).to.be.equal('Pauta Publicitaria 2012');
      expect(resource.group).to.be.an('object');
      expect(resource.group.name).to.be.equal('Finanzas Públicas');
      expect(resource.group.uri).to.be.equal(host + "api/finanzas-publicas/");
      expect(resource.count).to.be.equal(3);
      expect(resource.columns.length).to.be.equal(2);

      expect(resource.data).to.be.an('array');
      expect(resource.data.length).to.be.equal(3);

      var pauta = resource.data[1];
      expect(pauta.medio).to.be.equal("A MEDIO CAMINO");
      expect(pauta.monto).to.be.equal(25338.60);

      done();
    });
  });

  it("should retrieve a resource with data found when is called with a query", function(done){
    request(host + 'api/recursos/pauta-publicitaria-2012?medio=AM1010', function(res){

      expect(res.ok).to.be.ok();
      var resource = res.body;
      expect(resource).to.be.an('object');
      
      expect(resource.name).to.be.equal('Pauta Publicitaria 2012');
      expect(resource.group).to.be.an('object');
      expect(resource.group.name).to.be.equal('Finanzas Públicas');
      expect(resource.group.uri).to.be.equal(host + "api/finanzas-publicas/");
      expect(resource.count).to.be.equal(3);
      expect(resource.columns.length).to.be.equal(2);

      expect(resource.data).to.be.an('array');
      expect(resource.data.length).to.be.equal(3);

      var pauta = resource.data[1];
      expect(pauta.medio).to.be.equal("A MEDIO CAMINO");
      expect(pauta.monto).to.be.equal(25338.60);
      
      done();
    });
  });

});

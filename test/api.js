
var expect = require('expect.js')
  , groups = require('../collections/groups')
  , resources = require('../collections/resources')
  , request = require('superagent')
  , _ = require('underscore')
  , host = app.server;

describe('#Categories', function(){
  
  it("should retrieve a list of categories when api/categorias/ is called", function(done){
    request(host + 'api/categorias', function(res){
      expect(res.ok).to.be.ok();

      var categories = res.body;
      expect(categories).to.be.an('array');
      expect(categories.length).to.be.equal(11);

      var category = _.find(categories, function(c){
        return c.name === 'Finanzas Públicas';
      });

      expect(category).to.be.an('object');
      expect(category.name).to.be.equal("Finanzas Públicas");
      expect(category.uri).to.be.equal(host + "api/categorias/finanzas-publicas");
      
      done();
    });
  });

  it("should retrieve the details of the category when api/categorias/finanzas-publicas/ is called", function(done){
    request(host + 'api/categorias/finanzas-publicas', function(res){
      expect(res.ok).to.be.ok();
      var category = res.body;

      expect(category).to.be.an('object');
      
      expect(category.name).to.be.equal("Finanzas Públicas");
      
      expect(category.groups).to.be.an('array');
      expect(category.groups.length).to.be.equal(2);

      var groups = _.sortBy(category.groups, function(g){
        return g.name;
      });

      expect(groups[0].name).to.be.equal("Ejecución Presupuestaria 2012");
      expect(groups[1].name).to.be.equal("Pauta Publicitaria");

      expect(groups[0].uri).to.be.equal(host + "api/grupos/ejecucion-presupuestaria-2012");
      expect(groups[1].uri).to.be.equal(host + "api/grupos/pauta-publicitaria");

      expect(groups[0].description).to.be.equal("Información acorde a la Ley 70 la cual establece que el Poder Ejecutivo");
      expect(groups[1].description).to.be.equal("Montos (IVA incluído) destinados a las contrataciones de publicidad");

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

      var _groups = _.sortBy(groups, function(g){
        return g.uri;
      });

      expect(_groups[0].name).to.be.equal("Áreas de Protección Histórica");
      expect(_groups[1].name).to.be.equal("Ejecución Presupuestaria 2012");
      expect(_groups[2].name).to.be.equal("Pauta Publicitaria");
      expect(_groups[3].name).to.be.equal("Visitas a la web de GCBA 2011");

      expect(_groups[0].uri).to.be.equal(host + "api/grupos/areas-proteccion-historica");
      expect(_groups[1].uri).to.be.equal(host + "api/grupos/ejecucion-presupuestaria-2012");
      expect(_groups[2].uri).to.be.equal(host + "api/grupos/pauta-publicitaria");
      expect(_groups[3].uri).to.be.equal(host + "api/grupos/visitas-web-GCBA-2011");

      expect(_groups[0].description).to.be.equal("Información sobre las zonas de la Ciudad consultadas.");
      expect(_groups[1].description).to.be.equal("Información acorde a la Ley 70 la cual establece que el Poder Ejecutivo");
      expect(_groups[2].description).to.be.equal("Montos (IVA incluído) destinados a las contrataciones de publicidad");
      expect(_groups[3].description).to.be.equal("Información sobre el análisis del trafico de visitas de la web");

      expect(_groups[0].category).to.be.equal(host + "api/categorias/desarrollo-urbano");
      expect(_groups[1].category).to.be.equal(host + "api/categorias/finanzas-publicas");
      expect(_groups[2].category).to.be.equal(host + "api/categorias/finanzas-publicas");
      expect(_groups[3].category).to.be.equal(host + "api/categorias/informacion-digital");

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
      
      expect(group.category).to.be.an("object");
      expect(group.category.name).to.be.equal("Finanzas Públicas");
      expect(group.category.uri).to.be.equal(host + "api/categorias/finanzas-publicas");

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
  
  it("should retrieve a list of resources when api/recursos/ is called", function(done){
    request(host + 'api/recursos', function(res){
      expect(res.ok).to.be.ok();

      var resources = res.body;
      expect(resources).to.be.an('array');
      expect(resources.length).to.be.equal(4);

      var _resources = _.sortBy(resources, function(g){
        return g.uri;
      });

      expect(_resources[0].name).to.be.equal("Áreas de Protección Histórica 2012");
      expect(_resources[1].name).to.be.equal("Cantidad de Visitas 2011");
      expect(_resources[2].name).to.be.equal("Pauta Publicitaria 2012");
      expect(_resources[3].name).to.be.equal("Presupuesto Devengado Primer Trimestre de 2012");

      expect(_resources[0].uri).to.be.equal(host + "api/recursos/areas-proteccion-historica-2012");
      expect(_resources[1].uri).to.be.equal(host + "api/recursos/cantidad-visitas-2011");
      expect(_resources[2].uri).to.be.equal(host + "api/recursos/pauta-publicitaria-2012");
      expect(_resources[3].uri).to.be.equal(host + "api/recursos/presupuesto-devengado-primer-trimestre-2012");

      expect(_resources[0].description).to.be.equal("Información de las APH, dirección, estado de tramite, protección, imagen.");
      expect(_resources[1].description).to.be.equal("Cantidad de visitas por día para el año 2011");
      expect(_resources[2].description).to.be.equal("Montos (IVA incluído) destinados a pauta publicitaria 2012 según medio proveedor.");
      expect(_resources[3].description).to.be.equal("Información provisoria del detalle de la ejecución trimestral del presupuesto.");

      expect(_resources[0].group).to.be.equal(host + "api/grupos/areas-proteccion-historica");
      expect(_resources[1].group).to.be.equal(host + "api/grupos/visitas-web-GCBA-2011");
      expect(_resources[2].group).to.be.equal(host + "api/grupos/pauta-publicitaria");
      expect(_resources[3].group).to.be.equal(host + "api/grupos/ejecucion-presupuestaria-2012");

      done();
    });
  });


  it("should retrieve a resource when api/recursos/pauta-publicitaria-2012/ is called", function(done){
    request(host + 'api/recursos/pauta-publicitaria-2012', function(res){
      expect(res.ok).to.be.ok();
      var resource = res.body;
      expect(resource).to.be.an('object');
      
      expect(resource.name).to.be.equal('Pauta Publicitaria 2012');
      
      expect(resource.group).to.be.an('object');
      expect(resource.group.name).to.be.equal('Pauta Publicitaria');
      expect(resource.group.uri).to.be.equal(host + "api/grupos/pauta-publicitaria");

      expect(resource.group.category).to.be.an('object');
      expect(resource.group.category.name).to.be.equal('Finanzas Públicas');
      expect(resource.group.category.uri).to.be.equal(host + "api/categorias/finanzas-publicas");

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
      expect(resource.group.name).to.be.equal('Pauta Publicitaria');
      expect(resource.group.uri).to.be.equal(host + "api/grupos/pauta-publicitaria");
      expect(resource.count).to.be.equal(3);
      expect(resource.columns.length).to.be.equal(2);

      expect(resource.data).to.be.an('array');
      expect(resource.data.length).to.be.equal(1);

      var pauta = resource.data[0];
      expect(pauta.medio).to.be.equal("AM1010");
      expect(pauta.monto).to.be.equal(6338.60);
      
      done();
    });
  });

});

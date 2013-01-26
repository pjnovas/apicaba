
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
      var categoria = _.find(categories, function(c){
        return c.nombre === 'Finanzas Públicas';
      });

      expect(categoria).to.be.an('object');
      expect(categoria.nombre).to.be.equal("Finanzas Públicas");
      expect(categoria.uri).to.be.equal(host + "api/categorias/finanzas-publicas");
      
      done();
    });
  });

  it("should retrieve the details of the category when api/categorias/finanzas-publicas/ is called", function(done){
    request(host + 'api/categorias/finanzas-publicas', function(res){
      expect(res.ok).to.be.ok();
      var category = res.body;

      expect(category).to.be.an('object');
      
      expect(category.nombre).to.be.equal("Finanzas Públicas");
      
      expect(category.grupos).to.be.an('array');
      expect(category.grupos.length).to.be.equal(2);

      var grupos = _.sortBy(category.grupos, function(g){
        return g.nombre;
      });

      expect(grupos[0].nombre).to.be.equal("Ejecución Presupuestaria 2012");
      expect(grupos[1].nombre).to.be.equal("Pauta Publicitaria");

      expect(grupos[0].uri).to.be.equal(host + "api/grupos/ejecucion-presupuestaria-2012");
      expect(grupos[1].uri).to.be.equal(host + "api/grupos/pauta-publicitaria");

      expect(grupos[0].descripcion).to.be.equal("Información acorde a la Ley 70 la cual establece que el Poder Ejecutivo");
      expect(grupos[1].descripcion).to.be.equal("Montos (IVA incluído) destinados a las contrataciones de publicidad");

      done();
    });
  });

});

describe('#Grupos', function(){
  
  it("should retrieve a list of groups when api/grupos/ is called", function(done){
    request(host + 'api/grupos', function(res){
      expect(res.ok).to.be.ok();
      var grupos = res.body;
      expect(grupos).to.be.an('array');
      expect(grupos.length).to.be.equal(4);

      var _grupos = _.sortBy(grupos, function(g){
        return g.uri;
      });

      expect(_grupos[0].nombre).to.be.equal("Áreas de Protección Histórica");
      expect(_grupos[1].nombre).to.be.equal("Ejecución Presupuestaria 2012");
      expect(_grupos[2].nombre).to.be.equal("Pauta Publicitaria");
      expect(_grupos[3].nombre).to.be.equal("Visitas a la web de GCBA 2011");

      expect(_grupos[0].uri).to.be.equal(host + "api/grupos/areas-proteccion-historica");
      expect(_grupos[1].uri).to.be.equal(host + "api/grupos/ejecucion-presupuestaria-2012");
      expect(_grupos[2].uri).to.be.equal(host + "api/grupos/pauta-publicitaria");
      expect(_grupos[3].uri).to.be.equal(host + "api/grupos/visitas-web-GCBA-2011");

      expect(_grupos[0].descripcion).to.be.equal("Información sobre las zonas de la Ciudad consultadas.");
      expect(_grupos[1].descripcion).to.be.equal("Información acorde a la Ley 70 la cual establece que el Poder Ejecutivo");
      expect(_grupos[2].descripcion).to.be.equal("Montos (IVA incluído) destinados a las contrataciones de publicidad");
      expect(_grupos[3].descripcion).to.be.equal("Información sobre el análisis del trafico de visitas de la web");

      expect(_grupos[0].categoria).to.be.equal(host + "api/categorias/desarrollo-urbano");
      expect(_grupos[1].categoria).to.be.equal(host + "api/categorias/finanzas-publicas");
      expect(_grupos[2].categoria).to.be.equal(host + "api/categorias/finanzas-publicas");
      expect(_grupos[3].categoria).to.be.equal(host + "api/categorias/informacion-digital");

      done();
    });
  });

  it("should retrieve the details of the group when api/grupos/pauta-publicitaria/ is called", function(done){
    request(host + 'api/grupos/pauta-publicitaria', function(res){
      expect(res.ok).to.be.ok();
      
      var grupo = res.body;

      expect(grupo).to.be.an('object');
      expect(grupo.nombre).to.be.equal("Pauta Publicitaria");
      expect(grupo.descripcion).to.be.equal("Montos (IVA incluído) destinados a las contrataciones de publicidad");
      
      expect(grupo.categoria).to.be.an("object");
      expect(grupo.categoria.nombre).to.be.equal("Finanzas Públicas");
      expect(grupo.categoria.uri).to.be.equal(host + "api/categorias/finanzas-publicas");

      expect(grupo.recursos).to.be.an('array');
      expect(grupo.recursos.length).to.be.equal(1);
      expect(grupo.recursos[0].nombre).to.be.equal("Pauta Publicitaria 2012");
      expect(grupo.recursos[0].descripcion).to.be.equal("Montos (IVA incluído) destinados a pauta publicitaria 2012 según medio proveedor.");
      expect(grupo.recursos[0].uri).to.be.equal(host + "api/recursos/pauta-publicitaria-2012");

      done();
    });
  });
});

describe('#Resources', function(){
  
  it("should retrieve a list of resources when api/recursos/ is called", function(done){
    request(host + 'api/recursos', function(res){
      expect(res.ok).to.be.ok();

      var recursos = res.body;
      expect(recursos).to.be.an('array');
      expect(recursos.length).to.be.equal(4);

      var _recursos = _.sortBy(recursos, function(g){
        return g.uri;
      });

      expect(_recursos[0].nombre).to.be.equal("Áreas de Protección Histórica 2012");
      expect(_recursos[1].nombre).to.be.equal("Cantidad de Visitas 2011");
      expect(_recursos[2].nombre).to.be.equal("Pauta Publicitaria 2012");
      expect(_recursos[3].nombre).to.be.equal("Presupuesto Devengado Primer Trimestre de 2012");

      expect(_recursos[0].uri).to.be.equal(host + "api/recursos/areas-proteccion-historica-2012");
      expect(_recursos[1].uri).to.be.equal(host + "api/recursos/cantidad-visitas-2011");
      expect(_recursos[2].uri).to.be.equal(host + "api/recursos/pauta-publicitaria-2012");
      expect(_recursos[3].uri).to.be.equal(host + "api/recursos/presupuesto-devengado-primer-trimestre-2012");

      expect(_recursos[0].descripcion).to.be.equal("Información de las APH, dirección, estado de tramite, protección, imagen.");
      expect(_recursos[1].descripcion).to.be.equal("Cantidad de visitas por día para el año 2011");
      expect(_recursos[2].descripcion).to.be.equal("Montos (IVA incluído) destinados a pauta publicitaria 2012 según medio proveedor.");
      expect(_recursos[3].descripcion).to.be.equal("Información provisoria del detalle de la ejecución trimestral del presupuesto.");

      expect(_recursos[0].grupo).to.be.equal(host + "api/grupos/areas-proteccion-historica");
      expect(_recursos[1].grupo).to.be.equal(host + "api/grupos/visitas-web-GCBA-2011");
      expect(_recursos[2].grupo).to.be.equal(host + "api/grupos/pauta-publicitaria");
      expect(_recursos[3].grupo).to.be.equal(host + "api/grupos/ejecucion-presupuestaria-2012");

      done();
    });
  });


  it("should retrieve a resource when api/recursos/pauta-publicitaria-2012/ is called", function(done){
    request(host + 'api/recursos/pauta-publicitaria-2012', function(res){
      expect(res.ok).to.be.ok();
      var recurso = res.body;
      expect(recurso).to.be.an('object');
      
      expect(recurso.nombre).to.be.equal('Pauta Publicitaria 2012');
      
      expect(recurso.grupo).to.be.an('object');
      expect(recurso.grupo.nombre).to.be.equal('Pauta Publicitaria');
      expect(recurso.grupo.uri).to.be.equal(host + "api/grupos/pauta-publicitaria");

      expect(recurso.grupo.categoria).to.be.an('object');
      expect(recurso.grupo.categoria.nombre).to.be.equal('Finanzas Públicas');
      expect(recurso.grupo.categoria.uri).to.be.equal(host + "api/categorias/finanzas-publicas");

      expect(recurso.cantidad).to.be.equal(3);
      expect(recurso.propiedades.length).to.be.equal(2);

      expect(recurso.datos).to.be.an('array');
      expect(recurso.datos.length).to.be.equal(3);

      var pauta = recurso.datos[1];
      expect(pauta.medio).to.be.equal("A MEDIO CAMINO");
      expect(pauta.monto).to.be.equal(25338.60);

      done();
    });
  });

  it("should retrieve a resource with data found when is called with a query", function(done){
    request(host + 'api/recursos/pauta-publicitaria-2012?medio=AM1010', function(res){

      expect(res.ok).to.be.ok();
      var recurso = res.body;
      expect(recurso).to.be.an('object');
      
      expect(recurso.nombre).to.be.equal('Pauta Publicitaria 2012');
      expect(recurso.grupo).to.be.an('object');
      expect(recurso.grupo.nombre).to.be.equal('Pauta Publicitaria');
      expect(recurso.grupo.uri).to.be.equal(host + "api/grupos/pauta-publicitaria");
      expect(recurso.cantidad).to.be.equal(3);
      expect(recurso.propiedades.length).to.be.equal(2);

      expect(recurso.datos).to.be.an('array');
      expect(recurso.datos.length).to.be.equal(1);

      var pauta = recurso.datos[0];
      expect(pauta.medio).to.be.equal("AM1010");
      expect(pauta.monto).to.be.equal(6338.60);
      
      done();
    });
  });

});

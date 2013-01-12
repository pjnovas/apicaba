var mongoJS = require('mongojs')
  secrets = require('../secrets.json');

app = {
  db: mongoJS.connect(
        secrets.mongodb.connectionString, 
        ['jobs', 'categories', 'groups', 'resources']),

  server: "http://localhost:3000/",
  secrets: secrets
};

describe('API Server', function(){
  var db = app.db;
  
  before(function(done){
    createData();
    setTimeout(done, 200);
  });

  after(function(){
    db.categories.remove();
    db.groups.remove();
    db.resources.remove();
    db.jobs.remove();
    db.collection('pauta_publicitaria_2012').remove();
  });

  require('./api.js');

});

function createData(){
  var db = app.db;

  require('./createCategories.js')();

  db.groups.insert({ 
    name: "Áreas de Protección Histórica",
    canonical: "areas-proteccion-historica",
    description: "Información sobre las zonas de la Ciudad consultadas.",
    category: "desarrollo-urbano"
  });

  db.resources.insert({
    name: "Áreas de Protección Histórica ",
    canonical: "areas-proteccion-historica",
    description: "Información de las APH, dirección, estado de tramite, protección, imagen.",
    group: "areas-proteccion-historica"
  });

  /**************************************************************/

  db.groups.insert({ 
    name: "Visitas a la web de GCBA 2011",
    canonical: "visitas-web-GCBA-2011",
    description: "Información sobre el análisis del trafico de visitas de la web",
    category: "informacion-digital"
  });

  db.resources.insert({
    name: "Cantidad de Visitas 2011",
    canonical: "cantidad-visitas-2011",
    description: "Cantidad de visitas por día para el año 2011",
    group: "visitas-web-GCBA-2011"
  });

  /**************************************************************/

  db.groups.insert({ 
    name: "Ejecución Presupuestaria 2012",
    canonical: "ejecucion-presupuestaria-2012",
    description: "Información acorde a la Ley 70 la cual establece que el Poder Ejecutivo",
    category: "finanzas-publicas"
  });

  db.resources.insert({
    name: "Presupuesto Devengado Primer Trimestre de 2012",
    canonical: "presupuesto-devengado-primer-trimestre-2012",
    description: "Información provisoria del detalle de la ejecución trimestral del presupuesto.",
    group: "ejecucion-presupuestaria-2012"
  });  

  /**************************************************************/

  db.groups.insert({ 
    name: "Pauta Publicitaria",
    canonical: "pauta-publicitaria",
    description: "Montos (IVA incluído) destinados a las contrataciones de publicidad",
    category: "finanzas-publicas"
  });

  db.resources.insert({
    name: "Pauta Publicitaria 2012",
    canonical: "pauta-publicitaria-2012",
    description: "Montos (IVA incluído) destinados a pauta publicitaria 2012 según medio proveedor.",
    group: "pauta-publicitaria",
    collection: "pauta_publicitaria_2012",
    count: 3,
    columns: [{
      "name": "medio",
      "type": "string"
    },{
      "name": "monto",
      "type": "string"
    }]
  });  

  db.collection('pauta_publicitaria_2012').insert([{
    medio: "AM1010",
    monto: 6338.60
  },{
    medio: "A MEDIO CAMINO",
    monto: 25338.60
  },{
    medio: "ABC Almagro - Boedo - Caballito",
    monto: 33784.80
  }]);
}
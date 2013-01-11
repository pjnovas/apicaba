var mongoJS = require('mongojs')
  secrets = require('../secrets.json');

app = {
  db: mongoJS.connect(
        secrets.mongodb.connectionString, 
        ['jobs', 'groups', 'resources']),

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
    db.groups.remove();
    db.resources.remove();
    db.jobs.remove();
    db.collection('pauta_publicitaria_2012').remove();
  });

  require('./api.js');

});

function createData(){
  var db = app.db;

  db.groups.insert({ 
    name: "Desarrollo Urbano",
    canonical: "desarrollo-urbano"
  });
  db.groups.insert({ 
    name: "Finanzas Públicas",
    canonical: "finanzas-publicas"
  });
  db.groups.insert({ 
    name: "Información Digital",
    canonical: "informacion-digital"
  });

  db.resources.insert({
    name: "Sueldos Funcionarios",
    canonical: "sueldos-funcionarios",
    group: "finanzas-publicas"
  });

  db.resources.insert({
    name: "Obras Registradas",
    canonical: "obras-registradas",
    group: "desarrollo-urbano"
  });

  db.resources.insert({
    name: "Visitas a la web de GCBA 2011",
    canonical: "visitas-web-GCBA-2011",
    group: "informacion-digital"
  });

  db.resources.insert({
    name: "Pauta Publicitaria 2012",
    canonical: "pauta-publicitaria-2012",
    group: "finanzas-publicas",
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
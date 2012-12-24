var mongoJS = require('mongojs')
  secrets = require('../../secrets.json');

app = {
  db: mongoJS.connect(
        secrets.mongodb.connectionString, 
        ['jobs', 'groups', 'resources']),

  server: "http://localhost:3000/"
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
    name: "Pauta Publicitaria 2012",
    canonical: "pauta-publicitaria-2012",
    group: "Finanzas Públicas",
    data: [{
      medio: "AM 1010 ( 8 am en el aire)",
      monto: 25338.60
    },{
      medio: "A MEDIO CAMINO",
      monto: 25338.60
    },{
      medio: "ABC Almagro - Boedo - Caballito",
      monto: 33784.80
    }]
  });

  db.resources.insert({
    name: "Sueldos Funcionarios",
    canonical: "sueldos-funcionarios",
    group: "Finanzas Públicas",
    data: [{
      ano: 2012,
      mes: "Septiembre",
      funcionario: "MACRI,MAURICIO"
    },{
      ano: 2012,
      mes: "Septiembre",
      funcionario: "VIDAL,MARIA EUGENIA"
    },{
      ano: 2012,
      mes: "Septiembre",
      funcionario: "RODRIGUEZ LARRETA,HORACIO ANTONIO"
    }]
  });

  db.resources.insert({
    name: "Obras Registradas",
    canonical: "obras-registradas",
    group: "Desarrollo Urbano",
    data: [{
      expediente: "1.086.149/2009",
      direccion: "HUMBOLDT 1513",
      estado: "REGISTRADO",
      tipo: "OBRA NUEVA"
    },{
      expediente: "1.097.330/2009",
      direccion: "DRAGONES 1880",
      estado: "REGISTRADO",
      tipo: "DEMOLICION TOTAL Y OBRA"
    },{
      expediente: "1.097.157/2009",
      direccion: "CONSTITUCION 2215",
      estado: "REGISTRADO",
      tipo: "DEMOLICION PARCIAL Y AMPLIACION DE OBRA"
    }]
  });

  db.resources.insert({
    name: "Visitas a la web de GCBA 2011",
    canonical: "visitas-web-GCBA-2011",
    group: "Información Digital",
    data: [{
      pagina: "/areas/sitemap/",
      paginasVistas: 7234746,
      porcentajeRebote: 50.39,
      porcentajeSalidas: 45.7
    },{
      expediente: "/areas/educacion/",
      paginasVistas: 34746,
      porcentajeRebote: 10.47,
      porcentajeSalidas: 35.98
    },{
      expediente: "/areas/cultura/",
      paginasVistas: 72746,
      porcentajeRebote: 30.24,
      porcentajeSalidas: 78.45
    }]
  });
}
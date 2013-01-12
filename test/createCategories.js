
var categories = [{
  name: "Cultura",
  canonical: "cultura"
},{
  name: "Economía",
  canonical: "economia"
},{
  name: "Educación",
  canonical: "educacion"
},{
  name: "Finanzas Públicas",
  canonical: "finanzas-publicas"
},{
  name: "Información Digital",
  canonical: "informacion-digital"
},{
  name: "Legal",
  canonical: "legal"
},{
  name: "Medio Ambiente",
  canonical: "medio-ambiente"
},{
  name: "Salud",
  canonical: "salud"
},{
  name: "Seguridad",
  canonical: "seguridad"
},{
  name: "Transporte y Movilidad",
  canonical: "transporte-y-movilidad"
},{
  name: "Desarrollo Urbano",
  canonical: "desarrollo-urbano"
}];

module.exports = function(){
  var db = app.db;

  for(var i=0; i<categories.length; i++){
    var category = categories[i];
    
    db.categories.update(
      { canonical: category.canonical }, 
      { $set: category }, 
      { upsert: true }
    );
  }
};
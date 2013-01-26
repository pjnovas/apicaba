var _ = require('underscore');

var translate = module.exports = function(objOrArr){

  function convert(o){
    for(var p in o){
      if (mapper[p] && o.hasOwnProperty(p)){
        if (_.isString(o[p]) || _.isDate(o[p]) || _.isNumber(o[p])){
          o[mapper[p]] = o[p];
          delete o[p];
        }
        else {
          o[p] = translate(o[p]);
          o[mapper[p]] = o[p];
          delete o[p]; 
        }
      }
    }

    return o;
  }

  if (_.isArray(objOrArr))
    return _.map(objOrArr, convert);
  else if (_.isObject(objOrArr))
    return convert(objOrArr);
  else 
    return objOrArr;
}

var mapper = {
  "category": "categoria",
  "categories": "categorias",

  "group": "grupo",
  "groups": "grupos",

  "resource": "recurso",
  "resources": "recursos",

  "name": "nombre",
  "description": "descripcion",
  "columns": "propiedades",
  "count": "cantidad"
};

var resources = require('../collections/resources')
  , _ = require('underscore')
  , host = app.host;

exports.getByGroup = function(group, done){

  function buildResources(err, resourceList){
    if (err) return done(err);
    done(null, _.map(resourceList, build));
  }

  resources.getByGroupName(group, buildResources);
};

function build(resource){
  return map(resource);
}

function map(entity){
  entity.uri = host + '/api/recursos/' + entity.canonical;
  entity.category = host + '/api/categorias/' + entity.category;

  delete entity._id;
  delete entity.canonical;
  return entity;
}


var resources = require('../collections/resources')
  , group = require('../models/group')
  , _ = require('underscore')
  , host = app.host;

exports.getAll = function(done){

  function buildResources(err, resourceList){
    if (err) return done(err);
    var result = _.map(resourceList, function(resource){
      return build(resource);
    });
    done(null, result);
  }

  resources.getAll(buildResources);
};

exports.get = function(canonical, query, done){

  function getData(res, group){
    resources.getByQuery(res.collection, query, function(err, data){
      res = build(res, group);
      res.data = data;
      done(null, res);
    });
  }

  function manageResource(err, resource){
    if (err) return done(err);
    
    group.get(resource.group, function(err, group){
      if (err) return done(err);

      delete group.resources;
      getData(resource, group);
    });
  }

  resources.getByCanonical(canonical, manageResource);
};

exports.getByGroup = function(group, done){

  function buildResources(err, resourceList){
    if (err) return done(err);
    var result = _.map(resourceList, function(resource){
      return build(resource);
    });
    done(null, result);
  }

  resources.getByGroupName(group, buildResources);
};

function build(resource, group){
  if (group && _.isObject(group))
    resource.group = group;

  return map(resource);
}

function map(entity){
  entity.uri = host + '/api/recursos/' + entity.canonical;

  if(_.isString(entity.group))
    entity.group = host + '/api/grupos/' + entity.group;

  delete entity._id;
  delete entity.canonical;
  delete entity.collection;
  return entity;
}

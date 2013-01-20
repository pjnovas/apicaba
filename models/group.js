
var groups = require('../collections/groups')
  , category = require('./category')
  , resource = require('./resource')
  , _ = require('underscore')
  , host = app.host;

exports.getAll = function(done){

  function buildGroups(err, groupList){
    if (err) return done(err);
    var result = _.map(groupList, function(group){
      return build(group);
    });
    done(null, result);
  }

  groups.getAll(buildGroups);
};

exports.getByCategory = function(category, done){

  function buildGroups(err, groupList){
    if (err) return done(err);
    var result = _.map(groupList, function(group){
      return build(group);
    });
    done(null, result);
  }

  groups.getByCategory(category, buildGroups);
};

exports.get = function(canonical, done, partial){

  function manageGroup(err, group){
    if (err) return done(err);
    
    if(partial)
      done(null, build(group));
    else {
      category.get(group.category, function(err, category){
        resource.getByGroup(canonical, function(err, groupList){
          if (err) return done(err);

          done(null, build(group, groupList, category));
        });
      }, true);
    }
  }

  groups.getByCanonical(canonical, manageGroup);
};

function build(group, resources, category){
  if (resources && _.isArray(resources))
    group.resources = resources;

  if (category && _.isObject(category))
    group.category = category;

  return map(group);
}

function map(entity){
  entity.uri = host + '/api/grupos/' + entity.canonical;

  if(_.isString(entity.category))
    entity.category = host + '/api/categorias/' + entity.category;

  delete entity._id;
  delete entity.canonical;
  return entity;
}

var categories = require('../collections/categories')
  , group = require('./group')
  , _ = require('underscore')
  , host = app.host;

exports.getAll = function(done){

  function buildCategories(err, categoryList){
    if (err) return done(err);
    done(null, _.map(categoryList, function(category){
      return build(category);
    }));
  }

  categories.getAll(buildCategories);
};

exports.get = function(canonical, done, partial){

  function manageCategory(err, category){
    if (err) return done(err);

    if(partial) {
      done(null, build(category));
    }
    else 
      group.getByCategory(canonical, function(err, groupList){
        if (err) return done(err);
        done(null, build(category, groupList));
      }, true);
  }

  categories.getByCanonical(canonical, manageCategory);
};

function build(category, groups){
  if (groups && _.isArray(groups))
    category.groups = groups;

  return map(category);
}

function map(entity){
  entity.uri = host + '/api/categorias/' + entity.canonical;
  
  delete entity._id;
  delete entity.canonical;
  return entity;
}
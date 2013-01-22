
var Entity = require('./entity')
  , resources = require('../collections/resources')
  , util = require('util')
  , _ = require('underscore');

var Resource = module.exports = function() {
  Entity.call(this);

  this.collection = resources;
  this.parent = 'group';
};

util.inherits(Resource, Entity);

Resource.prototype.getByQuery = function(canonical, query, done){

  function getData(res, group){
    resources.getByQuery(res.collection, query, function(err, data){
      delete res.group.resources;
      res.data = data;
      done(null, res);
    });
  }

  this.get(canonical, function(err, resource){
    if (err) return done(err);
    getData(resource);
  });  
};

Resource.prototype.map = function(entity){
  entity.uri = this.host + '/api/recursos/' + entity.canonical;

  if(_.isString(entity.group))
    entity.group = this.host + '/api/grupos/' + entity.group;

  delete entity._id;
  delete entity.canonical;
  return entity;
};


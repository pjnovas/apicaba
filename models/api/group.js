
var Entity = require('./entity')
  , util = require('util')
  , _ = require('underscore');

var Group = module.exports = function() {
  Entity.call(this);

  this.collection = require('../../collections/groups');
  this.parent = 'category';
  this.child = 'resource';
};

util.inherits(Group, Entity);

Group.prototype.map = function(entity){
  entity.uri = this.host + '/api/grupos/' + entity.canonical;

  if(_.isString(entity.category))
    entity.category = this.host + '/api/categorias/' + entity.category;
  
  delete entity._id;
  delete entity.canonical;
  return entity;
};



var Entity = require('./entity')
  , util = require('util')
  , _ = require('underscore');

var Category = module.exports = function() {
  Entity.call(this);

  this.collection = require('../collections/categories');

  this.child = 'group';
  this.childName = 'groups';

  this.host = app.host;  
};

util.inherits(Category, Entity);

Category.prototype.map = function(entity){
  entity.uri = this.host + '/api/categorias/' + entity.canonical;
  
  delete entity._id;
  delete entity.canonical;
  return entity;
}



var _ = require('underscore')
  , host = app.host;

var Entity = module.exports = function(options){

  this.collection = null;

  this.parent = null;
  this.child = null;
  this.childName = '';
  this.parentName = '';
};

Entity.prototype.getAll = function(done){
  var self = this;

  this.collection.getAll(function(err, list){
    self.buildList(err, list, done);
  });
};

Entity.prototype.getByParent = function(canonical, done){
  var self = this;

  this.collection.getByParent(canonical, function(err, list){
    self.buildList(err, list, done);
  });
};

Entity.prototype.get = function(canonical, done, partial){
  var self = this;

  function manage(err, entity){
    if (err) return done(err);

    if(partial) {
      done(null, self.build(entity));
    }
    else {
      if(self.child && self.parent){

        var Child = require('./' + self.child);
        var child = new Child();
        child.getByParent(canonical, function(err, children){

          var Parent = require('./' + self.parent);
          var parent = new Parent();
          parent.get(entity[self.parentName], function(err, parent){

            done(null, self.build(entity, children, parent));
          }, true);
        });
      }
      else if(self.child){

        var Child = require('./' + self.child);
        var child = new Child();
        child.getByParent(canonical, function(err, list){

          done(null, self.build(entity, list));
        });
      }
      else if(self.parent){

        var Parent = require('./' + self.parent);
        var parent = new Parent();
        parent.get(entity[self.parentName], function(err, parent){

          done(null, self.build(entity, null, parent));
        });
      }
    }
  }

  this.collection.getByCanonical(canonical, manage);
};

Entity.prototype.buildList = function(err, list, done){
  var self = this;
  if (err) return done(err);
  
  done(null, _.map(list, function(entity){
    return self.build(entity);
  }));
};

Entity.prototype.build = function(entity, childs, parent){
  if (childs && _.isArray(childs))
    entity[this.childName] = childs;

  if (parent && _.isObject(parent))
    entity[this.parentName] = parent;

  return this.map(entity);
};

Entity.prototype.map = function(entity){  
  delete entity._id;
  delete entity.canonical;
  return entity;
}

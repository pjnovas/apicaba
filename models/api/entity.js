
var _ = require('underscore');

var Entity = module.exports = function(options){

  this.collection = null;
  this.parent = null;
  this.child = null;

  this.host = app.host;
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

  function resolve(err, entity){
    if (err) return done(err);

    if(partial) 
      done(null, self.build(entity));
    else 
      resolveFamily.call(self, canonical, entity, done);
  }

  this.collection.getByCanonical(canonical, resolve);
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
    entity[this.child + 's'] = childs;

  if (parent && _.isObject(parent))
    entity[this.parent] = parent;

  return this.map(entity);
};

Entity.prototype.map = function(entity){  
  delete entity._id;
  delete entity.canonical;
  return entity;
};

function resolveFamily(canonical, entity, done){
  var self = this;

  function getChilds(ready){
    var child = new (require('./' + self.child))();
    child.getByParent(canonical, ready);
  }

  function getParent(ready, partial){
    var parent = new (require('./' + self.parent))();
    parent.get(entity[self.parent], ready, partial);
  }

  if(self.child && self.parent){

    getChilds(function(err, children){
      getParent(function(err, parent){
        done(null, self.build(entity, children, parent));
      }, true);
    });
  }
  else if(self.child){

    getChilds(function(err, children){
      done(null, self.build(entity, children));
    });
  }
  else if(self.parent){

    getParent(function(err, parent){
      done(null, self.build(entity, null, parent));
    });
  }
  else 
    done(null, self.build(entity));
}
var apicaba = apicaba || {};
apicaba.models = apicaba.models || {};

var Model = apicaba.models.Model = function(api){
     
  this.collection = [];
  this.api = api;

  this.loaded = false;

};

Model.prototype = new EventEmitter();

Model.prototype.search = function(keywords){
  var cache = [];

  if(keywords === ''){
    cache = this.collection;
  }
  else {
    for(var i=0; i < this.collection.length; i++){
      for(var prop in this.collection[i]){
        if( (new RegExp(keywords, 'ig').test(this.collection[i][prop]) )){
          cache.push(this.collection[i]);
          break;
        }
      }
    }
  }

  this.emit('search', cache);
  return this;
};

Model.prototype.bind = function(){
  var self = this;

  if (this.loaded){
    this.emit('bind', this.collection);
  }
  else {
    this.api.getAll(function(err, coll){
      self.collection = coll;
      
      self.loaded = true;

      self.emit('change', self.collection);
    });
  }

  return this;
};

Model.prototype.save = function(entity, options){
  if (entity._id) update.call(this, entity, options);
  else add.call(this, entity, options);

  return this;
};

/*
 * Used to select an entity
 * By default value is going to be an _id
 * If a key is specified, will search by it selecting the first found
 */
Model.prototype.select = function(value, key){
  var key = key || '_id';

  for(var i = 0; i < this.collection.length; i++){
    if (this.collection[i][key] === value){
      this.emit('select', this.collection[i]);
      break;
    }
  }

  return this;
};

Model.prototype.remove = function(id) {
  var self = this;

  this.api.delete(id, function(err){
    for(var i = 0; i < self.collection.length; i++){
      if (self.collection[i]._id === id){
        self.collection.splice(i, 1);
        break;
      }
    }

    self.emit('change', self.collection);
  });

  return this;
};

function add(entity, options) {
  var self = this;

  this.api.new(entity, options, function(err, newEntity){
    if(err) return;

    self.collection.unshift(newEntity);

    self.emit('add', newEntity);
    self.emit('change', self.collection);
  });
}

function update(entity, options) {
  var self = this;

  this.api.update(entity, options, function(err){
    if(err) return;

    for(var i = 0; i < self.collection.length; i++){
      if (self.collection[i]._id === entity._id){
        self.collection[i] = _.clone(entity);
        break;
      }
    }

    self.emit('update', entity);
    self.emit('change', self.collection);
  });
}
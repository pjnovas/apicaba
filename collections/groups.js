var ObjectId = require('mongojs').ObjectId
  , db = app.db;

exports.getAll = function(done){
  db.groups
    .find({}
    , function(err, data){
      done(err, data || []);
    });
};

exports.getByCanonical = function(canonical, done){
  db.groups
    .findOne({ canonical: canonical }, { "_id": false }
    , done);
};

exports.getByParent = exports.getByCategory = function(category, done){
  db.groups
    .find({ category: category }, { "_id": false }
    , done);
};

exports.getById = function(id, done){
  db.groups
    .findOne({ "_id": ObjectId(id) }
    , done);
};

exports.create = function(group, done){
  db.groups.insert(group, function(err, data){
    done(err, data[0]);
  });
};

exports.update = function(id, group, done){
  db.groups.update(
      { "_id": ObjectId(id) },
      { $set: {
        name: group.name, 
        canonical: group.canonical, 
        description: group.description, 
        category: group.category 
      } }, 
      done);
};

exports.remove = function(id, done){
  db.groups.remove({ "_id": ObjectId(id)}, done);
};

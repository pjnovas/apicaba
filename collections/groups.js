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
    .findOne({ canonical: canonical }
    , done);
};

exports.getById = function(id, done){
  db.groups
    .findOne({ "_id": ObjectId(id) }
    , done);
};

exports.create = function(group, done){

  db.groups.insert(group, function(err, data){
    done(err, data);
  });
};

exports.update = function(id, group, done){
  db.groups.update(
      { "_id": ObjectId(id) },
      { $set: {name: group.name, canonical: group.canonical } }, 
      function(err, data){
    done(err, data);
  });
};

exports.remove = function(id, done){
  db.groups.remove({ "_id": ObjectId(id)},
    function(err, data){
      done(err, data);
  });
};

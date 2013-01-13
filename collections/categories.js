var ObjectId = require('mongojs').ObjectId
  , db = app.db;

exports.getAll = function(done){
  db.categories
    .find({}
    , function(err, data){
      done(err, data || []);
    });
};

exports.getByCanonical = function(canonical, done){
  db.categories
    .findOne({ canonical: canonical }, { "_id": false }
    , done);
};

exports.getById = function(id, done){
  db.categories
    .findOne({ "_id": ObjectId(id) }
    , done);
};


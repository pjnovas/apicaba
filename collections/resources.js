var ObjectId = require('mongojs').ObjectId
  , db = app.db;

exports.getAll = function(done){
  db.resources
    .find({}
    , function(err, data){
      done(err, data || []);
    });
};

exports.getByName = function(name, done){
  db.resources.findOne({ name: name }, done);
};

exports.getByCanonical = function(canonical, done){
  db.resources.findOne({ canonical: canonical }, { _id: false }, done);
};

exports.getByGroupName = function(name, done){

  db.resources.find({ group: name }, 
    { "_id": false, name: true, canonical: true, description: true },
    function(err, data){
      done(err, data || []);
    });
};

exports.create = function(resource, done){
  db.resources.update({name: resource.name}, {$set: resource}, { upsert: true } , done);
};

exports.pushTempData = function(name, data) {
  db.collection(name).insert(data);
};

exports.renameResource = function(sourceName, targetName){
  db.collection(targetName).drop(function(err){
    db.collection(sourceName).rename(targetName);
  });
};

exports.getByQuery = function(name, query, done) {
  db.collection(name).find(query,
    { _id: false },
    function(err, data){
      done(err, data || []);
    }).limit(200);
};

exports.remove = function(resId, done){
  var resId = ObjectId(resId);

  db.resources.findOne({ "_id": resId }, function(err, res){
    if (err) done(err);
    else if(res) {
      db.collection(res.collection).drop();
      db.resources.remove({ "_id": resId }, done);
    }
  });
};

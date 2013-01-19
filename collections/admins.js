var ObjectId = require('mongojs').ObjectId
  , db = app.db;

exports.getByUserName = function(username, done){
  db.admins.findOne({ username: username }, done);
};

exports.getById = function(id, done){
  db.admins.findOne({ "_id": ObjectId(id) }, done);
};


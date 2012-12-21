
var db = app.db;

exports.getByName = function(name, done){
  db.resources.findOne({ name: name }, done);
};

exports.create = function(resource, done){
  db.resources.insert(resource, done);
};

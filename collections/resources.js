
var db = app.db;

exports.getByName = function(name, done){
  db.resources.findOne({ name: name }, done);
};

exports.getByCanonical = function(canonical, done){
  db.resources.findOne({ canonical: canonical }, done);
};

exports.getByGroupName = function(name, done){
  db.resources.find({ group: name }, 
    function(err, data){
      done(err, data || []);
    });
};

exports.create = function(resource, done){
  db.resources.insert(resource, done);
};

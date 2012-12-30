
var db = app.db;

exports.getByName = function(name, done){
  db.resources.findOne({ name: name }, done);
};

exports.getByCanonical = function(canonical, done){
  db.resources.findOne({ canonical: canonical }, { _id: false }, done);
};

exports.getByGroupName = function(name, done){
  console.log(name);
  db.resources.find({ group: name }, 
    { _id: false, data: false },
    function(err, data){
      done(err, data || []);
    });
};

exports.create = function(resource, done){
  db.resources.update({name: resource.name}, {$set: resource}, { upsert: true} , done);
};

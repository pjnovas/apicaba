
var db = app.db;

exports.getAll = function(done){
  
  db.jobs
    .find({}
    , function(err, data){
      done(err, data || []);
    });

};

exports.getByName = function(name, done){
  
  db.jobs
    .findOne({ name: name }
    , done);

};

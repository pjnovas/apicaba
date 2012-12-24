
var db = app.db;

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

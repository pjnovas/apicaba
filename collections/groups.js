
var db = app.db;

exports.getAll = function(done){
  
  db.groups
    .find({}
    , function(err, data){
      done(err, data || []);
    });

};

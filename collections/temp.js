
var db = app.db;

exports.getData = function(name, done){
  db.temp.findOne({ name: name }, done);
};

exports.pushData = function(name, data){
  db.temp.update({name: name}, {$pushAll: { data: data } }, { upsert: true });    
};

exports.clean = function(name){
  db.temp.remove({name: name});
};

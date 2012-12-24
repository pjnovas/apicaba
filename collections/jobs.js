var ObjectId = require('mongojs').ObjectId
  , db = app.db;

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

exports.getById = function(id, done){

  db.jobs
    .findOne({ "_id": ObjectId(id) }
    , done);
};

exports.create = function(job, done){

  db.jobs.insert(job, function(err, data){
    done(err, data);
  });
};

exports.update = function(id, job, done){

  db.jobs.update(
      { "_id": ObjectId(id) },
      { $set: {name: job.name, group: job.group, cron: job.cron, source: job.source } }, 
      function(err, data){
    done(err, data);
  });
};

exports.remove = function(id, done){
  
  db.jobs.remove({ "_id": ObjectId(id)},
    function(err, data){
      done(err, data);
  });
};

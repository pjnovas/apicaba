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
  
  db.jobs.findOne({ name: name }, done);
};

exports.getById = function(id, done){

  db.jobs.findOne({ "_id": ObjectId(id) }, done);
};

exports.updateGroup = function(groupOld, groupNew, done){

  db.jobs.update(
      { group: groupOld },
      { $set: {group: groupNew } }, 
      { multi: true },
      done);
};

exports.create = function(job, done){
  job.state = 'pending';
  job.createdAt = new Date();

  db.jobs.insert(job, function(err, data){
    done(err, data[0]);
  });
};

exports.update = function(id, job, done){

  db.jobs.update(
      { "_id": ObjectId(id) },
      { $set: {
        name: job.name, 
        canonical: job.canonical,
        description: job.description, 
        group: job.group, 
        cron: job.cron, 
        source: job.source 
      } }, 
      done);
};

exports.changeState = function(id, state){
  var upd = { state: state };

  if (state === 'running')
    upd.lastRun = new Date();
  
  db.jobs.update({ "_id": ObjectId(id) }, { $set: upd });
};

exports.remove = function(id, done){
  db.jobs.remove({ "_id": ObjectId(id)}, done);
};

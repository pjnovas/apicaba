
var jobs = require('../../collections/jobs')
  , resources = require('../../collections/resources')
  , scheduler = require('../../models/scheduler');

app.get('/jobs', app.isAuth, getList);
app.post('/jobs', app.isAuth, create);
app.put('/jobs/:jobId', app.isAuth, update);
app.del('/jobs/:jobId', app.isAuth, remove);

function getList(req, res){
  jobs.getAll(function(err, jobList){
    if (err) return res.send(500);
    res.send(jobList);
  });
}

function create(req, res){
  var newJob = req.body.job,
    runNow = req.body.runNow;

  jobs.create(newJob, function(err, job){
    if (err) return res.send(500);

    res.send(201, job); //OK Resource created
    scheduler.addJob(newJob, runNow);
  });
}

function update(req, res){
  var jobId = req.params.jobId,
    runNow = req.body.runNow,
    updateJob = req.body.job;

  jobs.update(jobId, req.body.job, function(err){
    if (err) return res.send(500);

    res.send(204); //Ok with No Content
    scheduler.updateJob(updateJob, runNow);
  });
}

function remove(req, res){
  var jobId = req.params.jobId;

  jobs.remove(jobId, function(err){
    if (err) return res.send(500);
    res.send(204); //OK with No Content

    scheduler.removeJob(jobId);
    resources.remove(jobId);
  });
}

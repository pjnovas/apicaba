
var jobs = require('../../collections/jobs')
  , scheduler = require('../../models/scheduler');

app.get('/jobs', getList);
app.post('/jobs', create);
app.put('/jobs/:jobId', update);
app.del('/jobs/:jobId', remove);

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

    scheduler.addJob(newJob, runNow);

    res.send(201, job); //OK Resource created
  });
}

function update(req, res){
  var jobId = req.params.jobId;

  jobs.update(jobId, req.body.job, function(err){
    if (err) return res.send(500);
    res.send(204); //Ok with No Content
  });
}

function remove(req, res){
  var jobId = req.params.jobId;

  jobs.remove(jobId, function(err){
    if (err) return res.send(500);
    res.send(204); //OK with No Content
  });
}

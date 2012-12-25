
var jobs = require('../../collections/jobs');

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
  jobs.create(req.body.job, function(err, job){
    if (err) return res.send(500);
    res.send(201, job); //OK Resource created
  });
}

function update(req, res){
  var jobId = req.params.job;

  jobs.update(jobId, req.body.job, function(err){
    if (err) return res.send(500);
    res.send(204); //Ok with No Content
  });
}

function remove(req, res){
  var jobId = req.params.job;

  jobs.remove(jobId, function(err){
    if (err) return res.send(500);
    res.send(204); //OK with No Content
  });
}
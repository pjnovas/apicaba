
var scheduler = require('./models/scheduler')
  , secrets = require('../secrets.json')
  , mongoJS = require('mongojs');

app = {
  db: mongoJS.connect(
          secrets.mongodb.connectionString, 
          ['jobs', 'resources'])
};

scheduler
  .on('run', function(job){
    console.log('JOB-RUN %s', job.resource);
  })
  .on('done', function(job){
    console.log('JOB-DONE: %s', job.resource);
  })
  .initialize(function(err){
    if (err) throw err;
    else console.log('Scheduler Initialized');
  });



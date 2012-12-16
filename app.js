
var server = require('./webserver')
  , scheduler = require('./models/scheduler');

scheduler
  .initialize(__dirname + '/config/api', function(){
    console.log('all jobs created');
    server.start();
  })
  .on('run', function(job){
    console.log('runing job %s', job.resource);
  })
  .on('done', function(job){
    console.log('done job %s', job.resource);
  });



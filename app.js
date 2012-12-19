
var server = require('./webserver')
  , scheduler = require('./models/scheduler')
  , appConfig = require('./config/app.json');

scheduler
  .initialize(__dirname + '/config/api', appConfig, function(){
    console.log('all jobs created');
    server.start();
  })
  .on('run', function(job){
    console.log('runing job %s', job.resource);
  })
  .on('done', function(job){
    console.log('done job %s', job.resource);
  });



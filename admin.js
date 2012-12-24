
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , secrets = require('./secrets.json')
  , mongoJS = require('mongojs');

app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3050);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));

  app.db = mongoJS.connect(
          secrets.mongodb.connectionString, 
          ['jobs', 'groups', 'resources']);

  startScheduler();
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

require('./routes/admin');

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

function startScheduler(){
  var scheduler = require('./models/scheduler');

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
}

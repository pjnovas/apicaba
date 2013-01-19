
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , socketIO = require('socket.io')
  , passport = require('passport')
  , mongoJS = require('mongojs');

app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3050);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('test', function(){
  app.use(express.errorHandler());
  app.secrets = require('./secrets_test.json');
  init();
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.secrets = require('./secrets.json');
  init();
});

app.configure('production', function(){
  app.use(express.errorHandler());
  app.secrets = require('./secrets_prod.json');
  init();
});

function init(){
  app.use(express.session({ secret: app.secrets.session })); 
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);

  app.db = mongoJS.connect(
          app.secrets.mongodb.connectionString, 
          ['jobs', 'categories', 'groups', 'resources', 'admins']);

  startScheduler();
}

require('./routes/admin');

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = socketIO.listen(server, {
  "log level": 1
});

io.sockets.on('connection', function (socket) {

});

function startScheduler(){
  var scheduler = require('./models/scheduler');

  scheduler
    .on('run', function(job){
      console.log('JOB-RUN %s', job.resource);
      emitJobStatus(job, 'running');
    })
    .on('done', function(job){
      console.log('JOB-DONE: %s', job.resource);
      emitJobStatus(job, 'done');
    })
    .on('error', function(job){
      console.log('JOB-ERROR: %s', job.resource);
      emitJobStatus(job, 'error');
    })
    .initialize(function(err){
      if (err) throw err;
      else console.log('Scheduler Initialized');
    });

  function emitJobStatus(job, state){
    io.sockets.emit('job_status', { _id: job._id, state: state } );
  }
}

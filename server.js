
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongoJS = require('mongojs');

app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('test', function(){
  app.use(express.errorHandler());
  app.secrets = require('./secrets_test.json');
  connectToMongo();
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.secrets = require('./secrets.json');
  connectToMongo();
});

app.configure('production', function(){
  app.use(express.errorHandler());
  app.secrets = require('./secrets_prod.json');
  connectToMongo();
});

function connectToMongo(){
  app.db = mongoJS.connect(
          app.secrets.mongodb.connectionString, 
          ['jobs', 'categories', 'groups', 'resources']);

  app.host = app.secrets.APIhost;
}

require('./routes');

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

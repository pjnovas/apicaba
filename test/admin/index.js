
var mongoJS = require('mongojs')
  secrets = require('../../secrets.json');

app = {
  db: mongoJS.connect(
        secrets.mongodb.connectionString, 
        ['jobs', 'groups', 'resources']),

  mockGBA: "http://localhost:3050/",
  secrets: secrets
};

describe('API Admin', function(){
  var db = app.db;
  
  before(function(){
    db.groups.insert({ "name": "urbano" });
  });

  after(function(){
    db.groups.remove();
  });

  require('./scheduler.js');
  require('./csv.js');

});

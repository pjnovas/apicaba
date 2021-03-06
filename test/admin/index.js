
var mongoJS = require('mongojs')
  secrets = require('../../secrets_test.json');

app = {
  db: mongoJS.connect(
        secrets.mongodb.connectionString, 
        ['jobs', 'categories', 'groups', 'resources']),

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

  require('./preview.js');
  require('./preview_inspec.js');
  require('./scheduler.js');
  require('./csv.js');

});

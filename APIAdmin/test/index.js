
var mongoJS = require('mongojs')
  secrets = require('../../secrets.json');

app = {
  db: mongoJS.connect(
        secrets.mongodb.connectionString, 
        ['jobs', 'resources']),

  mockGBA: "http://localhost:3050/"
};

describe('Scheduler', function(){

  require('./csv.js');
  //require('./xml.js');
  //require('./zip.js');
  //require('./rar.js');
});

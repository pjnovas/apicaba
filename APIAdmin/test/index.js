/*
require("blanket")([
  "/models/csv.js", 
  "/models/fetcher.js", 
  "/models/persist.js", 
  "/models/job.js", 
  "/models/scheduler.js", 
  "/models/formatter.js"]);
*/

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

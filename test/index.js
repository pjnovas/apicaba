
require("blanket")([
  "/models/csv.js", 
  "/models/fetcher.js", 
  "/models/job.js", 
  "/models/scheduler.js", 
  "/models/formatter.js"]);

require('./scheduler');
require('./job');
require('./fetcher');
require('./formatter');
require('./csv.js');

require("blanket")([
  "/models/csv.js", 
  "/models/fetcher.js", 
  "/models/persist.js", 
  "/models/job.js", 
  "/models/scheduler.js", 
  "/models/formatter.js"]);

require('./scheduler');
require('./job');
require('./csv.js');
require('./fetcher');
require('./formatter');
require('./persist');
require('./integration/csv.js');
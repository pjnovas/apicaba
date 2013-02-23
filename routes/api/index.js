
app.allowCORS = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

require('./category.js');
require('./group.js');
require('./resource.js');

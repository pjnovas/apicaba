
require('./auth.js');

app.get('/', app.isAuthenticated, index);

function index(req, res){
  res.render('admin');
};

require('./category.js');
require('./group.js');
require('./job.js');
require('./resource.js');


//TODO: build dynamic categories
app.get('/api/v1/:resource', isValid, getResource);

function isValid(req, res, next){
  req.resource = req.params.resource;
  next();
}

function getResource(req, res){
  var resource = require('../../data/' + req.resource + '.json');
  res.send(resource);
};

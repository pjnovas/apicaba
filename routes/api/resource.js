var resource = require('../../models/resource')
  , _ = require('underscore')
  , host = app.host;

app.get('/api/recursos', getResourceList);
app.get('/api/recursos/:resource', getResource);

function getResourceList(req, res){

  resource.getAll(function(err, resources){
    if (err) return res.send(500);
    res.send(resources);
  });
}

function getResource(req, res){
  var canonical = req.params.resource,
    query = req.query;

  resource.get(canonical, query, function(err, resource){
    if (err) return res.send(500);
    res.send(resource);
  });
}

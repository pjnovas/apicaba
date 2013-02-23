
var Resource = require('../../models/api/resource')
  , resource = new Resource()
  , translate = require('../../models/api/translate');

app.get('/api/recursos', app.allowCORS, getResourceList);
app.get('/api/recursos/:resource', app.allowCORS, getResource);

function getResourceList(req, res){

  resource.getAll(function(err, resources){
    if (err) return res.send(500);
    res.jsonp(translate(resources));
  });
}

function getResource(req, res){
  var canonical = req.params.resource,
    query = req.query;

  resource.getByQuery(canonical, query, function(err, resource){
    if (err) return res.send(500);
    res.jsonp(resource);
  });
}

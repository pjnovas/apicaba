
var Resource = require('../../models/api/resource')
  , resource = new Resource()
  , translate = require('../../models/api/translate')
  , _ = require('underscore');

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
    query = _.clone(req.query);

  delete query.callback;
  delete query._;

  resource.getByQuery(canonical, query, function(err, resource){
    if (err) return res.send(500);
    res.jsonp(resource);
  });
}

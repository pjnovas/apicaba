var groups = require('../../collections/groups')
  , resources = require('../../collections/resources')
  , _ = require('underscore')
  , host = app.host;

app.get('/api/recursos', getResourceList);
app.get('/api/recursos/:resource', getResource);


function getResourceList(req, res){

  resources.getAll(function(err, resourceList){
    if (err) return res.send(500);

    var _resources = _.map(resourceList, function (resource){
      resource.uri = host + '/api/recursos/' + resource.canonical;
      resource.group = host + '/api/grupos/' + resource.group;
      return cleanData(resource);
    });

    res.send(_resources);
  });

}


function getResource(req, res){
  var resourceCanonical = req.params.resource,
    query = req.query;

  resources.getByCanonical(resourceCanonical, function(err, resource){
    if (err) return res.send(500);

    groups.getByCanonical(resource.group, function(err, group){

      group.uri = host + '/api/grupos/' + resource.group;
      resource.group = cleanData(group);
      
      resources.getByQuery(resource.collection, query, function(err, data){
        cleanData(resource);
        resource.data = data;
        res.send(resource);
      });

    });
  });
}

function cleanData(entity){
  delete entity._id;
  delete entity.canonical;
  delete entity.collection;
  return entity;
}

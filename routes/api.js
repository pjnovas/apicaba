var collDir = '../collections'
  , groups = require(collDir + '/groups')
  , resources = require(collDir + '/resources')
  , _ = require('underscore')
  , host = app.host;

app.get('/api/grupos', getGroupList);
app.get('/api/:group', fillGroup, getResourceList);
app.get('/api/:group/:resource', fillGroup, getResource, getQuery);

function getGroupList(req, res){
  groups.getAll(function(err, groupList){
    if (err) return res.send(500);

    var _groups = _.map(groupList, function (group){
      group.url = host + '/api/' + group.canonical;
      return group;
    });

    res.send(_groups);
  });
}

function fillGroup(req, res, next){
  var groupCanonical = req.params.group;

  groups.getByCanonical(groupCanonical, function(err, group){
    if (err) return res.send(500);
    
    if (group) {
      req.group = group;
      next();
    }
    else res.send(404);
  });
}

function getResourceList(req, res){
  resources.getByGroupName(req.group.canonical, function(err, resourceList){
    if (err) return res.send(500);

    var _resources = _.map(resourceList, function (resource){
      return buildResource(req.group, resource);
    });

    res.send(_resources);
  });
}

function getResource(req, res, next){
  var resourceName = req.params.resource;

  resources.getByCanonical(resourceName, function(err, resource){
    if (err) return res.send(500);

    if (resource) {
      if (!_.isEmpty(req.query)) {
        req.resource = resource;
        next();
      }
      else
        res.send(buildResource(req.group, resource)); 
    }
    else res.send(404);
  });
}

function buildResource(group, resource){
  resource.preview = host + '/api/' + group.canonical + '/' + resource.canonical + '?q=preview';
  resource.parent = host + '/api/' + group.canonical + '/';
  return resource;
}

function getQuery(req, res){
  var query = req.query;
  
  function done(err, resourceList){
    if (err) return res.send(500);
    res.send(resourceList);
  }

  if (query.q && query.q === "preview"){
    resources.getByQuery(req.resource.collection, {}, done);
  }
  else if (_.isObject(query)){
    resources.getByQuery(req.resource.collection, query, done);
  }
  else {
    res.send(400);
  }
}
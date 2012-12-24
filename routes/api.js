var collDir = '../collections'
  , groups = require(collDir + '/groups')
  , resources = require(collDir + '/resources')
  , _ = require('underscore')
  , host = app.host;

app.get('/api/grupos', getGroupList);
app.get('/api/:group', fillGroup, getResourceList);
app.get('/api/:group/:resource', fillGroup, getResource);

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
  resources.getByGroupName(req.group.name, function(err, resourceList){
    if (err) return res.send(500);

    var _resources = _.map(resourceList, function (resource){
      return buildResource(req.group, resource);
    });

    res.send(_resources);
  });
}

function getResource(req, res){
  var resourceName = req.params.resource;

  resources.getByCanonical(resourceName, function(err, resource){
    if (err) return res.send(500);

    if (resource) {
      res.send(buildResource(req.group, resource));
    }
    else res.send(404);
  });
}

function buildResource(group, resource){
  resource.url = host + '/api/' + group.canonical + '/' + resource.canonical;
  resource.parent = host + '/api/' + group.canonical + '/';
  return resource;
}
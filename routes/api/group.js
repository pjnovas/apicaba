var categories = require('../../collections/categories')
  , groups = require('../../collections/groups')
  , resources = require('../../collections/resources')
  , _ = require('underscore')
  , host = app.host;

app.get('/api/grupos', getGroupList);
app.get('/api/grupos/:group', getGroup);

function getGroupList(req, res){
  groups.getAll(function(err, groupList){
    if (err) return res.send(500);

    var _groups = _.map(groupList, function (group){
      group.uri = host + '/api/grupos/' + group.canonical;
      group.category = host + '/api/categorias/' + group.category;
      return cleanData(group);
    });

    res.send(_groups);
  });
}

function getGroup(req, res){
  var groupCanonical = req.params.group;

  groups.getByCanonical(groupCanonical, function(err, group){
    if (err) return res.send(500);
    
    categories.getByCanonical(group.category, function(err, category){

      category.uri = host + '/api/categorias/' + group.category;
      group.category = cleanData(category);
      var grp = cleanData(group);

      resources.getByGroupName(groupCanonical, function(err, resourceList){

        grp.resources = _.map(resourceList, function (resource){
          resource.uri = host + '/api/recursos/' + resource.canonical;
          return cleanData(resource);
        });

        res.send(grp);
      });
    });
  });
}

function cleanData(entity){
  delete entity._id;
  delete entity.canonical;
  return entity;
}

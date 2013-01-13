var categories = require('../../collections/categories')
  , groups = require('../../collections/groups')
  , _ = require('underscore')
  , host = app.host;

app.get('/api/categorias', getCategoryList);
app.get('/api/categorias/:category', getCategory);

function getCategoryList(req, res){
  categories.getAll(function(err, categoryList){
    if (err) return res.send(500);

    var _categories = _.map(categoryList, function (category){
      category.uri = host + '/api/categorias/' + category.canonical;
      return cleanData(category);
    });

    res.send(_categories);
  });
}

function getCategory(req, res){
  var categoryCanonical = req.params.category;

  categories.getByCanonical(categoryCanonical, function(err, category){
    if (err) return res.send(500);
    
    var cat = cleanData(category);

    groups.getByCategory(categoryCanonical, function(err, groupList){

      cat.groups = _.map(groupList, function (group){
        group.uri = host + '/api/grupos/' + group.canonical;
        return cleanData(group);
      });

      res.send(cat);
    });

  });
}

function cleanData(entity){
  delete entity._id;
  delete entity.canonical;
  return entity;
}

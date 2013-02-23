
var
    Category = require('../models/api/category')
  , category = new Category()
  , Group = require('../models/api/group')
  , group = new Group()
  , Resource = require('../models/api/resource')
  , resource = new Resource()
  , translate = require('../models/api/translate')
  , _ = require('underscore');

app.get('/', index);
app.get('/docs', docs);
app.get('/apitree.json', apiTree);

var 
  treeCached = null,
  aDay = 86400000;

setTimeout(function(){
  treeCached = null;
}, aDay);

function index(req, res){
  res.render('index');
}

function docs(req, res){
  res.render('docs');
}

function apiTree(req, res){

  if (treeCached) {
    return res.send(treeCached);
  }

  category.getAll(function(err, categories){
    if (err) return res.send(500);
    var categories = translate(categories);
    categories = _.sortBy(categories, function(i){return i.nombre;});

    group.getAll(function(err, groups){
      if (err) return res.send(500);
      var groups = translate(groups);
      groups = _.sortBy(groups, function(i){return i.nombre;});

      resource.getAll(function(err, resources){
        if (err) return res.send(500);
        var resources = translate(resources);
        resources = _.sortBy(resources, function(i){return i.nombre;});

        buildTree(categories, groups, resources);
      });
    });
  });


  function buildTree(categories, groups, resources){
    
    var tree = {
      name: "Web API",
      children: []
    };

    _.each(categories, function(c){
      var cat = {
        name: c.nombre,
        children: []
      };

      _.each(groups, function(g){    
        
        if (g.categoria === c.uri) {
          var gru = {
            name: g.nombre,
            children: []
          };

          _.each(resources, function(r){
            if (r.grupo === g.uri) {
              gru.children.push({
                name: r.nombre,
                descripcion: r.descripcion,
                uri: r.uri,
                propiedades: r.propiedades,
                cantidad: r.cantidad
              });
            }
          });

          cat.children.push(gru);
        }

      });

      tree.children.push(cat);
    });

    treeCached = tree;
    res.send(treeCached);
  }
}
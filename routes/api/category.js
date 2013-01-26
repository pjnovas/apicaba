
var Category = require('../../models/api/category')
  category = new Category(),
  translate = require('../../models/api/translate');

app.get('/api/categorias', getCategoryList);
app.get('/api/categorias/:category', getCategory);

function getCategoryList(req, res){

  category.getAll(function(err, categories){
    if (err) return res.send(500);
    res.send(translate(categories));
  });
}

function getCategory(req, res){
  var canonical = req.params.category;

  category.get(canonical, function(err, found){
    if (err) return res.send(500);
    res.send(translate(found));
  });
}

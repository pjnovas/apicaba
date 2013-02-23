
var Category = require('../../models/api/category')
  category = new Category(),
  translate = require('../../models/api/translate');

app.get('/api/categorias', app.allowCORS, getCategoryList);
app.get('/api/categorias/:category', app.allowCORS, getCategory);

function getCategoryList(req, res){

  category.getAll(function(err, categories){
    if (err) return res.send(500);
    res.jsonp(translate(categories));
  });
}

function getCategory(req, res){
  var canonical = req.params.category;

  category.get(canonical, function(err, found){
    if (err) return res.send(500);
    res.jsonp(translate(found));
  });
}

var categories = require('../../collections/categories');

app.get('/categorias', getList);

function getList(req, res){
  categories.getAll(function(err, categoryList){
    if (err) return res.send(500);
    res.send(categoryList);
  });
}


app.get('/', routes.index);

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};


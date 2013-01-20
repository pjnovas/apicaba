
app.get('/', index);
app.get('/docs', docs);

function index(req, res){
  res.render('index');
};

function docs(req, res){
  res.render('docs');
};
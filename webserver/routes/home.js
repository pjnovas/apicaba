
app.get('/', index);

function index(req, res){
  res.render('index', { title: 'Express' });
};


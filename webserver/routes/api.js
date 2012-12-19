
//TODO: replace 'main' by a dynamic category
app.get('/api/v1/:category/:resource', isValid, getResource);

function isValid(req, res, next){
  next();
}

function getResource(req, res){
  res.send({});
};



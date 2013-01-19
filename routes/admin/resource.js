
var Preview = require('../../models/preview');

app.get('/resources/preview', app.isAuth, getPreview);

function getPreview(req, res){
  var url = req.query['url']
    , parser = req.query['parser']
    , delimiter = req.query['delimiter'];
  
  var prev = new Preview(url, parser, delimiter);

  prev.run(function(err, prevData){
    if (err) return res.send(500);
    res.send(prevData);
  });
}

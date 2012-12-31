
var Preview = require('../../models/preview');

app.get('/resources/preview', getPreview);

function getPreview(req, res){
  var url = req.query['url']
    , parser = req.query['parser'];

  console.log('url ' + url);
  console.log('parser ' + parser);
  
  var prev = new Preview(url, parser);

  prev.run(function(err, prevData){
    if (err) return res.send(500);
    res.send(prevData);
  });
}

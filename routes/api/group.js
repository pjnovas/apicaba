
var Group = require('../../models/api/group')
  , group = new Group(),
  translate = require('../../models/api/translate');

app.get('/api/grupos', app.allowCORS, getGroupList);
app.get('/api/grupos/:group', app.allowCORS, getGroup);

function getGroupList(req, res){

  group.getAll(function(err, groups){
    if (err) return res.send(500);
    res.jsonp(translate(groups));
  });
}

function getGroup(req, res){
  var canonical = req.params.group;

  group.get(canonical, function(err, found){
    if (err) return res.send(500);
    res.jsonp(translate(found));
  });
}


var groups = require('../../collections/groups');

app.get('/grupos', getList);
app.post('/grupos', create);
app.put('/grupos/:group', update);
app.del('/grupos/:group', remove);

function getList(req, res){
  groups.getAll(function(err, groupList){
    if (err) return res.send(500);
    res.send(groupList);
  });
}

function create(req, res){
  groups.create(req.body.group, function(err, group){
    if (err) return res.send(500);
    res.send(201, group); //OK Resource created
  });
}

function update(req, res){
  var groupId = req.params.group;

  groups.update(groupId, req.body.group, function(err){
    if (err) return res.send(500);
    res.send(204); //Ok with No Content
  });
}

function remove(req, res){
  var groupId = req.params.group;

  groups.remove(groupId, function(err){
    if (err) return res.send(500);
    res.send(204); //OK with No Content
  });
}

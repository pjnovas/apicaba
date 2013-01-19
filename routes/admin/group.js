
var groups = require('../../collections/groups')
  , jobs = require('../../collections/jobs');

app.get('/grupos', app.isAuth, getList);
app.post('/grupos', app.isAuth, create);
app.put('/grupos/:group', app.isAuth, update);
app.del('/grupos/:group', app.isAuth, remove);

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
  var groupId = req.params.group,
    group = req.body.group;

  groups.getById(groupId, function(err, aGroup){
    if (err) return res.send(500);

    jobs.updateGroup(aGroup.canonical, group.canonical, function(err){
      if (err) return res.send(500);

      groups.update(groupId, group, function(err){
        if (err) return res.send(500);
        res.send(204); //Ok with No Content
      });
    });
  });
}

function remove(req, res){
  var groupId = req.params.group;

  groups.remove(groupId, function(err){
    if (err) return res.send(500);
    res.send(204); //OK with No Content
  });
}

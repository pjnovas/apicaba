
var apicaba = apicaba || {};
apicaba.models = apicaba.models || {};

apicaba.models.group = (function(){
  var groups = [],
    exports = new EventEmitter();

  function add(group) {
    apicaba.api.group.new(group, function(err, newgroup){
      if(err) return;

      groups.unshift(group);

      exports.emit('add', newgroup);
      exports.emit('change', groups);
    });
  }

  function update(group) {

    apicaba.api.group.update(group, function(err){
      if(err) return;

      for(var i = 0; i < groups.length; i++){
        if (groups[i]._id === group._id){
          groups[i] = _.clone(group);
          break;
        }
      }

      exports.emit('update', group);
      exports.emit('change', groups);
    });
  }

  exports.bind = function(){
    apicaba.api.group.getAll(function(err, _groups){
      groups = _groups;
      
      exports.emit('bind', groups);
      exports.emit('change', groups);
    });

    return this;
  };

  exports.save = function(group){
    if (group._id) update(group);
    else add(group);

    return this;
  };

  exports.remove = function(id) {
   
    for(var i = 0; i < groups.length; i++){
      if (groups[i]._id === id){
        groups.slice(i, i);
        break;
      }
    }

    apicaba.api.group.delete(id, function(err){
      //TODO: if something bad happened, put the group 
      // back again and re-render
    });

    return this;
  };

  exports.selectGroup = function(id){
    for(var i = 0; i < groups.length; i++){
      if (groups[i]._id === id){

        exports.emit('select', groups[i]);

        /*
        var category = apicaba.models.category.getByCanonical(groups[i].category);
        apicaba.models.category.selectCategory(category._id);
        */
        break;
      }
    }

    return this;
  };

  exports.getByCanonical = function(canonical){
    for(var i = 0; i < groups.length; i++){
      if (groups[i].canonical === canonical){
        return groups[i];
      }
    }
  };

  return exports;

})();


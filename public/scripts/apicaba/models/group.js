
var apicaba = apicaba || {};
apicaba.models = apicaba.models || {};

apicaba.models.group = (function(){
  var groups = [],
    cache = [];

  return {

    bind: function(){
      apicaba.api.group.getAll(function(err, _groups){
        groups = _groups;
        cache = _groups;
        apicaba.views.groupCombo.render();
        apicaba.views.groupList.render();
      });
    },

    add: function(group) {
      apicaba.api.group.new(group, function(err, newgroup){
        if (!err) {
          groups.unshift(group);
          apicaba.views.groupList.render();
          apicaba.views.groupCombo.render();
        }
      });
    },

    update: function(group) {

      for(var i = 0; i < cache.length; i++){
        if (cache[i]._id === group._id){
          cache[i] = _.clone(group);
          break;
        }
      }

      for(var i = 0; i < groups.length; i++){
        if (groups[i]._id === group._id){
          groups[i] = _.clone(group);
          break;
        }
      }

      apicaba.api.group.update(group, function(err){
        //TODO: if something bad happened, update the group 
        // back again and re-render
      });

      apicaba.views.groupList.render();
      apicaba.views.groupCombo.render();
    },

    save: function(group){
      if (group._id) this.update(group);
      else this.insert(group);
    },

    remove: function(id) {
      for(var i = 0; i < cache.length; i++){
        if (cache[i]._id === id){
          cache.splice(i, 1);
          break;
        }
      }

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

      apicaba.views.groupList.render();
      apicaba.views.groupCombo.render();
    },

    selectGroup: function(id){
      for(var i = 0; i < groups.length; i++){
        if (groups[i]._id === id){
          apicaba.views.groupEdit.render(groups[i]);
          return;
        }
      }
    },

    getGroups: function(){
      return cache;
    },

    getRealGroups: function(){
      return groups;
    }
  };

})();


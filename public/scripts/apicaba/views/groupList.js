
var apicaba = apicaba || {};
apicaba.views = apicaba.views || {};

apicaba.views.groupList = (function($){
  var model = "groups",
    container = '#group-list';

  var events = {
    "change::select": selectGroup,
    "click::#newGroup": showCreate
  };

  function selectGroup(e){
    
  }

  function showCreate(e){
    apicaba.views.groupEdit.render();
  }

  apicaba.utils.events.build(container, events);

  return {
    render: function(done) {
      var groups = apicaba.models.group.getGroups();
      
      apicaba.utils.template.render(model, 'groupList', { items: groups }, 
        function(err, rendered){
          $('*', container).remove();
          $(container).html(rendered);
          if (done) done();
      });
    }
  };

})(jQuery);

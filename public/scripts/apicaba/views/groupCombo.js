
var apicaba = apicaba || {};
apicaba.views = apicaba.views || {};

apicaba.views.groupCombo = (function($){
  var model = "groups",
    container = '#group-combo';

  var events = {
    "change::select": selectGroup
  };

  apicaba.utils.events.build(container, events);

  function selectGroup(){
    apicaba.models.group.selectGroup($(this).val());
  }

  return {
    render: function(done) {
      var groups = apicaba.models.group.getGroups();
      
      apicaba.utils.template.render(model, 'groupCombo', { items: groups }, 
        function(err, rendered){
          $('select, a', container).remove();
          $(container).html(rendered);
          if (done) done();
      });
    },
    select: function(group){
      $('select', container).val(group._id);      
    }
  };

})(jQuery);

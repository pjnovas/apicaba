
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

  function render(groups){
    apicaba.utils.template.render(model, 'groupCombo', { items: groups }, 
      function(err, rendered){
        $('select, a', container).remove();
        $(container).html(rendered);
    });
  }

  apicaba.models.group.on('bind', render);
  apicaba.models.group.on('change', render);

  apicaba.models.group.on('select', function(group){
    $('select', container).val(group._id);
  });

})(jQuery);

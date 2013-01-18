
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
    apicaba.models.group.select($(this).val());
  }

  function render(groups){
    var rendered = apicaba.templates.groupCombo({ items: groups });
    $('select, a', container).remove();
    $(container).html(rendered);
  }

  apicaba.models.group.on('bind', function(g){
    render(g);
  });

  apicaba.models.group.on('change', function(g){
    render(g);
  });

  apicaba.models.group.on('select', function(group){
    $('select', container).val(group._id);
  });

})(jQuery);

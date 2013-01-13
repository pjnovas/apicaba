
var apicaba = apicaba || {};
apicaba.views = apicaba.views || {};

apicaba.views.groupList = (function($){
  var model = "groups",
    container = '#group-list';
 
  var events = {
    "click::tr": selectGroup
  };

  function selectGroup(e){
    apicaba.models.group.selectGroup(this.id);
    $('.modal-body').scrollTop(0);
  }

  apicaba.utils.events.build(container, events);

  function render(groups){
    apicaba.utils.template.render(model, 'groupList', { items: groups }, 
      function(err, rendered){
        $('tr', container).remove();
        $(container).html(rendered);
    });
  }

  apicaba.models.group.on('change', render);

})(jQuery);




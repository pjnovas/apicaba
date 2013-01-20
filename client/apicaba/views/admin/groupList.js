
var apicaba = apicaba || {};
apicaba.views = apicaba.views || {};

apicaba.views.groupList = (function($){
  var model = "groups",
    container = '#group-list';
 
  var events = {
    "click::tr": selectGroup
  };

  function selectGroup(e){
    apicaba.models.group.select(this.id);
    $('.modal-body').scrollTop(0);
  }

  apicaba.utils.events.build(container, events);

  function render(groups){
    var rendered = apicaba.templates.groupList({ items: groups });
    $('tr', container).remove();
    $(container).html(rendered);
  }

  apicaba.models.group.on('change', render);

})(jQuery);




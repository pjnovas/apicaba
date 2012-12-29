
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

  return {
    render: function(done) {
      var groups = apicaba.models.group.getGroups();

      apicaba.utils.template.render(model, 'groupList', { items: groups }, 
        function(err, rendered){
          $('tr', container).remove();
          $(container).html(rendered);
          if (done) done();
      });
    }
  };

})(jQuery);




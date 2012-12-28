
var apicaba = apicaba || {};
apicaba.views = apicaba.views || {};

apicaba.views.groupEdit = (function($){
  var model = "groups",
    container = '#group-list';

  var events = {
    "click::#save-group": save,
    "click::#cancel-group": cancel,
    "keyup::#name-group": showCanonical
  };

  function save() {
    var name = $('#name-group', container).val(),
      canonical = $('#canonical', container).val();

    apicaba.models.group.add({
      name: name,
      canonical: canonical
    });
  }

  function cancel() {
    render();
  }

  apicaba.utils.events.build(container, events);

  function showCanonical(){
    var name = $('#name-group', container).val(),
      canonical = $('#canonical', container);

    name = name.toLowerCase().replace(/ /g, '-');
    canonical.val(name);
  }

  function render(aGroup, done) {
    var group = aGroup || {};
    
    apicaba.utils.template.render(model, 'groupEdit', group, 
      function(err, rendered){
        $('*', container).remove();
        $(container).html(rendered);
        if (done) done();
    });
  }

  return {
    render: render
  };

})(jQuery);

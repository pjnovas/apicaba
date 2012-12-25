
var apicaba = apicaba || {};
apicaba.views = apicaba.views || {};

apicaba.views.groupEdit = (function($){
  var model = "groups",
    container = '.group-form';

  var events = {
    "click::#save": save,
    "click::#cancel": cancel,
    "keyup::#name": showCanonical
  };

  function save() {
    var group = buildgroup();
    apicaba.models.save(group);

    render();
  }

  function cancel() {
    render();
  }

  apicaba.utils.events.build(container, events);

  function showCanonical(){
    var name = $('#name', container).val(),
      group = $('#group', container).val();

    name = name.toLowerCase().replace(/ /g, '-');
    $('#access', container).text('/' + group + '/' + name);
  }

  function buildgroup(){
    return {
      _id: $('#groupId', container).val(),
      name: $('#name', container).val(),
      group: $('#group', container).val(),
      cron: $('#cron', container).val(),
      parser: $('#parser', container).val(),
      url: $('#url', container).text()
    };
  }

  function render(agroup, done) {
    var group = agroup || {};
    
    apicaba.utils.template.render(model, 'groupEdit', group, 
      function(err, rendered){
        $('form', container).remove();
        $(container).html(rendered);

        $('body').scrollTop(0);
        $('#name', container).focus();

        if (done) done();
    });
  }

  return {
    render: render
  };

})(jQuery);

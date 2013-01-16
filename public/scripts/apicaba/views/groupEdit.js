
var apicaba = apicaba || {};
apicaba.views = apicaba.views || {};

apicaba.views.groupEdit = (function($){
  var model = "groups",
    container = '.group-form';

  var events = {
    "click::#save-group": save,
    "click::#cancel-group": cancel,
    "keyup::#name-group": showCanonical
  };

  function save() {
    apicaba.models.group.save(buildGroup());
  }

  function cancel() {
    render();
  }

  function buildGroup(){
    var g = {
      _id: $('#groupId', container).val(),
      name: $('#name-group', container).val(),
      canonical: $('#canonical-group', container).val(),
      description: $('#description-group', container).val(),
      category: $('#category option:selected', container).attr('data-canonical')
    };

    if (!g._id) delete g._id;
    return g;
  }

  apicaba.utils.events.build(container, events);

  function showCanonical(){
    var name = $('#name-group', container).val(),
      canonical = $('#canonical-group', container);

    name = name.toLowerCase().replace(/ /g, '-');
    canonical.val(name);
  }

  function render(group) {

    function selectCategory(){
      apicaba.models.category.removeListener('bind', selectCategory);
      apicaba.models.category.select(group.category, 'canonical');
    }

    apicaba.utils.template.render(model, 'groupEdit', group || {}, 
      function(err, rendered){
        //$('*', container).remove();
        $(container).html(rendered);

        if (group && group.category) {
          apicaba.models.category.select(group.category);
        }

        if (group && group.category) {
          apicaba.models.category.on('bind', selectCategory);
        }

        apicaba.models.category.bind();
    });
  }

  render();

  apicaba.models.group.on('select', render);

})(jQuery);

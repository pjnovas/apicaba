
var apicaba = apicaba || {};
apicaba.views = apicaba.views || {};

apicaba.views.categoryCombo = (function($){
  var model = "categories",
    container = '#category-combo';

  var events = {
    "change::select": selectCategory
  };

  apicaba.utils.events.build(container, events);

  function selectCategory(){
    apicaba.models.category.select($(this).val());
  }

  function render(categories){
    var rendered = apicaba.templates.categoryCombo({ items: categories });
    $('select, a', container).remove();
    $(container).html(rendered);
  }

  apicaba.models.category.on('bind', render);
  apicaba.models.category.on('change', render);

  apicaba.models.category.on('select', function(category){
    $('select', container).val(category._id);
  });

})(jQuery);

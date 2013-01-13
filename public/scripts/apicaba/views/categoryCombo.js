
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
    apicaba.models.category.selectCategory($(this).val());
  }

  function render(categories){
    apicaba.utils.template.render(model, 'categoryCombo', { items: categories }, 
      function(err, rendered){
        $('select, a', container).remove();
        $(container).html(rendered);
    });
  }

  apicaba.models.category.on('bind', render);

  apicaba.models.category.on('select', function(category){
    $('select option:selected', container).attr('data-canonical');
    //$('select', container).val(category._id);
  });

})(jQuery);

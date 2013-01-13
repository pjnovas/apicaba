
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

  return {
    render: function(done) {
      var categories = apicaba.models.category.getCategories();
      
      apicaba.utils.template.render(model, 'categoryCombo', { items: categories }, 
        function(err, rendered){
          $('select, a', container).remove();
          $(container).html(rendered);
          if (done) done();
      });
    },
    select: function(category){
      $('select', container).val(category._id);      
    }
  };

})(jQuery);

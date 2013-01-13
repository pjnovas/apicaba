
var apicaba = apicaba || {};
apicaba.models = apicaba.models || {};

apicaba.models.category = (function(){
  var categories = [],
    cache = [];

  return {

    bind: function(done){
      apicaba.api.category.getAll(function(err, _categories){
        categories = _categories;
        cache = _categories;
        
        apicaba.views.categoryCombo.render(function(){
          if (done) done();  
        });
      });
    },

    selectCategory: function(id){
      for(var i = 0; i < categories.length; i++){
        if (categories[i]._id === id){
          apicaba.views.categoryCombo.select(categories[i]);
          return;
        }
      }
    },

    getCategories: function(){
      return cache;
    },

    getByCanonical: function(canonical){
      for(var i = 0; i < categories.length; i++){
        if (categories[i].canonical === canonical){
          return categories[i];
        }
      }
    },

    getRealCategories: function(){
      return categories;
    }
  };

})();


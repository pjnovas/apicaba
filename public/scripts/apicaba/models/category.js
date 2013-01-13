
var apicaba = apicaba || {};
apicaba.models = apicaba.models || {};

apicaba.models.category = (function(){
  var categories = [],
    exports = new EventEmitter(),
    load = false,
    selected = null;

  exports.bind = function(){
    if (!load){
      apicaba.api.category.getAll(function(err, _categories){
        categories = _categories;
        load = true;

        exports.emit('bind', categories);

        if (selected) {
          exports.selectCategory(selected);
        }
      });
    }
    else {
      exports.emit('bind', categories);
      if (selected) {
        exports.selectCategory(selected);
      }
    }

    return this;
  };

  exports.selectCategory = function(canonical){
    if (!load){
      selected = canonical;
    }
    else {
      for(var i = 0; i < categories.length; i++){
        if (categories[i].canonical === canonical){
          exports.emit('select', categories[i]);
          break;
        }
      }
    }

    return this;
  };
/*
  exports.getByCanonical = function(canonical){
    for(var i = 0; i < categories.length; i++){
      if (categories[i].canonical === canonical){
        return categories[i];
      }
    }
  };
*/
  return exports;
})();


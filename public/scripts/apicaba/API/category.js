
var apicaba = apicaba || {};
apicaba.api = apicaba.api || {};

apicaba.api.category = (function(){
  var root = '/categorias/';

  return {
    getAll: function(done) {
      apicaba.utils.ajax.call({
        method: 'GET',
        url: root
      }, done);
    }
  };
})();


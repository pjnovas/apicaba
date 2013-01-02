
var apicaba = apicaba || {};
apicaba.api = apicaba.api || {};

apicaba.api.resource = (function(){
  var root = '/resources/';

  return {
    getPreview: function(data, done) {
      apicaba.utils.ajax.call({
        method: 'GET',
        url: root + 'preview',
        dataType: "json",
        data: {
          url: data.url,
          parser: data.parser,
          delimiter: data.delimiter
        }
      }, done);
    }
  };
})();


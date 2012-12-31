
var apicaba = apicaba || {};
apicaba.models = apicaba.models || {};

apicaba.models.resource = (function(){
  var preview;

  return {
    getPreview: function(source, done){
      if (preview){
        apicaba.views.resourcePreview.render(preview);
        done();
        return;
      }

      apicaba.api.resource.getPreview(source, function(err, previewData){
        preview = {
          fields: getFields(previewData),
          items: previewData
        };

        apicaba.views.resourcePreview.render(preview);
        //TODO: bind view fields jobs

        if (done) done();
      });

      function getFields(prev){
        var fieldsArr = [];
        for (var p in prev[0]){
          fieldsArr.push(p);
        }
        return fieldsArr;
      }
    },

    clearPreview: function(){
      preview = null;
    }
  };

})();


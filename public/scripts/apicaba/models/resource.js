
var apicaba = apicaba || {};
apicaba.models = apicaba.models || {};

apicaba.models.resource = (function(){
  var preview;

  return {
    getPreview: function(source, done){
      apicaba.views.jobFields.loading();

      if (preview){
        apicaba.views.resourcePreview.render(preview);
        apicaba.views.jobFields.render(preview.fields);
        if (done) done();
        return;
      }

      apicaba.api.resource.getPreview(source, function(err, previewData){
        preview = {
          fields: getFields(previewData),
          items: previewData
        };

        apicaba.views.resourcePreview.render(preview);
        apicaba.views.jobFields.render(preview.fields);

        if (done) done();
      });

      function getFields(prev){
        var fieldsArr = [];
        for (var p in prev[0]){
          fieldsArr.push({
            name: p
          });
        }
        return fieldsArr;
      }
    },

    clearPreview: function(){
      preview = null;
    }
  };

})();


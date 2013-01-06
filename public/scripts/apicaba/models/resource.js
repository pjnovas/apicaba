
var apicaba = apicaba || {};
apicaba.models = apicaba.models || {};

apicaba.models.resource = (function(){
  var preview;

  return {
    getPreview: function(source, done){
      apicaba.views.jobFields.loading();

      apicaba.api.resource.getPreview(source, function(err, previewData){
        preview = previewData;

        apicaba.views.resourcePreview.render(previewData);
        apicaba.views.jobFields.render(previewData.fields);

        if (done) done();
      });
    },

    clearPreview: function(){
      preview = null;
    }
  };

})();



var apicaba = apicaba || {};
apicaba.views = apicaba.views || {};

apicaba.views.resourcePreview = (function($){
  var model = "resources",
    container = '#preview';
 
  Handlebars.registerHelper('trList', function(items) {
    var html = '';

    for (var i=0; i<items.length; i++){
      var item = items[i];
      html += "<tr>";
      
      for (var p in item){
        html += "<td>" + item[p] + "</td>";
      }

      html += "</tr>";
    }

    return new Handlebars.SafeString(html);
  });

  return {
    render: function(prevData, done) {
      var rendered = apicaba.templates.resourcePreview(prevData);
      $(container).empty().html(rendered);
      if (done) done();
    }
  };

})(jQuery);


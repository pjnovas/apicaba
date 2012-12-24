
var apicaba = apicaba || {};
apicaba.utils = apicaba.utils || {};

apicaba.utils.events = (function($){

  function build(container, events){
    for (var e in events) {
      var parts = e.split('::');
      $(document).on(parts[0], container + ' ' + parts[1], events[e]);
    }
  }
 
  return {
    build: build
  };

})(jQuery);




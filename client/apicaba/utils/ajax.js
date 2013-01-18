
var apicaba = apicaba || {};
apicaba.utils = apicaba.utils || {};

apicaba.utils.ajax = (function($){

  var call = function(opts, callback){
    //TODO: defaults

    var jqxhr = 
      $.ajax({
        type: opts.method,
        url: opts.url,
        data: opts.data
      })
      .done(function(data) { 
        callback(null, data);
      })
      .fail(function() { 
        console.log('apicaba.utils.ajax > fail');
        console.dir(jqxhr);
        callback(new Error('error on ajax call'));
      })
      .always(function() { 
        
      });
  }

  return {
    call: call
  };

})(jQuery);




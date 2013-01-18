
var apicaba = apicaba || {};
apicaba.utils = apicaba.utils || {};

apicaba.utils.repository = (function(){
  var resources = {},
      loaded = 0,
      getCount = function(){return Object.keys(resources).length;};
  
  var events = {
    complete: function(){},
    report: function(){},
    error: function(){}
  };

  var imageLoaded = function() {
    var prg = (++loaded * 100) / getCount();
    events.report(prg);
    if (prg >= 100) events.complete();
  };
  
  var imageFailed = function(evt, etc){
    events.error(evt, etc);       
  };

  return {
    on: function(eventName, callback){
      if (events[eventName])
      events[eventName] = callback;
      return this;
    },
    
    loadOne: function(name, callback, errorCallback){
      var cb = (callback || function(){}),
        errorCb = (errorCallback || function(){});
      
      if (!name) throw "Parameter 'name' not specify";
      
      if (resources[name]){
        this[name] = new Image();
        this[name].onload = cb;
        this[name].onerror = errorCb;
        this[name].src = resources[name];
        if (this[name].complete) cb();
      } else throw "Resource " + name + " not found!. Use addReource() before load.";
      return this;
    },
    
    load: function(){
      loaded = 0;
      for (var img in resources) {
        this[img] = new Image();
        this[img].onload = imageLoaded;
        this[img].onerror = imageFailed;
        this[img].src = resources[img];
        if (this[img].complete) imageLoaded();
      }
      return this;
    },
    
    addResources: function(newResources){
      for(var r in newResources){
        if (resources.hasOwnProperty(r)) throw 'The resource ' + r + ' already exists.';
        resources[r] = newResources[r];
      }
      return this;
    },
    
    clear: function(){
      var i = getCount();
      do {
        if (this[resources[i]]){
          this[resources[i]] = null;
          delete this[resources[i]];
        }
      } while (i--);
      resources = {};
    }
    
  };
  
})();


var apicaba = apicaba || {};
apicaba.views = apicaba.views || {};
apicaba.views.splash = apicaba.views.splash || {};

apicaba.views.splash.sucker = (function(){
  var requestAnimId = 0,
    canvas,
    ctx,
    wait = 1000,
    timer,
    steps = 5,
    vel = 100,
    attr = { x: 0, y: 0, w: 170, h: 260 },
    image;

  var update = function(){

    if (steps === 5)
      steps = 0;
    else steps++;

    if (steps === 0){
      clearInterval(timer);
      setTimeout(function(){
        timer = setInterval(update, vel);
      }, wait);
    }

    attr.x = steps * attr.w;
  };
  
  var draw = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, attr.x, attr.y, attr.w, attr.h, 0, attr.y, attr.w, attr.h);
  };

  var startLoop = function(){
    stopLoop();

    var loop = function(){
      draw();
      requestAnimId = window.requestAnimationFrame(loop);
    };

    update();
    loop();
  };

  var stopLoop = function(){
    if (requestAnimId)
      window.cancelAnimationFrame(requestAnimId);

    requestAnimId = 0;
  };

  return {
    context: function(){
      return bufferCtx;
    },

    init: function(canvasId, imageId){
      canvas = document.getElementById(canvasId);
      if(!canvas) throw "There is no canvas with id " + canvasId;
      
      if (canvas.getContext){
        ctx = canvas.getContext('2d');
      } 
      else throw "canvas is not supported!";

      image = apicaba.utils.repository[imageId];
      draw();

      return this;
    },
    
    begin: function(){
      startLoop();
      return this;
    },
    
    end: function(){
      stopLoop();
      return this;
    }
  };

})();
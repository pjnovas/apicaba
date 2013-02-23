
var apicaba = apicaba || {};
apicaba.views = apicaba.views || {};
apicaba.views.splash = apicaba.views.splash || {};

apicaba.views.splash.bazooka = (function(){
  var requestAnimId = 0,
    canvas,
    ctx,
    timer,
    steps = -1,
    vel = 100,
    attr = { x: 0, y: 240, w: 170, h: 255 },
    image;

  var update = function(){
    
    if (steps === 5) {
      steps = -1;
      clearInterval(timer);
      stopLoop();
    }
    else steps++;

    if (steps === 0){
      clearInterval(timer);
      timer = setInterval(update, vel);
    }

    attr.x = steps * attr.w;
  };
  
  var draw = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, attr.x, attr.y, attr.w, attr.h, 0, -20, attr.w, attr.h);
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
    
    shoot: function(){
      startLoop();
      return this;
    },
    
    end: function(){
      stopLoop();
      return this;
    }
  };

})();
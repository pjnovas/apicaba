
var apicaba = apicaba || {};
apicaba.views = apicaba.views || {};
apicaba.views.splash = apicaba.views.splash || {};

apicaba.views.splash.door = (function(){
  var requestAnimId = 0,
    canvas,
    ctx,
    timer,
    timerBall,
    action = 'open',
    current = 'close',
    steps = 0,
    ballDir = 1,
    ballStep = 1,
    vel = 100,
    velBall = 100,
    attr = { x: 0, y: 0, w: 160, h: 120 },
    image;

  var update = function(){

    switch(action){
      case 'open':
        if (steps === 3) 
          current = 'open';
        else {
          steps++;
          current = 'move';
        }
        break;
      case 'close': 
        if (steps === 0) 
          current = 'close';
        else {
          steps--;
          current = 'move';
        }
        break;
    }

    if (current === 'move'){
      clearInterval(timer);
      timer = setInterval(update, vel);
    }

    attr.x = steps * attr.w;
  };

  var updateBall = function(){

    if (ballDir > 0) ballStep++;
    else ballStep--;

    if (ballStep !== 2)
      ballDir *= -1;
  };
  
  var draw = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Background
    ctx.drawImage(image, 0, attr.h, attr.w, attr.h, 0, attr.y, attr.w, attr.h);

    //Magic
    ctx.drawImage(image, attr.w * ballStep, attr.h, attr.w, attr.h, 0, attr.y, attr.w, attr.h);

    //Door
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
    
    open: function(){
      action = 'open';
      
      clearInterval(timerBall);
      timerBall = setInterval(updateBall, velBall);

      startLoop();
      return this;
    },
    
    close: function(){
      action = 'close';
      startLoop();
      return this;
    }
  };

})();
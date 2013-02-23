
$(function(){

  apicaba.utils.repository.addResources({
    'bg': '/images/bg.png',
    'objects': '/images/objects.png',
    'sprites': '/images/sprites.png',
    'door': '/images/door.png'
  }).on('error', function(err){
    
  }).on('report', function(prg){
    
  }).on('complete', function(){
    
    $('.splash')
      .addClass('ready')
      .children('.object')
      .addClass('ready');    

    apicaba.views.splash.door.init('door', 'door');
    apicaba.views.splash.sucker.init('sucker', 'sprites');
    apicaba.views.splash.bazooka.init('bazooka', 'sprites');

    apicaba.views.splash.sucker.onSucked(function(){
      setTimeout(apicaba.views.splash.bazooka.shoot, 400);
    }).begin();

    $('.machine-cover').hover(function(){
      apicaba.views.splash.door.open();
    }, function(){
      apicaba.views.splash.door.close();
    });

    apicaba.views.treeNodes.build();

  }).load();

});

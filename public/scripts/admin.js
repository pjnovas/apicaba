var socket = io.connect();

$(function(){

  var ready = false;

  socket.on('job_status', function(data){
    if (ready) {
      apicaba.models.job.changeStatus(data);
    }
  });

  apicaba.models.job
    .once('change', function(){
      ready = true;      
    })
    .bind();

});


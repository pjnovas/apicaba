var socket = io.connect();

$(function(){

  apicaba.models.job
    .on('bind', function(){
      socket.on('job_status', apicaba.models.job.changeStatus);
    })
    .bind();

});


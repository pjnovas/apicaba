var socket = io.connect();

$(function(){

  apicaba.models.job.bind(function(){
    apicaba.views.jobEdit.render();
    apicaba.views.jobSearch.render();

    socket.on('job_status', apicaba.models.job.changeStatus);
  });

});


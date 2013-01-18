
var apicaba = apicaba || {};
apicaba.models = apicaba.models || {};

apicaba.models.job = (function(){

  var jobModel = new apicaba.models.Model(apicaba.api.job);
  
  function changeStatus(data){
    
    for(var i = 0; i < this.collection.length; i++){
      if (this.collection[i]._id === data._id){
        this.collection[i].state = data.state;
        if (data.state === 'running')
          this.collection[i].lastRun = new Date();
        break;
      }
    }

    this.emit('change', this.collection);

    return this;
  };

  jobModel.changeStatus = function(data){
    changeStatus.call(jobModel, data);
  }

  return jobModel;

})();

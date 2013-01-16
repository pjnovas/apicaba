
var apicaba = apicaba || {};
apicaba.api = apicaba.api || {};

apicaba.api.job = (function(){
  var root = '/jobs/';

  return {
    getAll: function(done) {
      apicaba.utils.ajax.call({
        method: 'GET',
        url: root
      }, done);
    },
    get: function(id, done) {
      apicaba.utils.ajax.call({
        method: 'GET',
        url: root + id
      }, done);
    },
    new: function(job, options, done) {
      var params = {
        job: job
      };
      _.extend(params, options);

      apicaba.utils.ajax.call({
        method: 'POST',
        url: root,
        dataType: "json",
        data: params
      }, done);
    },
    update: function(job, options, done) {
      var params = {
        job: job
      };
      _.extend(params, options);

      apicaba.utils.ajax.call({
        method: 'PUT',
        url: root + job._id,
        dataType: "json",
        data: params
      }, done);
    },
    delete: function(id, done) {
      apicaba.utils.ajax.call({
        method: 'DELETE',
        url: root + id,
        dataType: "json",
      }, done);
    }
  };
})();


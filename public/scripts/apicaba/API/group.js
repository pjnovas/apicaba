
var apicaba = apicaba || {};
apicaba.api = apicaba.api || {};

apicaba.api.group = (function(){
  var root = '/grupos/';

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
    new: function(group, done) {
      apicaba.utils.ajax.call({
        method: 'POST',
        url: root,
        dataType: "json",
        data: {group: group}
      }, done);
    },
    update: function(group, done) {
      apicaba.utils.ajax.call({
        method: 'PUT',
        url: root + group._id,
        dataType: "json",
        data: {group: group}
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


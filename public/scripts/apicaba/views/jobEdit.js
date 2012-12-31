
var apicaba = apicaba || {};
apicaba.views = apicaba.views || {};

apicaba.views.jobEdit = (function($){
  var model = "jobs",
    container = '.job-form';
 
  var events = {
    "click::#save": function(e){ save(e, false); },
    "click::#save-run": function(e){ save(e, true); },
    "click::#cancel": cancel,
    "keyup::#name": showCanonical,
    "change::#group": showCanonical,
    "click::#get-preview": getPreview
  };

  function getPreview(){
    var opts = {
      lines: 7, // The number of lines to draw
      length: 0, // The length of each line
      width: 20, // The line thickness
      radius: 26, // The radius of the inner circle
      corners: 0.5, // Corner roundness (0..1)
      rotate: 39, // The rotation offset
      color: '#000', // #rgb or #rrggbb
      speed: 1.2, // Rounds per second
      trail: 57, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: 'auto', // Top position relative to parent in px
      left: 'auto' // Left position relative to parent in px
    };
    var target = document.getElementById('fields');
    var spinner = new Spinner(opts).spin(target);

    var job = buildJob();
    apicaba.models.resource.getPreview(job.source, function(){
      spinner.stop();
    });
  }

  function save(e, runNow) {
    var job = buildJob();
    apicaba.models.job.save(job, runNow);
    render();
  }

  function cancel() {
    render();
  }

  apicaba.utils.events.build(container, events);

  function showCanonical(){
    var name = $('#name', container).val(),
      group = $('#group option:selected', container).attr('data-canonical');

    name = name.toLowerCase().replace(/ /g, '-');
    $('#access', container).text('/' + group + '/' + name);
  }

  function buildJob(){
    var j = {
      _id: $('#jobId', container).val(),
      name: $('#name', container).val(),
      group: $('#group option:selected', container).attr('data-canonical'),
      cron: $('#cron', container).val(),
      source: {
        parser: $('#parser', container).val(),
        url: $('#url', container).val()
      }
    };

    if (!j._id) delete j._id;
    return j;
  }

  function render(aJob, done) {
    var job = aJob || {};
    
    apicaba.utils.template.render(model, 'jobEdit', job, 
      function(err, rendered){
        $('form', container).remove();
        $(container).html(rendered);

        $('body').scrollTop(0);
        $('#name', container).focus();

        apicaba.views.groupEdit.render(null, function(){
          apicaba.models.group.bind(function(){
            if (done) done();
          });
        });        
    });
  }

  return {
    render: render,
    updateCanonical: showCanonical
  };

})(jQuery);




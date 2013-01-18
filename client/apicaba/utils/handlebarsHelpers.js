Handlebars.registerHelper('timeAgo', function(date) {
  if (date && moment(date).isValid())
    return moment(date).fromNow();
  else 
    return "-";
});

Handlebars.registerHelper('formatDate', function(date) {
  if (date && moment(date).isValid())
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
  else 
    return "-";
});

Handlebars.registerHelper('getStatus', function(state) {
  switch(state) {
    case "running": return "warning";
    case "done": return "success";
    case "error": return "error";
    case "pending": return "info";
  }
  return '';
});
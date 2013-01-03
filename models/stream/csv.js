
var _ = require('underscore');

module.exports.getFields = function(delimiter, row){
  var header = row.split(delimiter);

  return _.map(header, function(field){
    return {
      "name": field,
      "type": "string"      
    };
  });

};

module.exports.parse = function(fields, delimiter, lines){
  var arr = [];

  for(var i = 0; i < lines.length; i++) {
    var props = lines[i].split(delimiter);

    var line = {};

    props.forEach(function(prop, index){
      line[fields[index].name] = prop;
    });

    arr.push(line);
  }

  return arr;
};



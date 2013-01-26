
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
  var arr = [],
    quotesRegEx = new RegExp(delimiter + '(?=([^\"]*\"[^\"]*\")*[^\"]*$)', 'g'),
    delimiterRegEx = new RegExp(delimiter, 'g');

  function normalize(line){
    if (line.indexOf(/"/)){
      var noDelimiter = line.replace(quotesRegEx, '-o-');
      var normalized = noDelimiter.replace(delimiterRegEx, '-x-');
      return normalized.replace(/-o-/g, delimiter).replace(/"/g, '');
    }
    else return line;
  }

  for(var i = 0; i < lines.length; i++) {
    var props = normalize(lines[i]).split(delimiter);

    var line = {};

    props.forEach(function(prop, index){
      if (fields[index])
        line[fields[index].name] = prop.replace(/-x-/g, delimiter);
    });

    arr.push(line);
  }

  return arr;
};

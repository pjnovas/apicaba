
// Parse a csv file with first line as header and return a js object

module.exports = function(str) {

  var arr = [], props = [];

  var lines = str.split('\r\n');

  var header = lines[0].split(',');

  lines.shift();
  lines.pop();

  for(var i = 0; i < lines.length; i++) {
    var props = lines[i].split(',');

    var line = {};

    props.forEach(function(prop, index){
      line[header[index]] = prop;
    });

    arr.push(line);
  }

  return arr;
};

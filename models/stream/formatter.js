
var Stream = require('stream').Stream
  , util = require('util')
  , csvParser = require('./csv')
  , _ = require('underscore');

var Formatter = module.exports = function(options) {

  Stream.call(this);
  this.writable = true;

  this.type = (options && options.type) || 'csv';
  this.delimiter = (options && options.delimiter) || ',';
  this.fields = options && options.fields;

  this.firstRead = true;
};

util.inherits(Formatter, Stream);

var buf = '';

Formatter.prototype.write = function(str) {
  str = buf + str;
  var lines = getLines(str);

  if(!/\r?\n$/.test(lines[lines.length - 1])) {
    buf = lines.pop();
  }

  try {

    if (this.firstRead){
      if (!this.fields){
        this.fields = csvParser.getFields(this.delimiter, lines[0]);
      }

      lines.shift();
      lines.pop();
      
      this.firstRead = false;
    }

    this.emit('data', csvParser.parse(this.fields, this.delimiter, lines));
  }
  catch(err){
    this.emit('error', err);
  }
};

Formatter.prototype.end = function(str) {
  this.emit('end');
};

function getLines(str){
  return str.split(/\r?\n/);
}

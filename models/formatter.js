
var request = require('superagent')
  , Stream = require('stream').Stream
  , util = require('util')
  , Xml = require('xml2js')
  , xml_parser = new Xml.Parser()
  , csv_parser = require('./csv');

var Formatter = module.exports = function(type) {

  Stream.call(this);
  this.writable = true;

  this.type = type;
};

util.inherits(Formatter, Stream);

Formatter.prototype.write = function(str) {

  if(this.type === "xml") this.formatXML(str);

  else if(this.type === "csv") this.formatCSV(str);

  else this.emit('data', str);

};

Formatter.prototype.formatXML = function(xml) {

  var self = this;
  xml_parser.parseString(xml, function(err, res) {

    self.emit('data', res);

  });

};

Formatter.prototype.formatCSV = function(csv) {

  this.emit('data', csv_parser(csv));

};

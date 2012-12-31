
var Fetcher = require('./stream/fetcher')
  , Formatter = require('./stream/formatter');

var Preview = module.exports = function (url, parser) {

  this.fetcher = new Fetcher(url, true);
  this.formatter = new Formatter(parser);
};

Preview.prototype.run = function(done) {
  var self = this;

  this.fetcher.pipe(this.formatter);

  this.formatter.on('data', function(preview){
    self.formatter.removeAllListeners('data');
    done(null, preview.splice(0, 10));
  });

  this.fetcher.fetch();
};

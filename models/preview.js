
var Fetcher = require('./stream/fetcher')
  , Formatter = require('./stream/formatter');

var Preview = module.exports = function (url, parser, delimiter) {

  this.fetcher = new Fetcher(url, true);
  this.formatter = new Formatter({ parser: parser, delimiter: delimiter});
};

Preview.prototype.run = function(done) {
  var self = this
    , data;

  this.fetcher.pipe(this.formatter);

  this.formatter.on('data', function(preview){
    self.formatter.removeAllListeners('data');
    data = preview;
  });

  this.formatter.on('end', function(){
    self.formatter.removeAllListeners('end');

    done(null, {
      fields: this.fields,
      data: data.splice(0, 10)
    });
  });

  this.fetcher.fetch();
};

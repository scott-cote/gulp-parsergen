var through = require('through2');

var PLUGIN_NAME = 'gulp-parsergen';

var doSomethingWithTheFile = function(file) {
  return file;
};

module.exports = function() {
  return through.obj(function(file, encoding, callback) {
    callback(null, doSomethingWithTheFile(file));
  });
};


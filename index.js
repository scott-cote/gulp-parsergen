var through2 = require('through2');
var ReadableStreamBuffer = require('stream-buffers').ReadableStreamBuffer;

var generator = require('parsergen').default;

var PLUGIN_NAME = 'gulp-parsergen';

module.exports = function(options) {
  return through2.obj(function(file, encoding, done) {

    if (file.isBuffer()) {
      var stream = new ReadableStreamBuffer();
      stream.put(file.contents)
      stream.stop();
      stream
        .pipe(generator(options))
        .pipe(through2(function(chunk, enc, done) {
          file.contents = chunk;
        }));
    } else if (file.isStream()) {
      file.contents = file.contents.pipe(generator(options));
    }

    done(null, file);
  });
};

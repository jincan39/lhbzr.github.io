var pkg = require('../package.json');

var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    util = require('gulp-util');

gulp.task('js', function() {
  var bundler = browserify({
    cache: {},
    packageCache: {},
    fullPaths: false,
    entries: ['./' + pkg.folders.src + '/js/main.js'],
    debug: global.isWatching
  });

  var bundle = function() {
    return bundler.bundle()
                  .pipe(source('main.js'))
                  .pipe(buffer())
                  .pipe(global.isWatching ? util.noop() : uglify())
                  .pipe(gulp.dest('./' + pkg.folders.dist + '/js'))
  };

  if (global.isWatching) {
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }

  return bundle();
});

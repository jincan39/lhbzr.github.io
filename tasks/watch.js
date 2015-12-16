var pkg = require('../package.json');

var gulp = require('gulp');

gulp.task('watch', ['sync'], function() {
  global.isWatching = true;

  gulp.watch(pkg.folders.src + '/html/**', ['html']);
  gulp.watch(pkg.folders.src + '/css/**', ['css']);
  gulp.watch(pkg.folders.src + '/img/**', ['img']);
  gulp.watch(pkg.folders.src + '/js/**', ['js']);
  gulp.watch(pkg.folders.src + '/svg/**', ['svg']);
});

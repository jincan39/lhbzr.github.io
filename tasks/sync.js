var pkg = require('../package.json'),
    gulp = require('gulp'),
    browser = require('browser-sync');

gulp.task('sync', function() {
  browser.init(pkg.folders.dist + '/**', {
    server: {
      baseDir: ''
    }
  });
});

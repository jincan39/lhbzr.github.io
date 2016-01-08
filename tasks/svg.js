var pkg = require('../package.json'),
    gulp = require('gulp'),
    svgstore = require('gulp-svgstore');

gulp.task('svg', function() {
  gulp.src(pkg.folders.src + '/svg/*.svg')
      .pipe(svgstore())
      .pipe(gulp.dest(pkg.folders.dist + '/svg'));
});

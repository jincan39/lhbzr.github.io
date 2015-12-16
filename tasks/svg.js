var pkg = require('../package.json');

var gulp = require('gulp'),
    svgstore = require('gulp-svgstore');

gulp.task('svg', function() {
  return gulp.src(pkg.folders.src + '/svg/*.svg')
             .pipe(svgstore())
             .pipe(gulp.dest(pkg.folders.dist + '/svg'))
             .pipe(browserSync.reload());
});

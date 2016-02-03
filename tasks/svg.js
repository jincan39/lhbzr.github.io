var pkg = require('../package.json')
var gulp = require('gulp')
var svgstore = require('gulp-svgstore')

gulp.task('svg', function () {
  gulp
    .src(pkg.folders.src + '/svg/*.svg')
    .pipe(svgstore())
    .pipe(gulp.dest(pkg.folders.dist + '/svg'))
})

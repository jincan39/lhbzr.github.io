var pkg = require('../package.json');

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cmq = require('gulp-combine-media-queries'),
    minify = require('gulp-minify-css');

gulp.task('css', function() {
  return gulp.src(pkg.folders.src + '/css/main.scss')
             .pipe(sass())
             .pipe(autoprefixer('last 40 versions', 'ie >= 8', 'ff >= 3', 'safari >= 4', 'opera >= 12', 'chrome >= 4'))
             //.pipe(cmq())
             .pipe(minify())
             .pipe(gulp.dest(pkg.folders.dist + '/css'));
});

var pkg = require('../package.json');

var gulp = require('gulp');

gulp.task('build', ['html', 'css', 'js', 'img', 'svg']);

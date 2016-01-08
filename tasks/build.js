var pkg = require('../package.json'),
    gulp = require('gulp');

gulp.task('build', ['html', 'css', 'js', 'img', 'svg']);

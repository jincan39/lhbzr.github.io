import pkg from '../package.json'

import gulp from 'gulp'

gulp.task('watch', ['sync'], () => {
  global.isWatching = true

  gulp.watch(`${pkg.folders.src}/html/**`, ['html'])
  gulp.watch(`${pkg.folders.src}/css/**`, ['css'])
  gulp.watch(`${pkg.folders.src}/img/**`, ['img'])
  gulp.watch(`${pkg.folders.src}/js/**`, ['js'])
  gulp.watch(`${pkg.folders.src}/svg/**`, ['svg'])
})

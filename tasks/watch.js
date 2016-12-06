const pkg = require('../package.json')
const gulp = require('gulp')
const browser = require('browser-sync')

gulp.task('watch', ['sync'], () => {
  global.isWatching = true

  gulp.watch(`${pkg.folders.src}/html/**`, ['html'])
  gulp.watch(`${pkg.folders.src}/css/**`, ['css'])
  gulp.watch(`${pkg.folders.src}/img/**`, ['img'])
  gulp.watch(`${pkg.folders.src}/js/**`, ['js'])
  gulp.watch(`${pkg.folders.src}/svg/**`, ['svg'])

  gulp.watch(`*.html`).on('change', browser.reload)
  gulp.watch(`${pkg.folders.dist}/js/**`).on('change', browser.reload)
  gulp.watch(`${pkg.folders.dist}/svg/**`).on('change', browser.reload)
})

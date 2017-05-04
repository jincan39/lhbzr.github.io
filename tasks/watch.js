const pkg = require('../package.json')
const gulp = require('gulp')
const browser = require('browser-sync')

gulp.task('watch', ['sync'], () => {
  global.isWatching = true

  gulp.watch('./assets/views/**', ['views'])
  gulp.watch('./assets/styles/**', ['styles'])
  gulp.watch('./assets/images/**', ['images'])
  gulp.watch('./assets/scripts/**', ['scripts'])
  gulp.watch('./assets/sprites/**', ['sprites'])

  gulp.watch('*.html').on('change', browser.reload)
  gulp.watch('./scripts/**').on('change', browser.reload)
  gulp.watch('./sprites/**').on('change', browser.reload)
})

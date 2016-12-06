const gulp = require('gulp')
const browser = require('browser-sync')

gulp.task('sync', () => {
  browser.init({
    server: {
      baseDir: ''
    }
  })
})

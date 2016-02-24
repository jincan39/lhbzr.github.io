import pkg from '../package.json'

import gulp from 'gulp'

import browser from 'browser-sync'

gulp.task('sync', () => {
  browser.init(`${pkg.folders.src}/**`, {
    server: {
      baseDir: ''
    }
  })
})

import pkg from '../package.json'

import gulp from 'gulp'

import browserify from 'browserify'
import babelify from 'babelify'
import watchify from 'watchify'
import uglify from 'gulp-uglify'

import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'

import util from 'gulp-util'

gulp.task('js', () => {
  var bundler = browserify({
    cache: {},
    debug: global.isWatching,
    entries: [`./${pkg.folders.src}/js/main.js`],
    fullPaths: false,
    packageCache: {}
  }).transform(babelify.configure({
    presets: ['es2015']
  }))

  var bundle = () => {
    bundler
      .bundle()
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(global.isWatching ? util.noop() : uglify())
      .pipe(gulp.dest(`./${pkg.folders.dist}/js`))
  }

  if (global.isWatching) {
    bundler = watchify(bundler)
    bundler.on('update', bundle)
  }

  return bundle()
})

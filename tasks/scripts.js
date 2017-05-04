const pkg = require('../package.json')
const gulp = require('gulp')
const browserify = require('browserify')
const babelify = require('babelify')
const watchify = require('watchify')
const uglify = require('gulp-uglify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const util = require('gulp-util')

gulp.task('scripts', () => {
  var bundler = browserify({
    cache: {},
    debug: global.isWatching,
    entries: ['./assets/scripts/main.js'],
    fullPaths: false,
    packageCache: {}
  }).transform(babelify.configure({
    compact: false,
    presets: ['es2015']
  }))

  var bundle = () => {
    bundler
      .bundle()
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(global.isWatching ? util.noop() : uglify())
      .pipe(gulp.dest('./scripts'))
  }

  if (global.isWatching) {
    bundler = watchify(bundler)
    bundler.on('update', bundle)
  }

  return bundle()
})

const pkg = require('../package.json')

const gulp = require('gulp')

const browserify = require('browserify')
const babelify = require('babelify')
const watchify = require('watchify')
const uglify = require('gulp-uglify')

const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')

const util = require('gulp-util')

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

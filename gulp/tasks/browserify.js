'use strict';

var gulp = require('gulp'),
  rename = require('gulp-rename'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  bundleLogger = require('../util/bundleLogger'),
  handleErrors = require('../util/handleErrors'),
  source = require('vinyl-source-stream');

gulp.task('browserify', function () {
  var dest = './example',
    bundler = browserify({
      cache: {},
      packageCache: {},
      fullPaths: true,
      entries: ['./example/_app.js'],
      debug: true
    }),
    bundle = function () {
      bundleLogger.start();

      return bundler
        .bundle()
        .on('error', handleErrors)
        .pipe(source('example/_app.js'))
        .pipe(rename('app.js'))
        .pipe(gulp.dest(dest))
        .on('end', bundleLogger.end);
    };

  bundler = watchify(bundler);
  bundler
    .on('update', bundle)
    .on('error', handleErrors);

  return bundle();
});

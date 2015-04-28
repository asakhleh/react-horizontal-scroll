'use strict';

var browserSync = require('browser-sync'),
  gulp = require('gulp');

gulp.task('browserSync', ['browserify'], function () {
  browserSync.init(['example/**'], {
    port: 5200,
    server: {
      baseDir: 'example'
    }
  });
});

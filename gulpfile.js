'use strict';

var gulp = require('gulp');
var stylish = require('jshint-stylish');
var plugins = require('gulp-load-plugins')();

gulp.task('connect', function () {
  plugins.connect.server({
    port: 3000,
    root: ['bower_components', 'src', 'app'],
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('app/**/*.html')
    .pipe(plugins.changed('html'))
    .pipe(plugins.connect.reload());
});

gulp.task('jshint', function () {
  gulp.src(['app/**/*.js', 'src/sortable.js'])
    .pipe(plugins.changed('scripts'))
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(stylish))
    .pipe(plugins.connect.reload());
});

gulp.task('less', function () {
  gulp.src('app/app.less')
    .pipe(plugins.less())
    .pipe(plugins.autoprefixer('last 2 version'))
    .pipe(gulp.dest('app'))
    .pipe(plugins.connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['app/**/*.less'], ['less']);
  gulp.watch(['app/**/*.html'], ['html']);
  gulp.watch(['app/**/*.js', 'src/sortable.js'], ['jshint']);
});

gulp.task('default', ['connect', 'less', 'jshint', 'watch']);

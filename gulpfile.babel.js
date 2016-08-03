'use strict';

import gulp from 'gulp';
import stylish from 'jshint-stylish';
import gulpLoadPlugins from 'gulp-load-plugins';

const plugins = gulpLoadPlugins();

const path = {
  app: './app',
  src: './src',
  dest: './dest'
};

gulp.task('connect', () => {
  plugins.connect.server({
    port: 3000,
    root: ['bower_components', 'src', 'app'],
    livereload: true
  });
});

gulp.task('html', () => {
  gulp.src(`${path.app}/index.html`)
    .pipe(plugins.connect.reload());
});


gulp.task('jshint', () => {
  gulp.src([`${path.app}/**/*.js`, `${path.src}/sortable.js`])
    .pipe(plugins.changed('scripts'))
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(stylish));
});

gulp.task('watch', () => {
  gulp.watch([`${path.app}/index.html`], ['html']);
  gulp.watch([`${path.app}/**/*.js`, `${path.src}/sortable.js`], ['jshint']);
});

gulp.task('default', ['connect', 'jshint', 'watch']);

'use strict';

var gulp = require('gulp');
var merge = require('event-stream').merge;
var series = require('stream-series');
var stylish = require('jshint-stylish');
var plugins = require('gulp-load-plugins')();
var options = require('minimist')(process.argv.slice(2));
var dependencies = [
  'bower_components/angular/angular.min.js',
  'bower_components/highlightjs/highlight.pack.min.js',
  'bower_components/highlightjs/styles/solarized_dark.css'
];

function isValidType(bump) {
  return bump === 'patch' || bump === 'minor' || bump === 'major';
}

gulp.task('build', ['uglify', 'cleanCss', 'dependencies'], function () {
  gulp.src('app/images/logo.svg')
    .pipe(gulp.dest('build/images'));

  var orderedStream = series([
    gulp.src('build/dependencies/angular.min.js'),
    gulp.src('build/dependencies/!(angular.min.js)'),
    gulp.src('build/*.{js,css}')
  ]);

  gulp.src('./app/index.html')
    .pipe(plugins.inject(orderedStream, {ignorePath: 'build', addRootSlash: false}))
    .pipe(gulp.dest('build'));
});

gulp.task('bump', function () {
  if(isValidType(options.bump)) {
    return gulp.src(['bower.json', 'package.json'])
      .pipe(plugins.bump({type: options.bump}))
      .pipe(gulp.dest('.'));
  }
});

gulp.task('cleanCss', ['less'], function () {
  return gulp.src('app/app.css')
    .pipe(plugins.cleanCss())
    .pipe(plugins.concat('app.min.css'))
    .pipe(gulp.dest('build'));
});

gulp.task('connect', function () {
  return plugins.connect.server({
    port: 3000,
    host: '0.0.0.0',
    root: ['bower_components', 'src', 'app'],
    livereload: true
  });
});

gulp.task('deploy', ['build'], function () {
  gulp.src('build/**/*')
    .pipe(plugins.ghPages());
});

gulp.task('distribute', ['wrap'], function () {
  return gulp.src('dist/sortable.js')
    .pipe(plugins.uglify())
    .pipe(plugins.concat('sortable.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
  return gulp.src('app/**/*.html')
    .pipe(plugins.changed('html'))
    .pipe(plugins.connect.reload());
});

gulp.task('inject', ['less'], function () {
  var options = {
    ignorePath: ['bower_components', 'src', 'app'],
    addRootSlash: false
  };

  var orderedStream = series([
    gulp.src(dependencies),
    gulp.src('src/sortable.js'),
    gulp.src('app/**/*.{js,css}')
  ]);

  gulp.src('./app/index.html')
    .pipe(plugins.inject(orderedStream, options))
    .pipe(gulp.dest('app'));
});

gulp.task('jshint', function () {
  return gulp.src(['app/**/*.js', 'src/sortable.js'])
    .pipe(plugins.changed('scripts'))
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(stylish))
    .pipe(plugins.connect.reload());
});

gulp.task('less', function () {
  return gulp.src('app/app.less')
    .pipe(plugins.less())
    .pipe(plugins.autoprefixer('last 2 version'))
    .pipe(gulp.dest('app'))
    .pipe(plugins.connect.reload());
});

gulp.task('uglify', function () {
  var templateStream = gulp.src('app/**/!(index).html')
    .pipe(plugins.ngHtml2js({moduleName: 'blvd'}));

  var javaScriptStream = gulp.src('app/**/*.js')
    .pipe(plugins.ngAnnotate());

  return merge(javaScriptStream, templateStream)
    .pipe(plugins.concat('app.min.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.replace(/(?!^)('|")use strict\1;|('|")ngInject\2;/g, ''))
    .pipe(gulp.dest('build'));
});

gulp.task('dependencies', ['distribute'], function () {
  return gulp.src(dependencies.concat('dist/sortable.min.js'))
    .pipe(gulp.dest('build/dependencies'));
});

gulp.task('wrap', ['bump'], function () {
  return gulp.src('src/sortable.js')
    .pipe(plugins.wrap({src: 'wrap.txt'}, require('./package.json'), {parse: false}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
  gulp.watch(['app/**/*.less'], ['less']);
  gulp.watch(['app/**/*.html'], ['html']);
  gulp.watch(['app/**/*.js', 'src/sortable.js'], ['jshint']);
});

gulp.task('default', ['connect', 'inject', 'jshint', 'watch']);

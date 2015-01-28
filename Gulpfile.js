'use strict';
var gulp    = require('gulp');
var eslint  = require('gulp-eslint');
var stylus  = require('gulp-stylus');
var nodemon = require('gulp-nodemon');

var buffer     = require('vinyl-buffer');
var source     = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify   = require('reactify');
var uglify     = require('gulp-uglify');
var react      = require('gulp-react');

var paths = {
  app: './server/app.js',
  entrypoint: './app/app.js',
  scripts: './app/**/*.js',
  style: './styles/app.styl',
  styles: './styles/**/*.styl',
  public: './public/'
};

gulp.task('lint', function() {
  return gulp.src([paths.scripts, paths.app])
    .pipe(react())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('serve', function() {
  nodemon({
    script: paths.app,
    ignore: ['./**/*.*'] // Don't reaload on change
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
});

gulp.task('styles', function() {
  gulp.src(paths.style)
    .pipe(stylus())
    .pipe(gulp.dest('./public/'));
});

gulp.task('scripts', function() {
  var bundler = browserify(paths.entrypoint);

  return bundler
    .transform(reactify)
    .bundle()
    .pipe(source('app.js')) // output in public as app.js
    .pipe(buffer())
    .pipe(gulp.dest(paths.public));
});

gulp.task('build', ['styles', 'scripts']);
gulp.task('dev', ['lint', 'styles', 'scripts', 'serve', 'watch']);
gulp.task('default', ['dev']);
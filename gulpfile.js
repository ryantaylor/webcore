'use strict';

var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var uglify = require( 'gulp-uglify' );
var rename = require( 'gulp-rename' );
var logger = require( 'gulp-logger' );

gulp.task( 'default', ['build', 'watch'] );

gulp.task( 'build', ['sass', 'uglify'] );

gulp.task( 'watch', ['sass:watch', 'uglify:watch'] );

gulp.task( 'sass', function () {
  gulp.src( 'style/main.scss' )
      .pipe( logger({
        before: 'compiling scss...',
        after: 'scss compile complete',
        extname: '.min.css',
        display: 'name',
        showChange: true
      }) )
      .pipe( sass( { outputStyle: 'compressed' } ).on( 'error', sass.logError ) )
      .pipe( rename( 'main.min.css' ) )
      .pipe( gulp.dest( 'static/css' ) );
});

gulp.task( 'sass:watch', function () {
  gulp.watch( 'style/**/*.scss', ['sass'] );
});

gulp.task( 'sass:debug', function () {
  gulp.src( 'style/main.scss' )
      .pipe( logger({
        before: '[debug] compiling scss...',
        after: '[debug] scss compile complete',
        extname: '.css',
        display: 'name',
        showChange: true
      }) )
      .pipe( sass( { outputStyle: 'nested' } ).on( 'error', sass.logError ) )
      .pipe( rename( 'main.css' ) )
      .pipe( gulp.dest( 'static/css' ) );
});

gulp.task( 'uglify', function () {
  gulp.src( 'scripts/val.js' )
      .pipe( logger({
        before: 'minifying js...',
        after: 'js minify complete',
        extname: '.min.js',
        display: 'name',
        showChange: true
      }) )
      .pipe( uglify() )
      .pipe( rename( 'val.min.js' ) )
      .pipe( gulp.dest( 'static/js' ) );
});

gulp.task( 'uglify:watch', function () {
  gulp.watch( 'scripts/val.js', ['uglify'] );
});

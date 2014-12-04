'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    historyApiFallback = require('connect-history-api-fallback'),
    inject = require('gulp-inject'),
    wiredep = require('wiredep').stream,
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

// Servidor web de desarrollo
gulp.task('server', function() {
    connect.server({
        root: './public',
        hostname: '0.0.0.0',
        port: 8080,
        livereload: true,
        middleware: function(connect, opt) {
             return [ historyApiFallback ];
        }
    });
});

// Busca errores en el JS y nos los muestra por pantalla
gulp.task('jshint', function() {
  return gulp.src(['./public/js/**/*.js', '!./public/js/min/all*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

// Preprocesa archivos Stylus a CSS y recarga los cambios
gulp.task('css', function() {
  gulp.src('./public/stylesheets/main.styl')
    .pipe(stylus({ use: nib() }))
    .pipe(gulp.dest('./public/stylesheets'))
    .pipe(connect.reload());
});

// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
  gulp.src('./public/**/*.html')
    .pipe(connect.reload());
});

// Busca en las carpetas de estilos y javascript los archivos que hayamos creado
// para inyectarlos en el index.html
gulp.task('inject', function() {
  var sources = gulp.src(['./public/js/min/*.min.js','./public/stylesheets/**/*.css']);
  return gulp.src('index.html', {cwd: './public'})
    .pipe(inject(sources, {
      read: false,
      ignorePath: '/public'
    }))
    .pipe(gulp.dest('./public'));
});

// Inyecta las librerias que instalemos vÃ­a Bower
gulp.task('wiredep', function () {
  gulp.src('./public/index.html')
    .pipe(wiredep({
    directory: './public/lib'
    }))
  .pipe(gulp.dest('./public'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('./public/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./public/js/min/'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/min/'));
});

// Vigila cambios que se produzcan en el cÃ³digo
// y lanza las tareas relacionadas
gulp.task('watch', function() {
  gulp.watch(['./public/**/*.html'], ['html']);
  gulp.watch(['./public/stylesheets/**/*.styl'], ['css']);
  gulp.watch(['./public/js/**/*.js', './Gulpfile.js', '!./public/js/min/all*.js'], ['jshint']);
  gulp.watch(['./public/stylesheets/**/*.styl'], ['css', 'inject']);
  gulp.watch(['./public/js/**/*.js', './Gulpfile.js', '!./public/js/min/all*.js'], ['inject']);
  gulp.watch(['./bower.json'], ['wiredep']);
  gulp.watch(['./public/js/*.js'], ['wiredep']);
  gulp.watch(['./public/js/*.js'], ['scripts']);
});

gulp.task('default', ['server', 'inject','wiredep', 'watch']);


var gulp = require('gulp');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var es6ify = require('es6ify');
var gutil = require('gulp-util');
var tmp = '.tmp';

// error log for browserify
var errLog = function (err) {
  if (err) {
    gutil.log(err.toString());
  }
};

// Connect
gulp.task('connect', function () {
  connect.server({
    root: [tmp, 'app'],
    port: 9000,
    livereload: true,
    fallback: 'index.html'
  });
});

// Styles
gulp.task('html', function () {
    return gulp.src('app/*.html')
      .pipe(gulp.dest(tmp + '/'));
});

// Styles
gulp.task('styles', function () {
    return gulp.src('app/styles/**/*.css')
      .pipe(gulp.dest(tmp + '/styles/'));
});

//Script
gulp.task('es6runtime', function(){
    return gulp.src(es6ify.runtime)
      .pipe(gulp.dest(tmp + '/scripts/'));
});
gulp.task('browserify', ['es6runtime'], function(){
    return gulp.src('app/scripts/main.js', {read: false})
      .pipe(browserify({
        transform: ['es6ify'],
        debug: true
      }))
      .on('error', errLog)
      .pipe(rename('build.js'))
      .pipe(gulp.dest(tmp + '/scripts/'))
});

// Watch
gulp.task('watch', ['connect'], function () {
    // Watch for changes in `app` folder
    gulp.watch([
        'app/*.html',
        'app/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/images/**/*'
    ], function(event) {
        return gulp.src(event.path)
            .pipe(connect.reload());
    });

    // Watch .css files
    gulp.watch('app/styles/**/*.css', ['styles']);
    gulp.start('styles');

    // Watch .js files
    gulp.watch('app/scripts/**/*.js', ['browserify']);
    gulp.start('browserify');

    // Watch image files
    gulp.watch('app/images/**/*', ['images']);

    gulp.watch('app/*.html', ['html']);
    gulp.start('html');

});

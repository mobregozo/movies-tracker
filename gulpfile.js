'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');

gulp.task('server', function() {
	connect.server({
	root: 'app',
	port: 8000,
	livereload: true
	});
});

 
gulp.task('html', function () {
  gulp.src('app/views/**/*.html')
    .pipe(connect.reload());
});
 
gulp.task('sass', function () {
  return gulp.src('app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css/'))
    .pipe(connect.reload());
}); 

gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.scss', ['sass'])	
	gulp.watch(['app/*.html'], ['html']);
	gulp.watch(['app/views/**/*.html'], ['html']);
})

gulp.task('default', ['server','sass', 'watch'])
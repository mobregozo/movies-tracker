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
		// middleware: function(connect, o) {
		// 	return [(function() {
		// 		var url = require('url');
		// 		var proxy = require('proxy-middleware');
		// 		var options = url.parse('https://ec2-54-191-9-10.us-west-2.compute.amazonaws.com:8443/movie-tracker');
		// 		options.route = '/api';
		// 		return proxy(options);
		// 	})()];
		// }
	});
});


gulp.task('html', function() {
	gulp.src('app/views/**/*.html')
		.pipe(connect.reload());
});

gulp.task('sass', function() {
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

gulp.task('default', ['server', 'sass', 'watch'])
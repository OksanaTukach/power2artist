module.exports = function() {
	$.gulp.task('all-font:dev', () => {
		return $.gulp.src('./dev/libs/fonts/**/*.*')
			.pipe($.gulp.dest('./build/libs/fonts/'));
	});
	$.gulp.task('all-font-gif:dev', () => {
		return $.gulp.src('./dev/libs/*.gif')
			.pipe($.gulp.dest('./build/libs/'));
	});

};

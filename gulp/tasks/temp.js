module.exports = function() {
	$.gulp.task('temp', () => {
		return $.gulp.src('./dev/temp/**/**')
			.pipe($.gulp.dest('./build/temp/'))
			.on('end', $.browserSync.reload);
	});
}
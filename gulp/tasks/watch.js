module.exports = function () {
	$.gulp.task('watch', function () {
		$.gulp.watch('./dev/pug/**/*.pug', $.gulp.series('pug'));
		$.gulp.watch('./dev/sass/**/*.scss', $.gulp.series('sass:dev'));
		$.gulp.watch('./dev/img/svg/*.svg', $.gulp.series('svg'));
		$.gulp.watch('./dev/img/**/*.{png,jpg,gif,svg}', $.gulp.series('img:dev'));
		$.gulp.watch('./dev/libs/**/*.{css,js}', $.gulp.series('libs-сss:dev', 'libs-all-сss:dev','libs-js:dev', 'libs-all-js:dev', ));
		$.gulp.watch('./dev/js/**/*.js', $.gulp.series('js:copy:dev'));
	});
};
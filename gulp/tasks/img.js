var imagemin = require('gulp-imagemin');

module.exports = function() {
    $.gulp.task('img:dev', () => {
        return $.gulp.src('./dev/img/**/*.{png,jpg,gif,svg}')
            .pipe($.gulp.dest('./build/img/'))
			.pipe(
					$.browserSync.reload({
						stream: true,
					}),
				);
	});

	$.gulp.task('svg:copy', () => {
		return $.gulp.src('./dev/img/**/*.svg')
			.pipe($.gulp.dest('./build/img/'));
	});

	$.gulp.task('img:build', () => {
		return $.gulp.src('./dev/img/**/*.{png,jpg,gif,svg}')
			.pipe(imagemin())
			.pipe($.gulp.dest('./build/img/'))
			.pipe(
					$.browserSync.reload({
						stream: true,
					}),
				);
	});

};

const include = require('gulp-include');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

module.exports = function () {

	$.gulp.task('js:copy:dev', () => {
		return $.gulp
			.src(['./dev/js/*.js'])
			.pipe(
				include({
					includePaths: [
						__dirname + '/../../node_modules',
						__dirname + '/../../dev/js',
						__dirname + '/../../dev/js/libs'
					],
				}),
			)
			.pipe(babel({
				presets: ['@babel/env']
			}))
			.pipe($.gulp.dest('./build/js/'))
			.pipe(
				$.browserSync.reload({
					stream: true,
				}),
			);
	});

	$.gulp.task('libs-js:dev', () => {
		return $.gulp
			.src(['./dev/libs/libsMin/*.js'])
			.pipe(uglify())
			.pipe(concat('libs.min.js'))
			.pipe($.gulp.dest('./build/libs/'))
			.pipe(
				$.browserSync.reload({
					stream: true,
				}),
			);
	});

	$.gulp.task('libs-all-js:dev', () => {
		return $.gulp
			.src(['./dev/libs/*.js'])
			.pipe($.gulp.dest('./build/libs/'))
			.pipe(
				$.browserSync.reload({
					stream: true,
				}),
			);
	});





	$.gulp.task('js:copy:build', () => {
		return $.gulp
			.src('./dev/js/*.js')
			.pipe(
				include({
					includePaths: [
						__dirname + '/../../node_modules',
						__dirname + '/../../dev/js'
					],
				}),
			)
			.pipe(babel({
				presets: ['@babel/env']
			}))
			.pipe(uglify())
			.pipe($.gulp.dest('./build/js/'))
			.pipe(
				$.browserSync.reload({
					stream: true,
				}),
			)
			.pipe(concat('main.min.js'))
			.pipe(uglify())
			.pipe(
				$.browserSync.reload({
					stream: true,
				}),
			);
	});

	$.gulp.task('libs-js:copy:build', () => {
		return $.gulp
			.src(['./dev/libs/libsMin/*.js'])
			.pipe(uglify())
			.pipe(concat('libs.min.js'))
			.pipe($.gulp.dest('./build/libs'))
			.pipe(
				$.browserSync.reload({
					stream: true,
				}),
			);
	});

	$.gulp.task('libs-all-js:build', () => {
		return $.gulp
			.src('./dev/libs/*.js')
			.pipe(uglify())
			.pipe($.gulp.dest('./build/libs'))
			.pipe(
				$.browserSync.reload({
					stream: true,
				})
			)
	});
};
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');

module.exports = function () {

	$.gulp.task('sass:dev', () => {
		return $.gulp.src('./dev/sass/main.scss')
			.pipe($.gp.sourcemaps.init({loadMaps: true}))
			.pipe($.gp.sass({
				'include css': true,
				'sourceComments': true,
				'outputStyle': 'expanded',
				'sourceMap': true
			}))

			.on('error', $.gp.notify.onError(function (error) {
				return {
					title: 'Sass',
					message: error.message
				};
			}))

			.pipe($.gp.autoprefixer({
				browsers: ['last 10 version']
			}))
			.pipe($.gp.sourcemaps.write())
			.pipe($.gulp.dest('./build/css/'))
			.pipe($.browserSync.reload({
				stream: true
			}));
	});

	$.gulp.task('libs-сss:dev', () => {
		return $.gulp
			.src(['./dev/libs/libsMin/*.css'])
			.pipe(cssmin())
			.pipe(concatCss("libs.min.css"))
			.pipe($.gulp.dest('./build/libs/'))
	});

	$.gulp.task('libs-all-сss:dev', () => {
		return $.gulp
			.src(['./dev/libs/*.css'])
			.pipe($.gulp.dest('./build/libs/'))
	});




	
	$.gulp.task('libs-css:build', () => {
		return $.gulp
			.src('./dev/libs/libsMin/*.css')
			.pipe(concatCss('libs.min.css'))
			.pipe(cssmin())
			.pipe($.gulp.dest('./build/libs'))
	});

	$.gulp.task('libs-all-сss:build', () => {
		return $.gulp
			.src(['./dev/libs/*.css'])
			.pipe($.gulp.dest('./build/libs/'))
	});

	$.gulp.task('sass:build', () => {
		return $.gulp.src('./dev/sass/main.scss')
			.pipe($.gp.sass({
				'include css': true,
				'outputStyle': 'compressed'
			}))
			.on('error', $.gp.notify.onError(function (error) {
				return {
					title: 'Sass',
					message: error.message
				};
			}))
			.pipe($.gp.autoprefixer({
				browsers: ['last 10 version']
			}))
			.pipe($.gulp.dest('./build/css/'));
	});

};
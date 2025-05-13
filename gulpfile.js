global.$ = {
    path: {
        task: require('./gulp/paths/tasks.js')
    },
	gulp: require('gulp'),
    del: require('del'),
    fs: require('fs'),
    browserSync: require('browser-sync').create(),
    gp: require('gulp-load-plugins')()
};

$.path.task.forEach(function(taskPath) {
    require(taskPath)();
});

$.gulp.task('dev', $.gulp.series(
	'clean',
	$.gulp.parallel(
		'pug',
		'sass:dev',
		'js:copy:dev',
		'svg',
		'svg:copy',
		'img:dev',
		'fonts',
		'libs-js:dev',
		'libs-сss:dev',
		'libs-all-сss:dev',
		'libs-all-js:dev',
		'temp',
	),
	$.gulp.parallel(
        'watch',
        'serve'
    )
));

$.gulp.task('build', $.gulp.series(
	'clean',
	'pug',
	'sass:build',
	'libs-css:build',
	'libs-all-сss:build',
	'js:copy:build',
	'libs-js:copy:build',
	'libs-all-js:build',
	'fonts',
	'svg',
	'svg:copy',
	'img:build',
	'temp',
));

$.gulp.task('default', $.gulp.series(
    'dev',
    $.gulp.parallel(
        'watch',
        'serve'
    )
));
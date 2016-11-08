global.hostname = "localhost";

var gulp 				= require('gulp'),
	 sass 				= require('gulp-sass'),
	 autoprefixer 		= require('gulp-autoprefixer'),
	 minifycss		 	= require('gulp-minify-css'),
 	 rename 				= require('gulp-rename'),
 	 express 			= require('express'),
 	 connect_lr			= require('connect-livereload'),
 	 tinylr 				= require('tiny-lr')(),
 	 path_var			= require('path'),
 	 node_bourbon		= require('node-bourbon');


gulp.task('express', function() {
	var app = express();
	app.use(connect_lr({port: 35729}));
	app.use(express.static(__dirname + '/src'));
	app.listen('80', hostname);
});

gulp.task('livereload', function() {
	tinylr.listen(35729);
});

function notifyLiveReload(event) {
	var fileName = path_var.relative(__dirname, event.path);
	tinylr.changed({
		body: {
			files: [fileName]
		}
	});
}

gulp.task('styles', function () {
	gulp.src('src/sass/*.sass')
	.pipe(sass({includePaths: node_bourbon.includePaths})
		.on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 15 versions'],
		cascade: false
	}))
	.pipe(gulp.dest('src/css'));
});

gulp.task('renameMinStyles', function () {
	gulp.src('src/css/*.css')
	.pipe(rename({suffix: '.min'}))
	.pipe(minifycss())
	.pipe(gulp.dest('src/css'));
});

gulp.task('watch', function() {
	gulp.watch('src/sass/*.sass', ['styles']);
	gulp.watch('src/css/*.css', notifyLiveReload);
	gulp.watch('src/*.html', notifyLiveReload);
});

gulp.task('default', ['styles', 'express', 'livereload', 'watch'], function() {

});

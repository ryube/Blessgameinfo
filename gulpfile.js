
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var rev = require('gulp-rev-mtime');
var livereload = require('gulp-livereload');

var src = 'public/src';
var dist = 'public/dist';

var paths = {
	img: src + '/img/**/*',
	js: src + '/js/*.js',
	css: src + '/css/*.css',
	scss: src + '/scss/*.scss',
	html: src + '/**/*.html'
};

require('gulp-stats')(gulp);

// 서버 실행
gulp.task('server', function () {
	return gulp.src(dist + '/')
		.pipe(webserver({
			port: 8000
		}));
});

//Js 압축
gulp.task('compress-js', function () {
	return gulp.src([
			paths.js,
			'!public/src/js/leaflet.js',
			'!public/src/js/leaflet-src.js',
			'!public/src/js/TweenMax.min.js',
			'!public/src/js/jquery-1.11.3.min.js',
			'!public/src/js/idangerous.swiper.min.js',
			'!public/src/js/plugin/*.js'
			])
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest(dist+'/js'));
});

// 이미지 압축
gulp.task('compress-img', () => {
    return gulp.src(paths.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            optimizationLevel: 5
        }))
        .pipe(gulp.dest(dist+'/img'));
});

gulp.task('compress-css', function () {
		gulp.src([
			paths.css,
			'!public/src/css/comment.css',
			'!public/src/css/animate.css',
			'!public/src/css/media.css'
			])
		.pipe(concat('gameinfo.css'))
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(dist+'/css'));
});

//html 압축
gulp.task('compress-html', function() {
  return gulp.src([
  		paths.html,
  		'!public/src/html/잡다/*.html',
  	])
    .pipe(htmlmin({
    	minifyJS: true
    }))
    .pipe(rev({
  		 'cwd': dist+'/dist'
  	}))
    .pipe(gulp.dest(dist+'/'));
});

gulp.task('watch', function () {
	livereload.listen();
	gulp.watch(paths.js, ['compress-js']);
	gulp.watch(paths.html, ['compress-html']);
	gulp.watch(paths.css, ['compress-css']);
	gulp.watch(dist + '/**').on('change', livereload.changed);
});

//... 

gulp.task('default', ['compress-css', 'compress-js', 'compress-html', 'server',  'watch']);

//, 'server',  'watch' , 'compress-img'
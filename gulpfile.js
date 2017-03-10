// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var	postcss = require('gulp-postcss');

var path = {
    watch: {
        js: './app/js/**/*.js',
        html: './app/views/**/*.html',
        scss: './app/styles/components/*.scss',
        index: './app/index.html'
    },
    dest: {
        scss: './app/styles/',
        root: './dist',
        css: './dist/styles/',
        js: './dist/js',
        html: './dist/views/',
        fonts: 'dist/fonts'
    },
    src: {
        scss: './app/styles/style.scss',
        css: './app/styles/style.css',
        js: './app/js/**/*.js',
        html: './app/views/**/*.html',
        fonts: './app/fonts/**',
        json: './app/*.json'
    }
};

// tasks
gulp.task('lint', function() {
  gulp.src(path.src.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('minify-css', function () {
    var opts = {comments:true,spare:true};
  	gulp.src(path.src.css)
		.pipe(minifyCSS(opts))
    	.pipe(gulp.dest(path.dest.css))
});
gulp.task('minify-js', function() {
  	gulp.src(path.src.js)
		.pipe(uglify())
    	.pipe(gulp.dest(path.dest.js))
});
gulp.task('copy-bower-components', function () {
  	gulp.src('./app/bower_components/**')
    	.pipe(gulp.dest('dist/bower_components'));
});
gulp.task('copy-html-files', function () {
  	gulp.src('./app/**/*.html')
    	.pipe(gulp.dest('./dist/'));
});
gulp.task('copy-json-file', function () {
    gulp.src(path.src.json)
        .pipe(gulp.dest('dist/'));
});
gulp.task('copy-fonts', function () {
  	gulp.src(path.src.fonts)
    	.pipe(gulp.dest(path.dest.fonts));
});
gulp.task('watch-sass', function () {
    var processors = [
        autoprefixer({browsers: ['> 1%']})
    ];
    gulp.src(path.src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest(path.dest.scss))
        .pipe(connect.reload());
});
gulp.task('reconnect', function () {
    connect.reload();
});
gulp.task('watch', function() {
    gulp.watch([path.watch.scss], ['watch-sass']);
    gulp.watch([path.watch.html, path.watch.js, path.watch.index], ['reconnect']);
});
gulp.task('connect', function () {
    connect.server({
        root: 'app',
        livereload: true,
        port: 8888
    });
});
gulp.task('connectDist', function () {
    connect.server({
        root: path.dest.root,
        port: 9999
    });
});

// default task
gulp.task('default', ['lint', 'watch', 'connect']);
gulp.task('build', function() {
	runSequence(
        'watch-sass',
		['lint', 'minify-css', 'minify-js', 'copy-json-file',
        'copy-html-files', 'copy-fonts', 'copy-bower-components'],
		'connectDist'
	);
});

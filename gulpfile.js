/**
 * Created by shiva on 2016-12-11.
 * Edited/Appended by Wolfgar on 2016-12-16
 */
// include gulp
var gulp = require('gulp');

// include plug-ins
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyejs = require('gulp-minify-ejs');

// JS hint task
gulp.task('jshint', function() {
    gulp.src('./routes/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('imagemin', function() {
    var imgSrc = './public/images/**/*',
        imgDst = './build/public/images';

    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});

// minify html
gulp.task('minify-html', function() {
    return gulp.src(['./routes/*.html'])
        .pipe(minifyejs())
        //.pipe(rename({suffix:".min"}))
        .pipe(gulp.dest('dist'))
});

//minify gulp-minify-ejs
gulp.task('minify-ejs', function() {
  var ejsSrc = './views/*.ejs',//directory for .ejs files to minify
      ejsDst = './build/views';//directory for minified ejs files to go

  gulp.src(ejsSrc)
    .pipe(changed(ejsDst))
    .pipe(minifyejs())
    .pipe(gulp.dest(ejsDst));
});


gulp.task('scripts', function() {
    gulp.src(['./src/scripts/lib.js','./src/scripts/*.js'])
        .pipe(concat('script.js'))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts/'));
});
gulp.task('start', function () {
    nodemon({
        script: 'server.js'
        , ext: 'js html'
        , env: { 'NODE_ENV': 'development' }
    })
});

// default gulp task
gulp.task('default', ['imagemin', 'minify-html', 'minify-ejs', 'scripts'], function() {
    // watch for HTML changes
	gulp.watch('./routes/*.html', function(){
		gulp.run('minify-html');
	});
	//watch for ejs changes
    gulp.watch('./views/*.ejs', function() {
        gulp.run('minify-ejs');
    });
	gulp.watch('./routes/*.js', function() {
    	gulp.run('jshint', 'scripts');
	});
	// watch for CSS changes
    gulp.watch('./public/stylesheets/*.css', function() {
        gulp.run('styles');
    });
});

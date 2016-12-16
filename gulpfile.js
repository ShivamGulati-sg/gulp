/**
 * Created by shiva on 2016-12-11.
 */
// include gulp
var gulp = require('gulp');
nodemon = require('gulp-nodemon')

// include plug-ins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

// JS hint task
gulp.task('jshint', function() {
    gulp.src('./routes/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
minifyejs = require('gulp-minify-ejs')


// minify new images
gulp.task('imagemin', function() {
    var imgSrc = './public/images/**/*',
        imgDst = './build/images';

    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});

gulp.task('minify-html', function() {
    return gulp.src(['./views/*.ejs','./views/*.html'])
        .pipe(minifyejs())
        //.pipe(rename({suffix:".min"}))
        .pipe(gulp.dest('dist'))
})

// include plug-ins


// minify image
//minify gulp-minify-ejs
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
})

// default gulp task
gulp.task('default', ['imagemin', 'minify-html', 'scripts'], function() {
    // watch for HTML changes
    gulp.watch('./views/*.ejs', function() {
        gulp.run('minify-html');
    });
gulp.watch('./routes/*.js', function() {
    gulp.run('jshint', 'scripts');
});
// watch for CSS changes
    gulp.watch('./public/stylesheets/*.css', function() {
        gulp.run('styles');
    });
});
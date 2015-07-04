var gulp = require('gulp');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var babel = require('gulp-babel');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var babelify = require('babelify');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var glob = require('glob');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var order = require("gulp-order");
var flatten = require("gulp-flatten");

var dependencies = [
    //'react', // react is part of this boilerplate
    //'react/addons'
];

var browserifyTask = function(options){
    var appBundler = browserify({
        entries: [options.src],
        transform: [babelify],
        debug: options.development, // Sourcemapping
        cache: {}, packageCache: {}, fullPaths: true, // Requirement of watchify
    });



    /* We set our dependencies as externals of our app bundler.
     For some reason it does not work to set these in the options above */
    appBundler.external(options.development ? dependencies : []);

    /* This is the actual rebundle process of our application bundle. It produces
     a "main.js" file in our "build" folder. */
    var rebundle = function () {
        var start = Date.now();
        console.log('Building APP bundle.......... ');
        appBundler.bundle()
            .on('error', gutil.log)
            .on('prebundle', function(bundle) {
                options.vendorsSrc.forEach(function(lib) {
                    appBundler.external(lib);
                });

                dependencies.forEach(function(lib) {
                    appBundler.external(lib);
                });
            })
            .pipe(source(options.src))
            .pipe(flatten())
            //.pipe(babel())
            .pipe(gulpif(!options.development, streamify(uglify())))
            .pipe(gulp.dest(options.dest))
            .pipe(gulpif(options.development, livereload())) // It notifies livereload about a change if you use it
            .pipe(notify(function () {
                console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
            }));
    };

    /* When we are developing we want to watch for changes and
     trigger a rebundle */
    if (options.development) {
        appBundler = watchify(appBundler);
        appBundler.on('update', rebundle);
    }

    // And trigger the initial bundling
    rebundle();

    // Compile Vendors
    var vendorsBundler = browserify({
        debug: false, // It is nice to have sourcemapping when developing
        require: dependencies
    });

    options.vendorsSrc.forEach(function(lib) {
        vendorsBundler.require(lib);
    });

    vendorsBundler.bundle()
        .on('error', gutil.log)
        .pipe(source('www/js/vendors.js'))
        .pipe(flatten())
        .pipe(gulpif(!options.development, streamify(uglify())))
        .pipe(gulp.dest(options.dest))
        .pipe(notify(function () {
            console.log('VENDORS bundle built');
        }));
};

var sassTask = function(options){
    if (options.development) {
        var run = function () {
            var start = new Date();
            gulp.src(options.src)
                .pipe(sourcemaps.init())
                .pipe(sass())
                .pipe(sourcemaps.write())
                .pipe(gulp.dest('./www/css/'))
                .pipe(livereload())
                .pipe(notify(function () {
                    console.log('SASS Compilation ' + (Date.now() - start) + 'ms');
                }));
        };
        run();
        gulp.watch(options.src, run);
    } else {
        gulp.src('./www/css/styles.scss')
            .pipe(sass())
            .pipe(cssmin())
            .pipe(gulp.dest('./css/'));
    }
};


// Starts our development workflow
gulp.task('default', function () {

    livereload({start: true});
    livereload.listen();

    browserifyTask({
        development: true,
        src: './www/js/app.js',
        dest: './www/build/',
        vendorsSrc: ['./www/lib/jquery/jquery.min.js']
    });

    sassTask({
        development: true,
        src: './www/css/*.scss'
    });
});
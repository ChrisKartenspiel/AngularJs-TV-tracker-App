
// gulpfile.js

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');

var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');

gulp.task('sass', function(){
    gulp.src('public/stylesheets/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(csso())
        .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('vendors', function(){
    gulp.src([
        'public/vendor/angular.js',
        'public/vendor/*.js'
    ])
    .pipe(concat('vendors.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public'));
});

gulp.task('mainApp', function(){
    gulp.src([
        'public/app.js',
        'public/services/*.js',
        'public/controllers/*.js',
        'public/filters/*.js',
        'public/directives/*.js'
    ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public'));
});

gulp.task('templates', function() {
  gulp.src('public/views/**/*.html')
    .pipe(templateCache({ root: 'views', module: 'MyApp' }))
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
    gulp.watch('public/stylesheets/*.scss', ['sass']);
    gulp.watch('public/views/**/*.html', ['templates']);
    gulp.watch('public/vendor/*.js', ['vendors']);
    gulp.watch([
        'public/**/*.js', 
        '!public/app.min.js', 
        '!public/templates.js', 
        '!public/vendor'
    ],['mainApp']);
});

gulp.task('default', ['sass', 'watch','vendors','mainApp'])
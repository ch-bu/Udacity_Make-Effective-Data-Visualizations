var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync');


gulp.task('sass', function() {

    gulp.src('./css/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        // Copy directly in static folder, not for production
        .pipe(gulp.dest('./css'));
});


gulp.task('lint', function () {
    // ESLint ignores files with "node_modules" paths. 
    // So, it's best to have gulp ignore the directory as well. 
    // Also, Be sure to return the stream from the task; 
    // Otherwise, the task may end before the stream has finished. 
    return gulp.src(['./js/*.js', '!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property 
        // of the file object so it can be used by other modules. 
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failAfterError last. 
        .pipe(eslint.failAfterError())
        .pipe(eslint.results(function (results) {
            console.log('Total Results:  ' + results.length);
            console.log('Total Warnings: ' + results.warningCount);
            console.log('Total Errors: ' + results.errorCount);
        }));
});


gulp.task('watch', ['sass', 'lint'], function() {
    
    browserSync({
        notify: false,
        proxy: 'http://localhost:8000/',

        files: [
            './css/*.scss',
            './js/*.js',
            './index.html'
        ]
    });

    gulp.watch('./css/*.scss', ['sass']);
    gulp.watch('./js/*.js', ['lint']);
});

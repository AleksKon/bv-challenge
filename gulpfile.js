var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var imagemin = require('gulp-imagemin');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var ghPages = require('gulp-gh-pages');

// CSS
gulp.task('css', function () {
	return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
    // Useref concatinates CSS
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src([
    			'src/fonts/font-awesome/fonts/fontawesome-webfont.*',
                'src/fonts/**'])
            .pipe(gulp.dest('dist/fonts/'));
});

// Optimize Images
gulp.task('images', function(){
	return gulp.src('src/img/**')
	.pipe(imagemin({
		progressive: true,
		interlaced: true
	}))
	.pipe(gulp.dest('dist/img'));
});

// HTML
gulp.task('html', function(){
	return gulp.src('src/*.html')
        .pipe(useref())
        // Minify js and css
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

// Watch SRC files for changes & reload
gulp.task('serve', ['css'], function(){
	browserSync.init({
		logPrefix: 'SRC',
		server: {
			baseDir: 'src'
		}
	});

	// Watch SASS files
	gulp.watch('src/scss/**/*.scss', ['css', reload]);

	// Watch html files
	gulp.watch('src/**/*.html', reload);

	// Watch images
	gulp.watch('src/img/**', reload);
	
	// Watch js files
	gulp.watch('src/**/*.js', reload);
});

// Build and serve the output from the dist build
gulp.task('build', ['css', 'fonts', 'html', 'images'], function () {
	browserSync.init({
		notify: false,
		logPrefix: 'DIST',
    	// Allow scroll syncing across breakpoints
		scrollElementMapping: ['main', '.mdl-layout'],
		server: 'dist',
		port: 3001
	});
});

// Deploy dist to gh-pages
gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});


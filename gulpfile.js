var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');

var paths = {
  target: 'dist',
  css: 'styles/css/*.css',
  images: 'styles/img/**/*',
  scripts: 'js/**/*.js'
};

gulp.task('clean', function () {
  return gulp.src(paths.target)
  .pipe(clean({force: true}));
});

gulp.task('minify-scripts',  function() {
  return gulp.src(paths.scripts)
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-css', function() {
  return gulp.src(paths.css)
  .pipe(minifyCss())
  .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-images', function () {
  return gulp.src(paths.images)
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}]
  }))
  .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function() {
  gulp.watch(paths.css, ['minify-css']);
  gulp.watch(paths.scripts, ['minify-scripts']);
  gulp.watch(paths.images, ['minify-images']);
});

gulp.task('default', ['minify-css', 'minify-scripts', 'minify-images', 'watch']);
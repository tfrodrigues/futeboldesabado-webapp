var gulp = require('gulp');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

var paths = {
  target: 'dist',
  targetContent: 'dist/**/*',
  images: 'styles/img/**/*',
  uploads: 'uploads/img/**/*',
  scripts: 'js/**/*.js',
  scss: 'styles/scss/*.scss',
  html: 'views/**/*.html',
  ejs: 'views/**/*.ejs'
};

gulp.task('clean', function () {
  return gulp.src(paths.target)
  .pipe(clean({force: true}));
});

gulp.task('sass', function () {
  return gulp.src(paths.scss)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-scripts',  function() {
  return gulp.src(paths.scripts)
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-images', function () {
  return gulp.src([paths.images, paths.uploads])
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}]
  }))
  .pipe(gulp.dest('dist/img'));
});

gulp.task('start-dev', ['start-nodemon'], function() {
  browserSync.init(null, {
  		proxy: "http://localhost:3000",
          files: "*",
          port: 3001,
  });
  gulp.watch([paths.html, paths.ejs, paths.targetContent]).on('change', browserSync.reload);
});

gulp.task('start-nodemon', function (cb) {
  var started = false;
  nodemon({
    script: 'server.js',
    ext: 'js html ejs',
    env: { 'NODE_ENV': 'development' }
  }).on('start', function () {
		if (!started) {
			cb();
			started = true;
		}
	});
  gulp.watch(paths.scss, ['sass']);
  gulp.watch(paths.scripts, ['minify-scripts']);
  gulp.watch([paths.images, paths.uploads], ['minify-images']);
})

gulp.task('start-prd', function () {
  nodemon({
    script: 'server.js',
    ext: 'js html ejs',
    env: { 'NODE_ENV': 'production' }
  });
  gulp.watch(paths.scss, ['sass']);
  gulp.watch(paths.scripts, ['minify-scripts']);
  gulp.watch([paths.images, paths.uploads], ['minify-images']);
})

gulp.task('dev', ['sass', 'minify-scripts', 'minify-images', 'start-dev']);

gulp.task('production', ['sass', 'minify-scripts', 'minify-images', 'start-prd']);

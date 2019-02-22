// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');

gulp.task('sass', function() {
  return gulp.src('app/scss/*.scss') 
    .pipe(sass())
    .pipe(gulp.dest('html/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Minify JS
gulp.task('scripts', function() {
  return gulp.src('app/js/*.js')
    .pipe(gulp.dest('html/js'))
    .pipe(browserSync.reload({
      stream: true
  }))
});

gulp.task('watch', ['browserSync', 'sass', 'move-html', 'move-images', 'scripts'], function (){
  gulp.watch('app/scss/*.scss', ['sass']); 
  gulp.watch('app/js/*.js', ['scripts']); 
  gulp.watch('app/index.html', ['move-html']); 
  gulp.watch('app/images/*.*', ['move-images']); 
  // Other watchers
})

gulp.task('move-html', function(){
  return gulp.src('app/index.html')
    .pipe(gulp.dest('html'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('move-images', function(){
  return gulp.src('app/images/*.*')
    .pipe(gulp.dest('html/images'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'html'
    },
    port: 8000
  })
})

// Default Task
gulp.task('default', ['watch']);
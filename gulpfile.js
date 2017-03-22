var gulp          = require('gulp');
var notify        = require('gulp-notify');
var fs            = require('fs');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var browserSync   = require('browser-sync').create();

//static server
gulp.task('serve', ['scss'], function () {
  //gulp spins up server with browserSync
  //tell browserSync the root of server with server:{}
  browserSync.init({
    server: {
      baseDir: './public/'
    },
    //these ** stars are globbing patterns that allow more than one file match per folder; here it matches any file ending with .html in root folder and any child directories
    files: ['./**/*.html'],
    rewriteRules: [
      {
        match: /@include\("(.+?)"\)/g,
        fn: function (match, filename) {
          if (fs.existsSync(filename)) {
            return fs.readFileSync(filename);
          } else {
            return '<span style="color: red">'+filename+' not found.</span>';
          }
        }
      }
    ]
  });

//watching files with these extensions that are using globbing patterns
//on gulp watch automatically runs scss task when file is saved
  gulp.watch('public/assets/scss/**/*.scss', ['scss']);
  //when these files change, reload the page!
  gulp.watch('js/**/*.js').on('change', browserSync.reload);
  gulp.watch('public/*.html').on('change', browserSync.reload);
  // gulp.watch('public/*.html').on('change', browserSync.reload);

});

//stream() required AFTER gulp.dest due to browsersync only caring about css when it is finished compiling
//provide taske with source files (gulp.dest) for the task to work
//below gulp.dest updates css and streams the app
//configures browserSync
gulp.task('scss', function () {
  gulp.src('public/assets/scss/**/*.scss')
    .pipe(sass()) //using gulp-sass
    .on('error', notify.onError({
      message: 'Error: <%= error.message %>'
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('public/assets/css/'))
    .pipe(notify({ message: 'SCSS task complete' }))
    //browser will be informed of changes once reloaded with stream
    .pipe(browserSync.stream());
});

//we want gulp to run when the default task is run
//used as a grouped reference to other tasks
//this is ran upon entering gulp into the command line without any additional parameters
//then call the gulp task
gulp.task('default', ['serve']);

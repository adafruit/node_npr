require('dotenv').load();

var gulp = require('gulp'),
    mocha = require('gulp-mocha');

gulp.task('test', function() {

  return gulp.src('test/*.js', {read: false})
    .pipe(mocha())
    .once('error', function(err) {
      console.error(err.toString());
      process.exit(1);
    })
    .once('end', function() {
      process.exit();
    });

});

gulp.task('default', ['test']);

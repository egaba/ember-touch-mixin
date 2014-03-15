var gulp = require('gulp');
var es6ModuleTranspiler = require('gulp-es6-module-transpiler');


gulp.task('compile', function() {
  gulp.src('./lib/main.js')
    .pipe(es6ModuleTranspiler({
      type: 'amd',
      moduleName: 'touch-mixin'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
  gulp.watch('./lib/main.js', ['compile']);
});

gulp.task('default', ['compile', 'watch']);

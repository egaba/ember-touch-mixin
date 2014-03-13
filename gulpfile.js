var gulp = require('gulp');
var es6ModuleTranspiler = require('gulp-es6-module-transpiler');

gulp.task('default', function() {
  gulp.src('./lib/main.js')
    .pipe(es6ModuleTranspiler({
      type: 'amd',
      moduleName: 'touch-mixin'
    }))
    .pipe(gulp.dest('./dist'));
});

const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss')

function buildStyles() {
  return src('mainStyles/**/*.scss')
    .pipe(sass())
    .pipe(purgecss({ content: ['*.html'] })) /*this code left out the unused css from transpiling into the css file */
    .pipe(dest('css'))            /* that means it only looks at the html files in the directory and transpile only the classes that were used */
}

/*we'll also watch the html files' changes so that if we make changes there the gulp file will run again to update the css file */
function watchTask() {
  watch(['mainStyles/**/*.scss', '*.html'], buildStyles)  /* asteroid is used instead of filename to transpile all .scss files */
}

exports.default = series(buildStyles, watchTask)
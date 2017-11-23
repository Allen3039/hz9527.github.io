var gulp = require('gulp')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')
var path = require('path')
var resolve = (p = '') => path.resolve(__dirname, '../static', p)
var paths = {
  scripts: [
    resolve('./js/config.js'),
    resolve('./js/swiper.js'),
    resolve('./js/list.js'),
    resolve('./js/toast.js'),
    resolve('./js/index.js')
  ], // sort
  css: [resolve('./styles/*.css')]
}

gulp.task('script', () => {
  console.log('build script')
  return gulp.src(paths.scripts)
    .pipe(concat('index.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(resolve()))
});

gulp.task('css', () => {
  return gulp.src(paths.css)
    .pipe(concat('index.min.css'))
    .pipe(uglify())
    .pipe(gulp.dest((resolve())))
});

gulp.task('watch', () => {
  gulp.watch(paths.scripts, ['script'])
  gulp.watch(paths.css, ['css'])
})

gulp.task('dev', ['watch', 'script', 'css'])

gulp.task('build', ['script', 'css']);

// console.log(gulp.watch)
// if (process.argv[2] === 'build') {
//   console.log('build...')
//   gulp.tasks.script.fn()
//   gulp.tasks.css.fn()
// } else if (process.argv[2] === 'dev') {
//   gulp.tasks.dev.fn()
// }

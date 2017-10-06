var gulp = require('gulp');


//gulp plugins
var cleanCSS = require('gulp-clean-css');
var htmlMin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var merge = require('merge-stream');


//task para minimizar html
gulp.task('html-min', function() {
  return gulp.src('./source/*.html')
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

//task de monitoramento em backgroung
gulp.task('background', function() {
    gulp.watch('./source/scss/*.scss', ['build']);
    gulp.watch('./source/*.html', ['html-min']);
});


//tentei criar uma task unica chamada 'build' cujo faça todas as taferas, mas por algum motivo não consegui o do html, creio que seja pela varios gulp.dest.
/*/nessa logica ele pega as task transforma em variaveis e jogam um função dentro de cada, logo depois criada uma variavel que chama as outras que chama as 
//funções/variaveis, seguindo de um return final
*/
gulp.task('build', function() {
   var scssStream = gulp.src('source/scss/*.scss')
    	.pipe(sass())
    	.pipe(concat('sass.scss'))

    	
   var htmlStream = gulp.src('source/index.html')
    	.pipe(htmlMin({collapseWhitespace: true}))
    	.pipe(gulp.dest('./source/'));


   var mergedStream = merge(scssStream)
    	.pipe(concat('styles.css'))
    	.pipe(cleanCSS())
    	.pipe(gulp.dest('dist/css/'));

    return mergedStream;
});
/**
 * Created by ling on 17/1/24.
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var del = require('del');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var condition = true;


var debug = false;
var file = {
    "javascript":{
        "src":"./src/js/**/*.js",
        "dist":"./dist/js"
    },
    "vendor":{
        "src":"./src/js/vendor/*.js",
        "dist":"./dist/js"
    },
    "css":{
        "src":"./src/css/main.css",
        "dist":"./dist/css"
    },
    "html":{
        "src":"./src/**/*.html",
        "dist":"./dist"
    }
};


gulp.task('copy',function(){
    gulp.src(['./src/**/*','!./src/js/**/*','!./src/css/main.css','!./src/index.html','!./src/views/**/*']).pipe(gulp.dest('./dist/'));
});

//合并压缩并添加版本号
gulp.task('jsMin',function(){
    gulp.src(file.javascript.src).pipe(concat('app.min.js')).pipe(gulpif(condition,uglify())).pipe(rev()).pipe(gulp.dest(file.javascript.dist)).pipe(rev.manifest()).pipe(gulp.dest('src/rev/js'));
});

gulp.task('cssMin',function(){
   gulp.src(file.css.src).pipe(gulpif(condition,minifyCss())).pipe(rev()).pipe(gulp.dest(file.css.dist)).pipe(rev.manifest()).pipe(gulp.dest('src/rev/css'));
});

//压缩并替换html
gulp.task('minHtml',function(){
   return gulp.src(['src/rev/**/*.json',file.html.src])
       .pipe(revCollector())
       .pipe(gulpif(
           condition,minifyHtml({
            empty:true,
            spare:true,
            quotes:true
            })
       ))
       .pipe(gulp.dest(file.html.dist));
});





gulp.task('default',['copy','jsMin','cssMin','minHtml']);



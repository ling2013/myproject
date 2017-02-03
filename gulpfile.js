/**
 * Created by ling on 17/1/24.
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var del = require('del');

var debug = false;
var file = {
    "javascript":{
        "src":"./src/js/**/*.js",
        "dist":"./dist/js"
    },
    "vendor":{
        "src":"./src/js/vendor/*.js",
        "dist":"./dist/js"
    }
};

gulp.task('copy',function(){
    gulp.src(['./src/**/*','!./src/js/**/*']).pipe(gulp.dest('./dist/'));
});
gulp.task('jsMin',function(){
    gulp.src(file.javascript.src).pipe(concat('app.min.js')).pipe(uglify()).pipe(gulp.dest(file.javascript.dist));
});

gulp.task('default',['copy','jsMin']);



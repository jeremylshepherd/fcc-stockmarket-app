"use strict";

import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";
import sass from "gulp-sass";
require("dotenv").load();

let tasks;

gulp.task("build-js", () => {
    
    return browserify("src/app.js")
    .transform("babelify")
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("public/dist"));
});

gulp.task("build-react", () => {
    
    return browserify("views/Components/ReactApp")
    .transform("babelify")
    .bundle()
    .pipe(source("reactApp.js"))
    .pipe(gulp.dest("public/dist"));
});

gulp.task('build-css', () => {
  return gulp.src('src/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('public/dist'));
});

if(process.env.NODE_ENV === 'development') {
    gulp.task("sass:watch", () => {
        gulp.watch('src/*.sass', ['build-css']);    
    });
    
    gulp.task("js:watch", () => {
        gulp.watch('src/app.js', ['build-js']);
        gulp.watch('views/Components/*.js', ['build-js']);
        gulp.watch('views/Components/*.js', ['build-react']);
    });
    
    tasks = ["build-js", "build-react", "build-css", "sass:watch", "js:watch"];
}else{
    tasks = ["build-js", "build-react", "build-css"];
}
// "build-react",

gulp.task('default', tasks);
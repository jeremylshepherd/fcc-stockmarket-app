"use strict";

import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";
import sass from "gulp-sass";

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

gulp.task("sass:watch", () => {
    gulp.watch('src/app.sass', ['sass']);    
    
    
});

gulp.task("js:watch", () => {
    gulp.watch('src/app.js', ['build-js']);
    gulp.watch('views/Components/*.js', ['build-js']);
    gulp.watch('views/Components/*.js', ['build-react']);
});
// "build-react",
gulp.task("default", ["build-js", "build-react", "build-css", "sass:watch", "js:watch"]);
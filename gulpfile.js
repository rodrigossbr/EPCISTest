
var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var jsvalidate = require('gulp-jsvalidate');
var concat = require('gulp-concat');
var typescript = require('gulp-tsc');
var filter = require('gulp-filter');


var paths = {
    css: {
        src: [
            'app/assets/css/app.css',
            'node_modules/angular-material/angular-material.css',
            'node_modules/angular-toastr/dist/angular-toastr.css'
        ],
        destProject: 'app/build/css/',
        dest: 'dist/app/build/css/',
        file: 'app-style.min.css'
    },
    cssFonts: {
        src: [
            'node_modules/angular-material/**'
        ],
        destProject: 'app/build/',
        dest: 'dist/app/build/'
    },
    typescript: {
        src: [
            'app/configs/_all.ts'
        ],
        destProject: 'app/build/',
        dest: 'dist/app/build/',
        file: 'app-ts.min.js'
    },
    scripts: {
        src: [
            'node_modules/angular/angular.js',
            'node_modules/angular-sanitize/angular-sanitize.js',
            'node_modules/angular-ui-tinymce/src/tinymce.js',
            'node_modules/angular-toastr/dist/angular-toastr.tpls.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-aria/angular-aria.js',
            'node_modules/angular-messages/angular-messages.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-route/angular-route.js',
            'node_modules/angular-material/angular-material.js',
            'node_modules/tinymce/tinymce.js',
            'node_modules/chart.js/dist/Chart.js',
            'node_modules/angular-chart.js/angular-chart.js',
            'node_modules/angular-toastr/dist/angular-toastr.tpls.js'
        ],
        destProject: 'app/build/',
        dest: 'dist/app/build/',
        file: 'app-scripts.min.js'
    },
    folders: {
        src: [
            'app/assets/images/**',
            'app/views/**'
        ],
        dest: 'dist/'
    },
    files: {
        src: [
            'index.html'
        ],
        dest: 'dist/'
    }
};

gulp.task('css', function () {
    
    gulp.src(paths.css.src)
       .pipe(concat(paths.css.file))
       //.pipe(cssmin())
       .pipe(gulp.dest(paths.css.destProject))
       .pipe(gulp.dest(paths.css.dest));

    var filterEot = filter("**/fonts/**.eot", { restore: true });
    var filterSvg = filter("**/fonts/**.svg", { restore: true });
    var filterTtf = filter("**/fonts/**.ttf", { restore: true });
    var filterWoff = filter("**/fonts/**.woff", { restore: true });
    var filterWoff2 = filter("**/fonts/**.woff2", { restore: true });

    gulp.src(paths.cssFonts.src)
        .pipe(filterEot)
        .pipe(gulp.dest(paths.cssFonts.destProject))
        .pipe(gulp.dest(paths.cssFonts.dest))
        .pipe(filterEot.restore)

        .pipe(filterWoff)
        .pipe(gulp.dest(paths.cssFonts.destProject))
        .pipe(gulp.dest(paths.cssFonts.dest))
        .pipe(filterWoff.restore)

        .pipe(filterWoff2)
        .pipe(gulp.dest(paths.cssFonts.destProject))
        .pipe(gulp.dest(paths.cssFonts.dest)
        .pipe(filterWoff2.restore)

        .pipe(filterSvg)
        .pipe(gulp.dest(paths.cssFonts.destProject))
        .pipe(gulp.dest(paths.cssFonts.dest))
        .pipe(filterSvg.restore)

        .pipe(filterTtf)
        .pipe(gulp.dest(paths.cssFonts.destProject))
        .pipe(gulp.dest(paths.cssFonts.dest)));

    filterEot = filter("**/*.eot", { restore: true });
    filterSvg = filter("**/*.svg", { restore: true });
    filterTtf = filter("**/*.ttf", { restore: true });
    filterWoff = filter("**/*.woff", { restore: true });
    filterWoff2 = filter("**/*.woff2", { restore: true });

    gulp.src(paths.cssFonts.src)
       .pipe(filterEot)
       .pipe(gulp.dest(paths.css.destProject))
       .pipe(gulp.dest(paths.css.dest))
       .pipe(filterEot.restore)

       .pipe(filterWoff)
       .pipe(gulp.dest(paths.css.destProject))
       .pipe(gulp.dest(paths.css.dest))
       .pipe(filterWoff.restore)

       .pipe(filterWoff2)
       .pipe(gulp.dest(paths.css.destProject))
       .pipe(gulp.dest(paths.css.dest))
       .pipe(filterWoff2.restore)

       .pipe(filterSvg)
       .pipe(gulp.dest(paths.css.destProject))
       .pipe(gulp.dest(paths.css.dest))
       .pipe(filterSvg.restore)

       .pipe(filterTtf)
       .pipe(gulp.dest(paths.css.destProject))
       .pipe(gulp.dest(paths.css.dest));
});

gulp.task('ts', function () {

    var jsDist = "js/";

    gulp.src(paths.typescript.src)
        .pipe(typescript({
            module: 'amd',
            target: 'es5',
            removeComments: true,
            out: paths.typescript.file
        }))
        .pipe(gulp.dest(paths.typescript.destProject + jsDist))
        .pipe(gulp.dest(paths.typescript.dest + jsDist));
});

gulp.task('script', function () {

    var jsDist = "js/";
    gulp.src(paths.scripts.src)
        .pipe(jsvalidate())
        .pipe(concat(paths.scripts.file))
        //.pipe(uglify({ mangle: false }))
        .pipe(gulp.dest(paths.scripts.destProject + jsDist))
        .pipe(gulp.dest(paths.scripts.dest + jsDist));
});

gulp.task('folders', function () {
    gulp.src(paths.folders.src, { base: './' })
    .pipe(gulp.dest(paths.folders.dest));
});

gulp.task('files', function () {
    gulp.src(paths.files.src)
    .pipe(gulp.dest(paths.files.dest));
});

gulp.task('default', ['ts', 'script', 'css', 'folders', 'files']);
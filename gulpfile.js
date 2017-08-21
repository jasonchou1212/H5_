let gulp = require('gulp')
let rev = require('gulp-rev')
let sftp = require('gulp-sftp')
let revCollector = require('gulp-rev-collector');
let minifyHTML   = require('gulp-minify-html');
// let gulpsync = require('gulp-sync')

gulp.task('sftp', function () {
    return gulp.src('./src/**')
        .pipe(sftp({
            host: '10.31.1.82',
            port:10022,
            remotePath: '/home/bqadm/H5',
            user: 'bqadm',
            pass: 'AxSM5Fu2EPdw'
        }))
})
gulp.task('css', function () {
    return gulp.src('src/css/*.css')
        .pipe( rev() )
        .pipe( gulp.dest('dist/css'))
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/css' ) );
})
gulp.task('image', function () {
    return gulp.src('src/img/*.{jpg,png}')
        .pipe( rev() )
        .pipe( gulp.dest('dist/img'))
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/img' ) );
})
gulp.task('js', function () {
    return gulp.src('src/js/*.js')
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/js' ) );
})
// gulp.task('rev', function () {
//     return gulp.src(['rev/**.json', './src/*.html'])
//         .pipe( revCollector({
//             replaceReved: true,
//             dirReplacements: {
//                 'css': '/dist/css',
//                 '/js/': '/dist/js/',
//                 'cdn/': function(manifest_value) {
//                     return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
//                 }
//             }
//         }) )
//         .pipe( minifyHTML({
//                 empty:true,
//                 spare:true
//             }) )
//         .pipe( gulp.dest('dist') );
// })
gulp.task('rev', function() {
    gulp.src(['./rev/**/*.json', './src/index.html'])            //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector())                                   //- 执行文件内css名的替换
        .pipe(gulp.dest('./dist/'));                             //- 替换后的文件输出的目录
})

gulp.task('revcss', function() {
    gulp.src(['./rev/**/*.json', './dist/css/**.css'])         
        .pipe(revCollector())                                  
        .pipe(gulp.dest('./dist/css'));                            
})



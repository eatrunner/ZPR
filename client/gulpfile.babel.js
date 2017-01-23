import gulp from 'gulp';
import concat from 'gulp-concat';
import wrap from 'gulp-wrap';
import uglify from 'gulp-uglify';
import htmlmin from 'gulp-htmlmin';
import gulpif from 'gulp-if';
import sass from 'gulp-sass';
import yargs from 'yargs';
import ngAnnotate from 'gulp-ng-annotate';
import templateCache from 'gulp-angular-templatecache';
import url from 'url';
import proxy from 'proxy-middleware';
import server from 'browser-sync';
import del from 'del';
import path from 'path';
import child from 'child_process';
import Dgeni from 'dgeni';
import jshint from 'gulp-jshint';
import * as middlewareLib from './devserver/middleware';

const exec = child.exec;
const argv = yargs.argv;
const root = 'src/';
const paths = {
  dist: './dist/',
  distDocs: './docs/build',
  docs: './docs/app/*.js',
  scripts: [`${root}/app/**/*.js`, `!${root}/app/**/*.spec.js`],
  tests: `${root}/app/**/*.spec.js`,
  styles: `${root}/sass/*.scss`,
  templates: `${root}/app/**/*.html`,
  modules: [
	'angular/angular.js',
	'angular-sanitize/angular-sanitize.js',
	'angular-ui-bootstrap/dist/ui-bootstrap.js',
	'ui-select/dist/select.js',
	'angular-ui-router/release/angular-ui-router.js',
	'angular-translate/dist/angular-translate.js',
	'angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
	'phaser/build/phaser.js'
  ],
  static: [
	`${root}/index.html`,
	`${root}/fonts/**/*`,
	`${root}/img/**/*`,
	`${root}/sfx/**/*`,
	`${root}/translations/**/*`
  ]
};

server.create();

gulp.task('clean', cb => del(paths.dist + '**/*', cb));

gulp.task('cleanDocs', cb => del(paths.distDocs + '**/**/*', cb));

gulp.task('templates', () => {
  return gulp.src(paths.templates)
	.pipe(htmlmin({ collapseWhitespace: true }))
	.pipe(templateCache({
	  module: 'app.templates',
	  root: 'app',
	  standalone: true,
	  transformUrl: function (url) {
		return url.replace(path.dirname(url), '.');
	  }
	}))
	.pipe(gulp.dest('./'));
});

gulp.task('modules', ['templates'], () => {
  return gulp.src(paths.modules.map(item => 'node_modules/' + item))
	.pipe(concat('vendor.js'))
	.pipe(gulpif(argv.deploy, uglify()))
	.pipe(gulp.dest(paths.dist + 'js/'));
});

gulp.task('styles', () => {
  return gulp.src(paths.styles)
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(gulp.dest(paths.dist + 'css/'));
});

gulp.task('scripts', ['modules'], () => {
  return gulp.src([
	  `!${root}/app/**/*.spec.js`,
	  `${root}/app/**/*.module.js`,
	  ...paths.scripts,
	  './templates.js'
	])
	// .pipe(jshint())
	// .pipe(jshint.reporter('default'))
	// .pipe(jshint.reporter('fail'))
	.pipe(wrap('(function(angular){\n\'use strict\';\n<%= contents %>})(window.angular);'))
	.pipe(concat('bundle.js'))
	.pipe(ngAnnotate())
	.pipe(gulpif(argv.deploy, uglify()))
	.pipe(gulp.dest(paths.dist + 'js/'));
});

gulp.task('serve', () => {
  console.log('serve');
  var proxyOptions = url.parse('http://127.0.0.1:9000/tank-game');
  proxyOptions.route = '/tank-game';

  return server.init({
	files: [`${paths.dist}/**`],
	port: 9001,
	server: {
	  baseDir: paths.dist,
	  middleware: [proxy(proxyOptions)]
	}
  });
});

gulp.task('serveDev', () => {
  return server.init({
	files: [`${paths.dist}/**`],
	port: 9001,
	server: {
	  baseDir: paths.dist,
	  middleware: middlewareLib.middleware
	}
  });
});


gulp.task('copy', ['clean'], () => {
  return gulp.src(paths.static, { base: 'src' })
	.pipe(gulp.dest(paths.dist));
});

gulp.task('watch', ['serve', 'scripts'], () => {
  gulp.watch([paths.scripts, paths.templates], ['scripts']);
  gulp.watch(paths.styles, ['styles']);
});

gulp.task('watchDev', ['serveDev', 'scripts'], () => {
  gulp.watch([paths.scripts, paths.templates], ['scripts']);
  gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', [
  'copy',
  'styles',
  'serve',
  'watch'
]);

gulp.task('dev', [
	'copy',
	'styles',
	'serveDev',
	'watchDev'
  ]);

gulp.task('production', [
  'copy',
  'scripts'
]);

gulp.task('copyDocs', () => {
  return gulp.src(paths.docs)
	.pipe(gulp.dest(paths.distDocs + '/src'));
});

gulp.task('dgeni', ['cleanDocs', 'copyDocs'], () => {
	var dgeni = new Dgeni([require('./docs/config')]);
	return dgeni.generate();
});

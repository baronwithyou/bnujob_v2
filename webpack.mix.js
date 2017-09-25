let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css')
    .sass('resources/assets/sass/main.scss', 'public/css');

mix.scripts([
    // 头像提醒
    'resources/assets/js/notification.js',
    'resources/assets/js/jquery-ui.min.js',
    'resources/assets/js/jquery.smint.js',
    'resources/assets/js/overhang.min.js',
    // banner星座特效
    'resources/assets/js/constellation.js',
    'resources/assets/js/star-rating.min.js',
    'resources/assets/js/star-rating_locale_zh.js',
], 'public/js/all.js');

mix.styles([
    'resources/assets/css/animate.min.css',
    'resources/assets/css/notification.css',
    'resources/assets/css/jquery-ui.min.css',
    'resources/assets/css/overhang.min.css',
    // 'resources/assets/css/main.css',
    'resources/assets/css/crowd.css',
    'resources/assets/css/star-rating.min.css',
    'resources/assets/css/font-awesome.min.css',
], 'public/css/all.css');


if (mix.inProduction) {
    mix.version();
}
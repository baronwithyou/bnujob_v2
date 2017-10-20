<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/', 'IndexController@index')->name('index');

Route::group(['middleware' => ['auth']], function () {
    Route::get('/user', 'UserController@index')->name('user.index');

    Route::post('/email/verify', 'UserController@emailToVerify')->name('email.verify');

    Route::group(['prefix' => 'business', 'as' => 'business.'], function () {
        Route::get('/certificate', 'BusinessController@certificate')->name('certificate');
    });

    // 后台voyager
    Route::group(['prefix' => 'admin'], function () {
        Voyager::routes();

        Route::get('logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index')->middleware(['admin']);
    });
});

Route::get('/job/{id}', 'IndexController@jobDetail')->name('job');

Route::post('/get-verify-code', 'IndexController@getVerifyCode')->name('get-verify-code');

Route::get('/activate/{token}', 'UserController@activate')->name('activate');


Route::get('auth/{service}', 'Auth\OAuthController@redirectToProvider')->name('auth');
Route::get('auth/{service}/callback', 'Auth\OAuthController@handleProviderCallback');

// 测试
Route::get('/test', 'IndexController@test');



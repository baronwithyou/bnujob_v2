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
    Route::group(['prefix' => 'user', 'as' => 'user.'], function () {
        Route::get('/', 'UserController@index')->name('index');

        Route::get('/deliver_status', 'UserController@deliverStatus')->name('deliver_status');

        Route::post('/resume/{type}/update', 'UserController@resumeUpdate')->name('resume_update');

        Route::post('private/info/update', 'UserController@infoUpdate')->name('info_update');
    });

    Route::post('/email/verify', 'UserController@emailToVerify')->name('email.verify');

    Route::group(['prefix' => 'business', 'as' => 'business.'], function () {
        Route::get('/', 'BusinessController@index')->name('index');

        Route::get('/certificate', 'BusinessController@certificate')->name('certificate');

        Route::post('/certificate_first', 'BusinessController@certificateFirst')->name('certificate_first')->middleware('auth');

        Route::post('/certificate_second', 'BusinessController@certificateSecond')->name('certificate_second')->middleware('auth');

        Route::get('/publish', 'BusinessController@publish')->name('publish');
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
Route::get('/test', 'BusinessController@test');



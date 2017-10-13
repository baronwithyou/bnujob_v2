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
});
Route::get('/job/{id}', 'IndexController@jobDetail')->name('job');

Route::post('/get-verify-code', 'IndexController@getVerifyCode')->name('get-verify-code');






Route::get('auth/{service}', 'Auth\OAuthController@redirectToProvider')->name('auth');
Route::get('auth/{service}/callback', 'Auth\OAuthController@handleProviderCallback');

//Route::post('/register_ajax', 'AuthController@registerByAjax')->name('register.ajax');
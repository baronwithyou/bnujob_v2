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

        Route::post('/resume/{type}/update', 'UserController@jsonResumeUpdate')->name('json_resume_update');

        Route::post('private/info/update', 'UserController@infoUpdate')->name('info_update');

        Route::post('/resume/normal/update/{type}', 'UserController@normalResumeUpdate')->name('normal_resume_update');

        Route::post('/receive/{deliver_id}', 'UserController@receiveUpdate')->name('receive.update');
    });

    Route::post('/email/verify', 'UserController@emailToVerify')->name('email.verify');

    Route::group(['prefix' => 'business', 'as' => 'business.'], function () {
        Route::get('/', 'BusinessController@index')->name('index');

        Route::get('/certificate', 'BusinessController@certificate')->name('certificate');

        Route::post('/certificate_first', 'BusinessController@certificateFirst')->name('certificate_first');

        Route::post('/certificate_second', 'BusinessController@certificateSecond')->name('certificate_second');

        Route::get('/publish', 'BusinessController@publish')->name('publish');

        Route::post('/publish/store', 'BusinessController@publishStore')->name('publish.store');

        Route::post('/profile/update', 'BusinessController@updateProfile')->name('profile.update');

        Route::post('/avatar/store', 'BusinessController@avatarStore')->name('avatar.store');

        Route::get('/all_jobs', 'BusinessController@allJobs')->name('all_jobs');

        Route::get('/resume/check/{job_id?}', 'BusinessController@resumeCheck')->name('resume.check');

        Route::post('/resume/check/update', 'BusinessController@resumeCheckUpdate')->name('resume.check.update');
    });

    Route::group(['prefix' => 'job', 'as' => 'job.'], function () {
        Route::post('/comment/store', 'JobController@commentStore')->name('comment.store');

        Route::post('/comment/like/update', 'JobController@commentLikeUpdate')->name('comment.like.update');

        Route::post('/deliver', 'JobController@deliver')->name('deliver');

        Route::post('/collect', 'JobController@collect')->name('collect');
    });

    // 后台voyager
    Route::group(['prefix' => 'admin'], function () {
        Voyager::routes();

        Route::get('logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index')->middleware(['admin']);
    });

    Route::post('/image/upload', 'IndexController@uploadImage')->name('image.upload');
});

Route::get('/job/{id}', 'JobController@jobDetail')->name('job');

Route::post('/get-verify-code', 'IndexController@getVerifyCode')->name('get-verify-code');

Route::get('/activate/{token}', 'UserController@activate')->name('activate');


Route::get('auth/{service}', 'Auth\OAuthController@redirectToProvider')->name('auth');
Route::get('auth/{service}/callback', 'Auth\OAuthController@handleProviderCallback');

// 测试
Route::get('/test', 'IndexController@test');



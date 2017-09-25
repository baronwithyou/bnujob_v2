<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, SparkPost and others. This file provides a sane
    | default location for this type of information, allowing packages
    | to have a conventional place to find your various credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
    ],

    'ses' => [
        'key' => env('SES_KEY'),
        'secret' => env('SES_SECRET'),
        'region' => 'us-east-1',
    ],

    'sparkpost' => [
        'secret' => env('SPARKPOST_SECRET'),
    ],

    'stripe' => [
        'model' => App\User::class,
        'key' => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
    ],
    'weixin' => [
        'client_id' => 'wxa68dbaa4030dc906',
        'client_secret' => '10b491defdfde98b5c250f411f71ddaf',
        'redirect' => 'http://local.bnujob.com/auth/wechat/callback'
    ],
    'weixinweb' => [
        'client_id' => 'wx672d72141f65b24d',
        'client_secret' => 'c270a451a93a9f22d7b041f232516040',
        'redirect' => 'http://local.bnujob.com/auth/wechatweb/callback'
    ],
    'qq' => [
        'client_id' => '100388677',
        'client_secret' => '4182176aa9e4960d434758008a79d71c',
        'redirect' => 'http://codepku.com/oauth/qq/callback',
    ],

];

<?php

use Faker\Generator as Faker;

$factory->define(App\Business::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'user_id' => rand(1, \App\User::all()->count()),
        'mobile' => '13632850638',
        'type' => array_random(array_keys(config('content.business_type'))),
        'abstract' => str_random(200),
        'school' => '北京师范大学珠海分校',
        'avatar' => 'images/user.jpg',
    ];
});

<?php

use Faker\Generator as Faker;

$factory->define(\App\Job::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'business_id' => rand(10, \App\Business::all()->count() + 9),
        'description' => str_random(200),
        'required' => str_random(200),
        'contact' => '13632850638',
        'address' => str_random(10),
        'location' => array_random(array_keys(config('content.location'))),
        'salary' => rand(200, 500),
    ];
});

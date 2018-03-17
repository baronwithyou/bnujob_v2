<?php

use Faker\Generator as Faker;

$factory->define(\App\Job::class, function (Faker $faker) {
    $location = ['haihua', 'yanhua', 'jinghua', 'yuehua'];
    return [
        'name' => $faker->name,
        'business_id' => \App\Business::inRandomOrder()->value('id'),
        'description' => str_random(200),
        'required' => str_random(200),
        'contact' => '13143466866',
        'address' => str_random(20),
        'location' => array_random($location),
        'salary' => rand(100, 300),
    ];
});

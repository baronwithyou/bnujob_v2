<?php

use Faker\Generator as Faker;

$factory->define(\App\Evaluate::class, function (Faker $faker) {
    return [
        'user_id' => rand(3, 6),
        'job_id' => array_random(\App\Job::all()->pluck('id')->toArray()),
        'grade' => rand(0, 10)
    ];
});

<?php

use Faker\Generator as Faker;

$factory->define(\App\Evaluate::class, function (Faker $faker) {
    do {
        $user_id = \App\User::inRandomOrder()->value('id');
        $job_id = \App\Job::inRandomOrder()->value('id');
        $record = \App\Evaluate::where('user_id', $user_id)->where('job_id', $job_id)->first();
    } while(!empty($record) && Evaluate::count() < 1000);
    return [
        'grade' => rand(0, 10),
        'user_id' => $user_id,
        'job_id' => $job_id
    ];
});

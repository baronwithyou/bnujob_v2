<?php

use Illuminate\Database\Seeder;

class MyUserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\User::class, 50)->create();
        factory(\App\Business::class, 10)->create();
        factory(\App\Job::class, 10)->create();
        factory(\App\Evaluate::class, 200)->create();
    }
}

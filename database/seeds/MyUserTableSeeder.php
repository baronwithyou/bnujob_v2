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
        factory(\App\User::class, 20)->create();
        factory(\App\Business::class, 20)->create();
        factory(\App\Job::class, 100)->create();
        factory(\App\Evaluate::class, 210)->create();
    }
}

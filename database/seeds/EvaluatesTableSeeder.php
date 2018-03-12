<?php

use Illuminate\Database\Seeder;

class EvaluatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('evaluates')->insert([
            'user_id' => \App\User::inRandomOrder()->value('id'),
            'job_id' => \App\Job::inRandomOrder()->value('id'),
            'grade' => rand(0, 5)
        ]);
    }
}

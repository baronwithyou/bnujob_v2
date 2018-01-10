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
            'user_id' => rand(1, 2),
            'job_id' => rand(1, 3),
            'grade' => rand(0, 5)
        ]);
    }
}

<?php

use Illuminate\Database\Seeder;

use App\User;
use App\Job;
use App\Evaluate;

class EvaluatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        do {
            $user_id = User::inRandomOrder()->value('id');
            $job_id = Job::inRandomOrder()->value('id');
            $record = Evaluate::where('user_id', $user_id)->where('job_id', $job_id)->first();
        } while(!is_null($record) && Evaluate::count() < 1000);
        $data = [
            'grade' => rand(0, 10),
            'user_id' => $user_id,
            'job_id' => $job_id
        ];
        DB::table('evaluates')->insert($data);
    }
}

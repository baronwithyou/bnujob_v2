<?php

use Illuminate\Database\Seeder;

class JobsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('jobs')->insert([
            'business_id' => 1,
            'name' => str_random(10),
            'description' => str_random(50),
            'required' => str_random(50),
            'salary' => 500,
            'contact' => '13106803427',
            'address' => '广东深圳',
            'collected_count' => 0,
            'delivered_count' => 0,
            'passes_count' => 0,
        ]);
    }
}

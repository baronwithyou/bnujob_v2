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
        $location = ['haihua', 'yanhua', 'jinghua', 'yuehua'];
        DB::table('jobs')->insert([
            'business_id' => \App\Business::inRandomOrder()->value('id'),
            'name' => str_random(10),
            'description' => str_random(50),
            'required' => str_random(50),
            'location' => 'haihua',
            'salary' => 500,
            'contact' => '13106803427',
            'address' => '广东深圳',
        ]);
    }
}

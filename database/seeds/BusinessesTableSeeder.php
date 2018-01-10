<?php

use Illuminate\Database\Seeder;

class BusinessesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('businesses')->insert([
            'user_id' => 1,
            'name' => str_random(10),
            'mobile' => '13106803427',
            'tag' => '123',
            'type' => '1',
            'abstract' => str_random(50),
        ]);
    }
}

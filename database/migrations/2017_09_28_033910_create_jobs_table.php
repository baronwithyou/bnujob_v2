<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('business_id')->unsigned();
            $table->string('name');
            $table->text('description');
            $table->decimal('salary', 5, 2);

            $table->string('contact')->commment('负责人联系方式');
            $table->string('address')->comment('公司安排的工作不一定是在本公司内');

            $table->integer('collected_count')->comment('被收藏次数');
            $table->integer('delivered_count')->comment('被投递次数');
            $table->integer('passes_count')->count('通过的用户的个数');

            $table->foreign('business_id')->references('id')->on('businesses');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jobs');
    }
}

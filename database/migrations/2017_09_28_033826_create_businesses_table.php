<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBusinessesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('businesses', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->string('name');
            $table->string('mobile')->comment('商家电话');
            $table->string('province')->nullable();
            $table->string('city')->nullable();
            $table->string('address')->nullable();
            $table->string('school')->nullable();
//            $table->string('tag')->comment('标签');
            $table->string('type')->comment('公司类型 国企还是私企还是个体户');
            $table->text('abstract')->comment('公司简介');
            $table->smallInteger('status')->default(0)->comment('状态 默认开启（审核是否通过）');

            $table->integer('collected_count')->default(0)->comment('被收藏次数');
            $table->integer('delivered_count')->default(0)->comment('被投递次数');
            $table->integer('passes_count')->default(0)->count('通过的用户的个数');

            $table->foreign('user_id')->references('id')->on('users');
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
        Schema::dropIfExists('businesses');
    }
}

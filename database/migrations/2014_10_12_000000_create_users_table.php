<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('real_name');
            $table->string('nickname');
            $table->string('email')->unique();
            $table->string('mobile')->unique();
            $table->string('password');
            $table->string('school');
            $table->string('city');
            $table->string('company');
            $table->string('website');
            $table->timestamp('birthday');
            $table->string('gender')->comment('男 = F, 女 = M');

            $table->string('confirmation_token')->comment('用于激活邮箱');
            $table->smallInteger('is_active')->comment('是否激活');
            $table->integer('delivery_count')->default(0)->comment('投递简历数');
            $table->integer('comment_count')->default(0)->comment('评论次数');

            $table->json('config');
            $table->integer('credit')->default(0)->comment('声望 可通过评论、投递简历等来增加');

            $table->integer('browse_id')->comment('浏览记录');
            $table->integer('resume_id')->comment('个人简历');

            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}

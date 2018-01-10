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
            // 基础信息
            $table->increments('id');
            $table->string('name')->unique();
            $table->string('real_name')->nullable();
            $table->string('nickname')->nullable();
            $table->string('email')->unique()->nullable();
            $table->string('mobile')->unique()->nullable();
            $table->string('password');
            $table->string('school')->nullable();
            $table->string('province')->nullable();
            $table->string('city')->nullable();
            $table->string('address')->nullable();
            $table->string('company')->nullable();
            $table->string('website')->nullable();
            $table->timestamp('birthday')->nullable();
            $table->integer('gender')->default(0)->comment('未知 = 0, 男 = 1, 女 = 2');
            $table->smallInteger('age')->nullable();
            $table->string('grade')->nullable()->comment('所在年级');
            $table->string('abstract')->nullable()->comment('个人简介');
            $table->string('wechat')->nullable();
            $table->string('avatar')->nullable();

            // 其他信息
            $table->string('confirmation_token')->nullable()->comment('用于激活邮箱');
            $table->smallInteger('status')->default(1)->comment('用户状态 开 = 1, 关 = 0');
            $table->smallInteger('store_show')->default(1)->comment('商家能否看到');
            $table->smallInteger('is_active')->default(0)->comment('邮箱是否激活');
            $table->integer('reputation')->default(0)->comment('声望 可通过评论、投递简历等来增加');
            $table->integer('delivers_count')->default(0)->comment('投递简历数');
            $table->integer('collects_count')->default(0)->comment('收藏数');
            $table->integer('comments_count')->default(0)->comment('评论次数');
            $table->integer('likes_count')->default(0)->comment('点赞次数');
            $table->integer('followings_count')->default(0)->comment('关注数');
            $table->integer('followers_count')->default(0)->comment('粉丝数');
            $table->integer('primary_resume_id')->nullable()->comment('默认简历');
            $table->string('credit_id')->nullable()->comment('实名认证之后才可注册商家账号');
            $table->string('api_token', 64)->unique();

            $table->text('config')->nullable();
            $table->rememberToken();
            $table->timestamp('email_at')->nullable()->comment('发送邮件的时间');
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

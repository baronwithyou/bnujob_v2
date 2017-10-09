<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateResumesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('resumes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');

            $table->string('name');
            $table->string('gender')->nullable();
            $table->timestamp('birthday')->nullable();
            $table->string('school')->nullable();
            $table->string('province')->nullable();
            $table->string('city')->nullable();
            $table->string('address')->nullable();
            $table->string('expect_job')->nullable()->comment('期望职位');
            $table->string('expect_salary')->nullable()->comment('期望薪资');
            $table->string('expect_day')->nullable()->comment('一周可上班的天数');
            $table->integer('education')->default(0)->comment('大专 = 1，本科 = 2，硕士 = 3，博士 = 4，其他 = 5');
            $table->text('cet')->nullable()->comment('46级成绩');

            // 教育背景
            $table->string('grade')->nullable()->comment('年级');
            $table->string('specialty')->nullable()->comment('专业');
            $table->string('specialty_courses')->nullable()->comment('主修课程');

            // 实习兼职经历
            $table->text('job_experience1')->nullable()->comment('实习经历 包括公司名称、职位名称、开始结束时间、实习描述');
            $table->text('job_experience2')->nullable()->comment('实习经历 包括公司名称、职位名称、开始结束时间、实习描述');

            // 校园经历
            $table->text('campus_experience1')->nullable()->comment('校园经历 包括组织名称、担任职务、开始结束时间、活动描述');
            $table->text('campus_experience2')->nullable()->comment('校园经历 包括组织名称、担任职务、开始结束时间、活动描述');

            // 作品展示
            $table->text('works1')->nullable()->comment('作品 包括作品链接、作品描述');
            $table->text('works2')->nullable()->comment('作品 包括作品链接、作品描述');

            // 技能爱好
            $table->text('skill')->nullable()->comment('技能爱好');

            // 个人评价
            $table->text('evaluate')->nullable()->comment('个人评价');
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
        Schema::dropIfExists('resumes');
    }
}

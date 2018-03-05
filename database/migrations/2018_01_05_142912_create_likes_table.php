<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLikesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('likes', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('liking_id')->comment('同意的人');
//            $table->unsignedInteger('liker_id')->comment('被同意的人');
            $table->unsignedInteger('comment_id');

            $table->foreign('liking_id')->references('id')->on('users');
//            $table->foreign('liker_id')->references('id')->on('users');
            $table->foreign('comment_id')->references('id')->on('comments');

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
        Schema::dropIfExists('likes');
    }
}

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
            $table->unsignedInteger('liking_id');
            $table->unsignedInteger('liker_id');
            $table->unsignedInteger('comment_id');

            $table->foreign('liking_id')->references('id')->on('users');
            $table->foreign('liker_id')->references('id')->on('users');
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

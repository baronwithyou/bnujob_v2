<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTagsToBusinessesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tags_to_businesses', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('business_id');
            $table->unsignedInteger('tag_id');

            $table->foreign('business_id')->references('id')->on('businesses');
            $table->foreign('tag_id')->references('id')->on('tags');
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
        Schema::dropIfExists('tags_to_businesses');
    }
}

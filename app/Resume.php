<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Resume extends Model
{
    protected $fillable = ['user_id', 'job_experience1'];

    public $timestamps = true;
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Resume extends Model
{
    protected $fillable = ['user_id', 'job_experience1', 'campus_experience1', 'works1', 'skill', 'evaluate', 'upload_location', 'resume_name'];

    public $timestamps = true;
}

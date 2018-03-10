<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Deliver extends Model
{
    protected $fillable = [ 'resume_id', 'job_id', 'status' ];
}

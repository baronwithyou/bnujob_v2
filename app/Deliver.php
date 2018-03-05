<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Deliver extends Model
{
    protected $fillable = [ 'user_id', 'job_id' ];
}

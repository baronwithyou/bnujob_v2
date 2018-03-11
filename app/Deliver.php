<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Deliver extends Model
{
    protected $fillable = [ 'resume_id', 'job_id', 'status', 'receive' ];

    public function user() {
        return $this->belongsTo(User::class, 'resume_id', 'primary_resume_id');
    }

    public function job() {
        return $this->belongsTo(Job::class);
    }
}

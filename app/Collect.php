<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Collect extends Model
{
    public $fillable = [
        'job_id', 'user_id'
    ];

    public function job() {
        return $this->belongsTo(Job::class);
    }
}

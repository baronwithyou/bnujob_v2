<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Evaluate extends Model
{
    protected $fillable = [
        'user_id', 'job_id', 'grade'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}

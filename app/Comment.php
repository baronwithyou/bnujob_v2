<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public $fillable = [
        'content', 'user_id', 'job_id'
    ];

    public function poster() {
        return $this->belongsTo(User::class, 'user_id');
    }
}

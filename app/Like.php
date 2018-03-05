<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    public $fillable = [
        'liking_id', 'comment_id', 'type'
    ];

    public function Comment() {
        return $this->belongsTo('App\Comment', 'comment_id', 'id');
    }
}

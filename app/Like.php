<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    public $fillable = [
        'liking_id', 'liker_id', 'comment_id', 'type'
    ];
}

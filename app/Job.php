<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    public $fillable = [
        'contact', 'name', 'description', 'required', 'salary', 'address', 'business_id', 'location',
        'collected_count', 'delivered_count', 'commented_count', 'passes_count'
    ];

    public function business() {
        return $this->belongsTo(Business::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function delivers() {
        return $this->hasMany(Deliver::class)->with('user');
    }
}

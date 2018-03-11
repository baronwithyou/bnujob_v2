<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    //
    protected $fillable = [
        'name', 'user_id', 'mobile', 'province', 'city', 'address', 'school', 'avatar',
        'type', 'abstract', 'status', 'collected_count', 'delivered_count', 'passes_count'
    ];

    public function jobs() {
        return $this->hasMany(Job::class, 'business_id')->with('delivers');
    }
}

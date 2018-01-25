<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends \TCG\Voyager\Models\User
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'confirmation_token', 'mobile',
        'real_name', 'nickname', 'school', 'province', 'city', 'address', 'company', 'website',
        'birthday', 'gender', 'age', 'grade', 'abstract', 'wechat', 'role_id', 'confirmation_token',
        'status', 'store_show', 'is_active', 'reputation', 'delivers_count', 'collects_count',
        'comments_count', 'likes_count', 'followings_count', 'followers_count', 'primary_resume_id',
        'credit_id', 'config', 'remember_token', 'avatar', 'email_at', 'api_token',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function isAdmin()
    {
        return $this->role_id == 1;
    }

    public function resume() {
        return $this->hasOne("App\Resume", "user_id", 'id');
    }

    public function hasBusiness() {
        return Business::where('user_id', $this->id)->first();
    }
}

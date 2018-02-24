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

    public function business() {
        if (!$this->hasBusiness())
            return 0;
        return Business::where('user_id', $this->id)->first();
    }

    // 推荐算法
    public function getRecommendation()
    {
        $evaluated = Evaluate::where('user_id', $this->id)->pluck('grade', 'job_id')->toArray();
        $job_ids = array_keys($evaluated);
        $other_evaluated = Evaluate::whereIn('job_id', $job_ids)->where('user_id', '<>', $this->id)->get([
            'user_id', 'job_id', 'grade'
        ]);
        $others = [];
        foreach ($other_evaluated as $item) {
            $others[$item->user_id][$item->job_id] = $item->grade;
        }
        $tmp = 0;
        foreach ($evaluated as $grade) {
            $tmp += $grade * $grade;
        }
        $fix = sqrt($tmp);
        foreach ($others as $user_id => $items) {
            $top = $bottom = 0;
            if (count($items) < count($job_ids)) {
                $need = array_diff($job_ids, array_keys($items));
                foreach ($need as $job_id) {
                    $others[$user_id][$job_id] = 0;
                }
            }
            foreach($others[$user_id] as $key => $value) {
                $top += ($value * $evaluated[$key]);
                $bottom += $value * $value;
            }
            $others[$user_id] = $top / sqrt($bottom) * $fix;
        }
        return $others;
    }
}

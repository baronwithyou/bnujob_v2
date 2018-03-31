<?php

namespace App;

use Carbon\Carbon;
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
        return $this->hasOne(Business::class);
//        if (!$this->hasBusiness())
//            return 0;
//        return Business::where('user_id', $this->id)->first();
    }

    public function hasPrimaryResume() {
        return !is_null($this->primary_resume_id) ? true : false;
    }

    public function delivers() {
        return $this->hasMany(Deliver::class, 'resume_id', 'primary_resume_id')->orderBy('created_at', 'desc');
    }

    public function evaluates() {
        return $this->hasMany(Evaluate::class);
    }

    public function unCheckMsg() {
        $delivers = $this->delivers;
        $count = 0;
        foreach ($delivers as $deliver) {
            if ($deliver->status != 'tentative' && $deliver->receive == 0)
                $count++;
        }
        return $count;
    }

    public function getHighEvaluate() {
        return Evaluate::where('user_id', $this->id)->orderBy('grade', 'desc')->value('job_id');
    }

    public function hasTooMuchDeliver() {
        $count = Deliver::where('resume_id', $this->primary_resume_id)->whereDate('created_at', Carbon::now()->toDateString())->count();
        if ($count > (5 + ($this->reputation / 20))) {
            return true;
        }
        return false;
    }

    public function getResumeColumnCount() {
        if (empty($this->resume)) {
            return 0;
        }
        $count = 0;
        $all = 0;
        $except = ['id', 'user_id', 'created_at', 'updated_at'];
        foreach ($this->resume as $name => $column) {
            $all++;
            if (!empty($column) && !in_array($column, $except)) {
                $count++;
            }
        }
        return $count / $all * 100;
    }

    // 推荐算法
    public function getRecommendation()
    {
        $evaluated = Evaluate::where('user_id', $this->id)->pluck('grade', 'job_id')->toArray();
        $job_ids = array_keys($evaluated);
        // 选出其他对该用户打过分的信息
        $other_evaluated = Evaluate::whereIn('job_id', $job_ids)->where('user_id', '<>', $this->id)->get([
            'user_id', 'job_id', 'grade'
        ]);
        $others = [];
        // 获取已操作过的用户id、兼职id以及评分
        foreach ($other_evaluated as $item) {
            $others[$item->user_id][$item->job_id] = $item->grade ;
        }
        $tmp = 0;
        // 总和该用户评分的平方
        foreach ($evaluated as $grade) {
            $tmp += $grade * $grade;
        }
        $fix = sqrt($tmp);
        $result = [];

        foreach ($others as $user_id => $other) {
            $top = 0;
            $bottom = 0;
            foreach ($other as $job_id => $grade) {
                $top += $grade * $evaluated[$job_id]; //分子
                $bottom += $grade * $grade; // 分母
            }
            if($bottom == 0)
                continue;
            if ($bottom != 0 && $fix != 0)
                $result[$user_id] = $top / sqrt($bottom) / $fix;
        }
        arsort($result);
        return $result; // 返回的是['user_id' => cos(差值)]
    }
}

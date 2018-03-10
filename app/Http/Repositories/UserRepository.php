<?php
/**
 * Created by PhpStorm.
 * User: Martin
 * Date: 2017/9/29
 * Time: 9:30
 */

namespace App\Http\Repositories;

use Auth;
use App\Evaluate;
use App\Http\Mail\ActivateMail;
use App\Resume;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UserRepository
{

    public function needToActivate()
    {
        if (!Auth::check()) {
            return false;
        }
        $user = Auth::user();
        if ($user->mobile || $user->is_active || ($user->email_at && Carbon::now()->diffInHours(new Carbon($user->email_at)) < 12) || $user->isAdmin()) {
            return false;
        }
        return true;
    }



    public function emailToVerify()
    {
        $user = Auth::user();
        $user->email_at = Carbon::now();
        $user->save();
        ActivateMail::send($user->id, $user->name, $user->confirmation_token ,$user->email);
    }

    /**
     * @param Request $request
     * @param $type
     * @return mixed
     * 保存用户简历信息
     */
    public function resumeStoreUpdate($type, $data)
    {
        $user = Auth::user()->id;
        $resume = Resume::where('user_id', $user)->first();
        if (!$resume) {
            return $this->createResume($data, $type, $user);
        } else {
//            $resume->$type = $data;
//            $resume->save();
            $resume->update([
                $type => $data
            ]);
        }
        return $resume;
    }

    private function createResume($data, $type, $user)
    {
        $resume = Resume::create([
            'user_id' => $user,
            $type => $data
        ]);
        return $resume;
    }


    public function update($data) {
        $num = Auth::user()->update($data);
        if ($num)
            return true;
        return false;
    }
}
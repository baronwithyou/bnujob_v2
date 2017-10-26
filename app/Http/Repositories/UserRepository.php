<?php
/**
 * Created by PhpStorm.
 * User: Martin
 * Date: 2017/9/29
 * Time: 9:30
 */

namespace App\Http;


use App\Http\Mail\ActivateMail;
use App\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class UserRepository
{
    public function create(array $attr)
    {
        return User::create($attr);
    }

    public function checkMobileExists($mobile)
    {
        return User::where('mobile', $mobile)->first();
    }

    public function activateEmail($token)
    {
        $user = User::where('confirmation_token', $token)->first();
        if (!$user) {
            return false;
        }
        $user->is_active = 1;
        $user->save();
        return $user;
    }

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

    public function updateConfirmationToken($token)
    {
        User::where('confirmation_token', $token)->update([
            'confirmation_token' => str_random(40)
        ]);
        return;
    }

    public function emailToVerify()
    {
        $user = Auth::user();
        $user->email_at = Carbon::now();
        $user->save();
        ActivateMail::send($user->id, $user->name, $user->confirmation_token ,$user->email);
    }
}
<?php
/**
 * Created by PhpStorm.
 * User: Martin
 * Date: 2017/9/29
 * Time: 9:30
 */

namespace App\Http;


use App\User;

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
}
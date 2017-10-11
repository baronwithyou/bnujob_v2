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
}
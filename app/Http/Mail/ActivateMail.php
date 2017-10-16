<?php
/**
 * Created by PhpStorm.
 * User: Martin
 * Date: 2017/10/16
 * Time: 17:53
 */

namespace App\Http\Mail;


class ActivateMail extends Email
{
    public static function send($name, $confirmation_token, $send_to)
    {
        $bind_data = ['name' => $name, 'url' => route('activate', $confirmation_token)];
        self::sendByTemplate('email_register_activate', $bind_data, $send_to);
    }
}
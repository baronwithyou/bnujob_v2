<?php
/**
 * Created by PhpStorm.
 * User: Martin
 * Date: 2017/10/16
 * Time: 17:47
 */

namespace App\Http\Mail;

use Mail;
use Naux\Mail\SendCloudTemplate;

class Email
{
    protected static function sendByTemplate($template_name, $bind_data, $send_to)
    {
        $template = new SendCloudTemplate($template_name, $bind_data);

        Mail::raw($template, function ($message) use ($send_to) {
            $message->from('martinhacker1@outlook.com', 'BnuJob社区');

            $message->to($send_to);
        });
    }
}
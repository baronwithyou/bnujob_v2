<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 28/09/2017
 * Time: 23:31
 */

namespace App\Http;


class Helpers
{
    public static function isMobile($mobile)
    {
        return preg_match("/^1[3|4|5|7|8]\d{9}$/", $mobile);
    }

    private static function ajaxReturn($status, $msg, $data)
    {
        $response = json_encode([
            'status' => $status,
            'msg' => $msg,
            'data' => $data
        ]);
        echo $response;
    }

    public static function ajaxSuccess($msg = '', $data = [])
    {
        self::ajaxReturn(1, $msg, $data);
    }

    public static function ajaxFail($msg = '', $data = [])
    {
        self::ajaxReturn(0, $msg, $data);
    }

    public static function getRandomVerifyCode()
    {
        return rand(0, 9).rand(0, 9).rand(0, 9).rand(0, 9).rand(0, 9).rand(0, 9);
    }
}
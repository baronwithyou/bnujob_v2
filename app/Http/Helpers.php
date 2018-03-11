<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 28/09/2017
 * Time: 23:31
 */

namespace App\Http;


use App\Comment;
use App\User;

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

    public static function getRandomAnimate()
    {
        $animation = ['bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp',
            'fadeIn', 'fadeInDown', 'fadeInLeft', 'fadeInRight', 'fadeInUp',
            'zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp',
            'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight',
            'flipInX', 'flipInY', 'lightSpeedIn', 'rollIn', 'bounce', 'pulse', 'rubberBand', 'shake',
            'swing', 'tada', 'wobble'];
        return $animation[rand(0, count($animation) - 1)];
    }

    public static function checkMobileExists($mobile)
    {
        return User::where('mobile', $mobile)->first();
    }

    public static function checkVerifyMatch($verify_code)
    {
        if (session()->has('verify_code')) {
            return $verify_code == session()->get('verify_code');
        }
        return false;
    }

    public static function checkCommented($user_id, $job_id)
    {
        $record = Comment::where('job_id', $job_id)->where('user_id', $user_id)->first();
        if ($record)
            return true;
        return false;
    }

    // 展示用户简历json数据
    public static function displayJsonData($data) {
        if (is_null($data))
            return '暂无';
        $all = json_decode($data);
        return $all->start_at ."-" .$all->end_at ."<br>" .nl2br(htmlentities($all->description));
    }
}
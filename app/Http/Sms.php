<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 10/10/2017
 * Time: 18:39
 */

namespace App\Http;
use App\Http\Helpers;
use \Yunpian\Sdk\YunpianClient;


class Sms
{
    public static function send($mobile, $verify_code)
    {
        $msg = self::getRegisterText($verify_code);
        if (!self::hasApiKey())
            return ['status' => false, 'data' => []];
        $apikey = self::getApiKey();
        $clnt = YunpianClient::create($apikey);
        $param = [YunpianClient::MOBILE => $mobile,YunpianClient::TEXT => $msg];
        $r = $clnt->sms()->single_send($param);
        return ['status' => true, 'code' => $r];
    }

    private static function getApiKey()
    {
        return config('content.apikey');
    }

    private static function hasApiKey() {
        return config('content.apikey') ? true : false;
    }

    private static function getRegisterText($verify_code) {
        return '【BnuJob社区】'.$verify_code.' 验证 :)';
    }
}
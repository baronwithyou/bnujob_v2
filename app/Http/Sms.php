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
        $msg = '【BnuJob社区】'.$verify_code.' 验证 :)';
        $apikey = self::getApiKey();
        if (!$apikey)
            return ['status' => false, 'data' => []];
        $clnt = YunpianClient::create($apikey);
        $param = [YunpianClient::MOBILE => $mobile,YunpianClient::TEXT => $msg];
        $r = $clnt->sms()->single_send($param);
        return ['status' => true, 'code' => $r];
    }

    private static function getApiKey()
    {
        $apikey = config('content.apikey');
        return self::checkApiKey($apikey) ? $apikey : false;
    }

    private static function checkApiKey($apikey)
    {
        return $apikey ? true : false;
    }
}
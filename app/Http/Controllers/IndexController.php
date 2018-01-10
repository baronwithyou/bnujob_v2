<?php

namespace App\Http\Controllers;

use App\Http\Helpers;
use App\Http\Sms;
use App\Http\UserRepository;
use App\User;
use Carbon\Carbon;
use function GuzzleHttp\Psr7\str;
use Illuminate\Support\Facades\Auth;
use JavaScript;
use Illuminate\Http\Request;

class IndexController extends Controller
{


    /**
     * IndexController constructor.
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function index()
    {
        $needToActivate = $this->userRepository->needToActivate();

        return view('welcome', compact('needToActivate'));
    }

    public function test()
    {
        return view('test');
    }

    public function jobDetail($id)
    {
        return view('job');
    }

    public function getVerifyCode(Request $request)
    {
        $mobile = $request->input('mobile', null);
        if (is_null($mobile) || !Helpers::isMobile($mobile)) {
            Helpers::ajaxFail('请输入正确手机号码');
            return;
        }

        if (Helpers::checkMobileExists($mobile)) {
            Helpers::ajaxFail('该手机号已经被使用');
            return;
        }

        $verify_code = Helpers::getRandomVerifyCode();

        if (config('app.debug')) {
            Helpers::ajaxSuccess('【local】发送成功，请在手机上查看 '.$verify_code, ['verify_code' => $verify_code]);
            session()->put('verify_code', $verify_code);
            return;
        }

        $callback = Sms::send($mobile, $verify_code);
        if (!$callback['status'] || substr($callback['code'], 0, 1) != 0) {
            Helpers::ajaxFail('服务器错误， 请稍后再试');
            return;
        }
        session()->put('verify_code', $verify_code);
        Helpers::ajaxSuccess('发送成功，请在手机上查看', $callback);
        return;
    }

}

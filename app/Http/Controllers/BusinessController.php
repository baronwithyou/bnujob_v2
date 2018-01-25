<?php

namespace App\Http\Controllers;

use App\Business;
use App\User;
use Auth;
use App\Http\Repositories\BusinessRepository;
use App\Http\Helpers;
use App\Http\Identity;
use App\Http\Repositories\UserRepository;
use Illuminate\Http\Request;

class BusinessController extends Controller
{
    private $businessRepository;
    private $userRepository;
    public function __construct(BusinessRepository $businessRepository, UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
        $this->businessRepository = $businessRepository;
    }

    public function index(Request $request)
    {
        if (!Auth::user()->hasBusiness())
            return redirect()->route('business.certificate');

        return view('business');
    }

    public function publish()
    {
        return view('publish');
    }

    public function certificate()
    {
        if (Auth::user()->hasBusiness())
            return redirect()->route('business.index');

        return view('assistance.certificate');
    }

    public function certificateFirst(Request $request) {
        $all = $request->all();
        // 身份证验证
        $identity = new Identity();
        $this->validate($request, [
            'mobile' => 'required',
            'real_name' => 'required',
            'identity' => 'required'
        ]);
        if (!$identity || !$identity->isChinaIDCard($all['identity'])) {
            Helpers::ajaxFail('', ['type' => 'identity', 'msg' => '身份证不正确']);
            return;
        }
        // 手机号和验证码验证
        if ($all['is_new'] && !Helpers::checkVerifyMatch($all['verify_code'])) {
            Helpers::ajaxFail('', ['type' => 'mobile','msg' => '手机号或者验证码错误']);
            return;
        }

        $first = [
            'real_name' => $all['real_name'],
            'credit_id' => $all['identity'],
            'is_new' => $all['is_new'],
            'verify_code' => $all['verify_code'],
            'mobile' => $all['mobile']
        ];

        session()->put('first', $first);
        session()->put('first_pass', true);
        Helpers::ajaxSuccess();
        return;
    }

    public function certificateSecond(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'type' => 'required',
            'abstract' => 'required'
        ], [], [
            'name' => '店铺名称',
            'type' => '店铺类型',
            'abstract' => '店铺简介'
        ]);
        $all = $request->all();
        $first_data = session()->get('first');
        $all['user_id'] = Auth::user()->id;
        $all['mobile'] = $first_data['mobile'];
//        $business_exists = User::find($all['user_id']);
        if (!session()->has('first_pass')) {
            Helpers::ajaxFail('请先进行实名认证');
            return;
        }

//        if ($business_exists) {
//            Helpers::ajaxFail('该手机已经注册过');
//            return;
//        }
        $this->userRepository->update($first_data);
        $this->businessRepository->create($all);
        session()->forget('first');
        session()->forget('first_pass');
        Helpers::ajaxSuccess('申请成功');
        return;
    }

    public function test() {
//        Business::create([
//            'user_id' => 1,
//            'name' => '金拱门',
//            'mobile' => '13106803427',
//            'type' => 'catering',
//            'abstract' => '123123'
//        ]);
//        session()->forget('first');
//        session()->forget('first_pass');
//        $identity = new Identity();
//        dump(session()->get('first'));
//        dump($identity->isChinaIDCard('441424199709151014'));
    }
}

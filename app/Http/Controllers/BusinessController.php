<?php

namespace App\Http\Controllers;

use App\Business;
use Auth;
use App\Http\Repositories\BusinessRepository;
use App\Http\Helpers;
use App\Http\Identity;
use App\Http\Repositories\UserRepository;
use Illuminate\Http\Request;
use Image;
use Storage;

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

        $business = Business::where('user_id', Auth::user()->id)->first();
        return view('business', compact('business'));
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

    public function publishStore(Request $request)
    {
        $this->validate($request, [
            'contact' => 'required',
            'salary' => 'required|digits_between:1,10000',
            'description' => 'required',
            'required' => 'required',
            'name' => 'required',
            'address' => 'required'
        ], [], [
            'address' => '工作地址',
            'salary' => '薪资',
            'description' => '工作描述',
            'required' => '岗位需求',
            'name' => '工作名称',
            'contact' => '联系方式',
        ]);
        $data = $request->all();
        $this->businessRepository->createJob($data);
        Helpers::ajaxSuccess('发布成功');
        return;
    }

    public function certificateFirst(Request $request)
    {
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
            'mobile' => $all['mobile'],
//            'avatar' => 'images/404.png'
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
        $all['avatar'] = 'images/404.png';
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

    public function avatarStore(Request $request)
    {
        //加入权限判断
        $input = $request->all();
        $user  = Auth::user()->business();

        if (isset($input['is_default_avatar']) and $input['is_default_avatar']) {
            $user->avatar = $input['image'];
            $user->save();
            return Helpers::ajaxSuccess();
        }

        try {
            $crop_img = Image::make($input['image']);

            //裁剪的一些参数
            $width  = intval($input['selectArray']['w'] / $input['display_size']['0'] * $crop_img->width());
            $height = intval($input['selectArray']['h'] / $input['display_size']['1'] * $crop_img->height());

            $x = intval($input['selectArray']['x'] / $input['display_size']['0'] * $crop_img->width());
            $y = intval($input['selectArray']['y'] / $input['display_size']['1'] * $crop_img->height());

            $crop_img->crop($width, $height, $x, $y);

            Storage::put('public/business/' . $crop_img->basename, $crop_img->stream());

            $user->avatar = 'storage/business/' . $crop_img->basename;
            $user->save();
            return Helpers::ajaxSuccess(null, ['url' => $user->avatar]);
        } catch (Exception $e) {
            return Helpers::ajaxFail('裁剪异常，请重试');
        }
    }

    public function test() {
        $s = Business::find(10)->abstract;
        return nl2br($s);
    }

    public function updateProfile(Request $request) {
        $data = $request->all();
        if (is_null($data['abstract']) || is_null($data['type'])) {
            Helpers::ajaxFail('请填写简介');
            return;
        }
        $this->businessRepository->update($data);
        Helpers::ajaxSuccess();
        return;
    }
}

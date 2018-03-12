<?php

namespace App\Http\Controllers;

use App\Deliver;
use App\Http\Helpers;
use App\Http\Sms;
use App\Http\Repositories\UserRepository;
use App\Job;
use App\User;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    /**
     * IndexController constructor.
     */
    private $userRepository;
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function index()
    {
        $needToActivate = $this->userRepository->needToActivate();

        $jobs = Job::orderBy('created_at', 'desc')->get();

        $job_ids = [];
        if (\Auth::check()) {
            $similar_users = \Auth::user()->getRecommendation();
            foreach ($similar_users as $user => $grade) {
                $job_ids[] = User::find($user)->getHighEvaluate();
            }
        }
        $job_ids = array_unique($job_ids);
        $recommendation = Job::whereIn('id', $job_ids)->get();
        if (count($job_ids) < 5){
            $recommendation = $recommendation->merge(Job::orderBy('delivered_count', 'desc')->limit(5 - count($job_ids))->get());
        }

        return view('welcome', compact('needToActivate', 'jobs', 'recommendation'));
    }

    public function test()
    {
        dump(\Auth::user()->getRecommendation());
//        return view('test');
    }

    private function checkFileType($file, $types)
    {
        if (in_array($file->getMimeType(), $types)) {
            return true;
        } else {
            return false;
        }
    }

    private function checkFileSize($file, $size)
    {
        if ($file->getSize() < $size) {
            return true;
        } else {
            return false;
        }
    }

    public function uploadImage(Request $request) {
        $file_types = ['image/png', 'image/jpeg'];
        $temp_dir   = 'uploads/temp/';
        if ($request->hasFile('file') && $request->file('file')->isValid()) {
            //上传图片
            $image = $request->file('file');
            if (!$this->checkFileType($image, $file_types)) {
                Helpers::ajaxFail('文件类型错误，请上传jpg或png格式的文件');
                return;
            }
            if (!$this->checkFileSize($image, 2 * 1024 * 1024)) {
                Helpers::ajaxFail('文件太大，请上传2MB以内的文件');
                return;
            }
            $new_name = uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move($temp_dir, $new_name);
            $file     = $temp_dir . $new_name;

            Helpers::ajaxSuccess($file);
            return;
        }

        Helpers::ajaxFail('文件上传出错，请重试');
        return;
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

        session()->put('mobile', $mobile);
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

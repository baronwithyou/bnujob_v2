<?php

namespace App\Http\Controllers;

use Auth;
use App\Deliver;
use App\Evaluate;
use App\Http\Helpers;
use App\Http\Sms;
use App\Http\Repositories\UserRepository;
use App\Job;
use App\Resume;
use App\User;
use Carbon\Carbon;
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
//        dump(Deliver::where('resume_id', Auth::user()->primary_resume_id)->whereDate('created_at', Carbon::now()->toDateString())->count());
        $needToActivate = $this->userRepository->needToActivate();

        $jobs = Job::orderBy('created_at', 'desc')->with('business')->limit(30)->get();
        $forbidden = [];

        $job_ids = [];
        if (\Auth::check()) {
            $similar_users = \Auth::user()->getRecommendation();
            $i = 0;
            foreach ($similar_users as $user => $grade) {
                if ($i++ > 5)
                    break;
                $job_ids[] = User::find($user)->getHighEvaluate();
            }
            if (!empty(Auth::user()->resume)) {
                $forbidden = Deliver::where('resume_id', Auth::user()->resume->id)->pluck('job_id')->toArray();
            }
        }
        $job_ids = array_unique($job_ids);
        $recommendation = Job::whereIn('id', $job_ids)->whereNotIn('id', $forbidden)->limit(5)->with('business')->get();
        if (count($recommendation) < 5){
            $recommendation = $recommendation->merge(Job::orderBy('delivered_count', 'desc')->whereNotIn('id', $forbidden)->limit(5 - count($job_ids))->orderBy('created_at', 'desc')->with('business')->get());
        }

        return view('welcome', compact('needToActivate', 'jobs', 'recommendation'));
    }

    public function test()
    {
//        $user = \Auth::user();
//        $job_id = Evaluate::where('user_id', $user->id)->orderBy('job_id')->pluck('job_id');
//        dump(Evaluate::where('user_id', 12)->whereIn('job_id', $job_id)->orderBy('job_id')->pluck('grade', 'job_id'));

//        dump($user->getRecommendation());
//        return view('test');

//        for ($i = 0; $i < 210; $i++) {
//            do {
//                $user_id = User::inRandomOrder()->value('id');
//                $job_id = Job::inRandomOrder()->value('id');
//                $record = Evaluate::where('user_id', $user_id)->where('job_id', $job_id)->first();
//            } while(!is_null($record) && Evaluate::count() < 1000);
//            Evaluate::create([
//                'grade' => rand(0, 10),
//                'user_id' => $user_id,
//                'job_id' => $job_id
//            ]);
//        }
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

    public function resumeDownload($resume_id) {
        $resume = Resume::find($resume_id);
        return response()->download(public_path().'/storage'.$resume->upload_location, $resume->resume_name);
    }

}

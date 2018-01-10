<?php

namespace App\Http\Controllers;

use App\Evaluate;
use App\Http\Helpers;
use App\Http\UserRepository;
use App\Resume;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    private $userRepository;
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        return view('user', compact('user'));
    }

    public function activateEmail($token)
    {
        $user = User::where('confirmation_token', $token)->first();
        if (!$user) {
            return false;
        }
        $user->is_active = 1;
        $user->save();
        return $user;
    }

    public function updateConfirmationToken($token)
    {
        User::where('confirmation_token', $token)->update([
            'confirmation_token' => str_random(40)
        ]);
        return;
    }

    // 用户邮箱验证
    public function activate($token)
    {
        $user = $this->activateEmail($token);
        if (!$user) {
            return redirect('/')->withErrors('链接错误或者已经失效');
        }
        $this->updateConfirmationToken($token);
        Auth::login($user);
        return redirect('/')->with('login_success', ['title' => 'Welcome Back! :)', 'msg' => '邮箱激活成功，欢迎回来', 'avatar' => $user->avatar]);
    }

    public function resumeUpdate(Request $request, $type) {
        $resume = $this->userRepository->storeDetail($request, $type);
        if ($resume) {
            Helpers::ajaxSuccess('修改成功');
            return;
        }
        Helpers::ajaxFail('修改失败');
        return;
    }

    public function infoUpdate(Request $request) {
        $result = $this->userRepository->update($request->all());
        if ($result) {
            Helpers::ajaxSuccess();
            return;
        }
        Helpers::ajaxFail();
        return;
    }

    // 推荐算法
    public function getRecommendation()
    {
        $evaluated = Evaluate::where('user_id', 1)->pluck('grade', 'job_id')->toArray();
        $job_ids = array_keys($evaluated);
        $other_evaluated = Evaluate::whereIn('job_id',$job_ids)->where('user_id', '<>', 1)->get([
            'user_id', 'job_id', 'grade'
        ]);
        $others = [];
        foreach ($other_evaluated as $item) {
            $others[$item->user_id][$item->job_id] = $item->grade;
        }
        $tmp = 0;
        foreach ($evaluated as $grade) {
            $tmp += $grade * $grade;
        }
        $fix = sqrt($tmp);
        foreach ($others as $user_id => $items) {
            $top = $bottom = 0;
            if (count($items) < count($job_ids)) {
                $need = array_diff($job_ids, array_keys($items));
                foreach ($need as $job_id) {
                    $others[$user_id][$job_id] = 0;
                }
            }
            foreach($others[$user_id] as $key => $value) {
                $top += ($value * $evaluated[$key]);
                $bottom += $value * $value;
            }
            $others[$user_id] = $top / sqrt($bottom) * $fix;
        }
        return $others;
    }

    private function getAverageGrade($job_id) {
        return Evaluate::where('job_id', $job_id)->avg('grade');
    }

    public function emailToVerify()
    {
        $this->userRepository->emailToVerify();
    }

    public function deliverStatus()
    {
        return view('deliver_status');
    }

    // api
    public function getConfig($user)
    {
//        $user = Auth::user();
        return $user->config;
    }

    public function updateConfig($user)
    {
//        $user = Auth::user();
        $config = json_decode($user->config);
        $open_type = $config->open_type;
        if ($open_type == 'modal') {
            $config = json_encode(['open_type' => 'normal']);
        } else {
            $config = json_encode(['open_type' => 'modal']);
        }
        $user->update(['config' => $config]);
        return $config;
    }

    public function resumeGet($type)
    {
        return optional(Auth::guard('api')->user()->resume)->$type;
    }
}

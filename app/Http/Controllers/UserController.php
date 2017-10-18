<?php

namespace App\Http\Controllers;

use App\Http\UserRepository;
use App\User;
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

    // 用户邮箱验证
    public function activate($token)
    {
        $user = $this->userRepository->activateEmail($token);
        if (!$user) {
            return redirect('/')->withErrors('链接错误或者已经失效');
        }
        $this->userRepository->updateConfirmationToken($token);
        Auth::login($user);
        return redirect('/')->with('login_success', ['title' => 'Welcome Back! :)', 'msg' => '邮箱激活成功，欢迎回来', 'avatar' => $user->avatar]);
    }

    public function emailToVerify(Request $request)
    {
        $this->userRepository->emailToVerify();
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
}

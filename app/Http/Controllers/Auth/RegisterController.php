<?php

namespace App\Http\Controllers\Auth;

use App\Http\Helpers;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use App\Http\UserRepository;
use Illuminate\Auth\Events\Registered;
use Symfony\Component\Console\Helper\Helper;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(UserRepository $repository)
    {
        $this->middleware('guest');
        $this->repository = $repository;
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        if (isset($data['email'])) {
            $validate = Validator::make($data, [
                'name' => 'required|string|max:255|unique:users',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6|confirmed',
            ]);
        } else {
            $validate = Validator::make($data, [
                'name' => 'required|string|max:255|unique:users',
                'mobile' => 'required|is_mobile|unique:users',
                'verify_code' => 'required',
                'password' => 'required|string|min:6',
            ]);
        }
        return $validate;
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        $attr = [
            'name' => $data['name'],
            'password' => bcrypt($data['password']),
            'confirmation_token' => str_random(40),
            'active' => 0,
            'config' => json_encode(['open_type' => 'modal']),
            'avatar' => 'images/avatar/user'.rand(1, 10).".png",
        ];
        if (isset($data['email'])) {
            $attr['email'] = $data['email'];
        } else {
            $attr['mobile'] = $data['mobile'];
        }
        return $this->repository->create($attr);
    }

    public function register(Request $request)
    {
        $this->validator($request->all())->validate();

        if (!$this->checkVerifyMatch($request->verify_code)) {
            $err = 'Sorry,验证码不正确:(';
            if ($request->ajax()) {
                Helpers::ajaxFail($err);
                return;
            } else {
                return redirect()->back()->withErrors($err);
            }
        }

        event(new Registered($user = $this->create($request->all())));

        $this->guard()->login($user);
        if ($request->ajax()) {
            Helpers::ajaxSuccess('注册成功', ['avatar' => $user->avatar]);
            return;
        } else {
            return $this->registered($request, $user)
                ?: redirect($this->redirectPath());
        }
    }

    protected function registered(Request $request, $user)
    {
        $data = $request->all();
        if (isset($data['email'])) {
            return redirect()->back()->with('warning', '注册成功，请点击此验证你的邮箱');
        } else {
            return redirect()->back()->with('success', '注册成功');
        }
    }

    protected function checkVerifyMatch($verify_code)
    {
        if (session()->has('verify_code')) {
            return $verify_code == session()->get('verify_code');
        }
        return false;
    }
}

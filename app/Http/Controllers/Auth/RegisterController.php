<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use App\Http\UserRepository;
use Illuminate\Auth\Events\Registered;

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
            'active' => 0
        ];
        if (isset($data['email'])) {
            $attr[] = ['email' => $data['email']];
        } else {
            $attr[] = ['mobile' => $data['mobile']];
        }
        return $this->repository->create($attr);
    }

    public function register(Request $request)
    {
        $this->validator($request->all())->validate();

        // 验证输入的验证码和实际验证码是否匹配
        event(new Registered($user = $this->create($request->all())));

        $this->guard()->login($user);

        if ($request->ajax()) {
            echo "来自原始register controller";
            return;
        }
        return $this->registered($request, $user)
            ?: redirect($this->redirectPath());
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
}

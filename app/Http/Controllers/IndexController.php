<?php

namespace App\Http\Controllers;

use App\Http\Helpers;
use App\User;
use JavaScript;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index()
    {
//        JavaScript::put([
//            'age' => '29'
//        ]);
//        $config = User::first()->config;
//        $decode_config = json_decode($config);
//        dump($decode_config->open_type);
//        $config = json_encode(['a' => 'b']);
//
//        User::find(1)->update([
//            'config' => $config
//        ]);

        return view('welcome');
    }

    public function jobDetail($id)
    {
        return view('job');
    }

    public function getVerifyCode(Request $request)
    {
//        return $request->mobile;
        Helpers::ajaxSuccess('Hello world', ['mobile' => $request->mobile]);
    }
}

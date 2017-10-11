<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
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

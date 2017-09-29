<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function registerByAjax(Request $request)
    {
        if ($request->ajax()) {
            echo "hello world";
        }
        return;
    }
}

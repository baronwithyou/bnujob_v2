<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BusinessController extends Controller
{
    public function certificate()
    {
        return view('assistance.certificate');
    }
}

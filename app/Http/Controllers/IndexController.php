<?php

namespace App\Http\Controllers;

use JavaScript;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index()
    {
        JavaScript::put([
            'age' => '29'
        ]);
        return view('welcome');
    }

    public function jobDetail($id)
    {
        return view('job');
    }
}

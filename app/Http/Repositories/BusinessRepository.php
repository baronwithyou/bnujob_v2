<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 19/01/2018
 * Time: 20:56
 */

namespace App\Http\Repositories;

use App\Job;
use Auth;
use App\Business;

class BusinessRepository
{
    public function create($data) {
        Business::create($data);
    }

    public function createJob(Array $data) {
        if (($business_id = Auth::user()->getBusiness()) != 0) {
            $data['business_id'] = $business_id;
        }
        $data['description'] = htmlentities($data['description']);
        $data['required'] = htmlentities($data['required']);
        Job::create($data);
    }
}
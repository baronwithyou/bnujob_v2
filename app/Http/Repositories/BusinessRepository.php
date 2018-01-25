<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 19/01/2018
 * Time: 20:56
 */

namespace App\Http\Repositories;


use App\Business;

class BusinessRepository
{
    public function create($data) {
        Business::create($data);
    }
}
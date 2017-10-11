@extends('layouts.app')

@section('title', '个人档案')

@section('top')
<section class="user-banner">
    <div class="container">
        <div class="col-xs-6 col-md-2">
            <img src="{{ asset($user->avatar) }}" class="img img-responsive img-circle" alt="">
            <p class="user-name">{{ $user->name }}</p>
        </div>
        <div class="col-xs-6 col-md-3">
            <div class="reputation-div">
                <span class="btn-reputation">声望 {{ $user->reputation }}</span>
            </div>
            <div class="edit-banner-info">
                <p><span class="fa fa-map-marker"></span><a href="">填写现居城市</a></p>
                <p><span class="fa fa-graduation-cap"></span><a href="">填写所在院校</a></p>
                <p><span class="fa fa-building-o"></span><a href=""></a></p>
                <p><span class="fa fa-building-o"></span><a href=""></a></p>
            </div>
        </div>
        <div class="hidden-xs col-md-7">
            <div class="ocean">
                <div class="ocean-middle pull-right">
                    <img src="{{ asset('images/ocean/shark.png') }}" class="shark" alt="">
                    <img src="{{ asset('images/ocean/fishes.png') }}" class="fishes" alt="">
                </div>
                <div class="ocean-bottom pull-right">
                    <img src="{{ asset('images/ocean/bottom1.png') }}" class="barnacle" alt="">
                    <img src="{{ asset('images/ocean/bottom2.png') }}" class="coral" alt="">
                    <img src="{{ asset('images/ocean/bottom3.png') }}" class="sea-weed" alt="">
                </div>
            </div>
        </div>
    </div>
</section>
@stop

@section('content')
    <div class="row user-content">
        <div class="col-md-2">
            <div class="row">
                <div class="col-md-6" style="border-right: 1px solid #eeeeee;">关注了</div>
                <div class="col-md-6">粉丝</div>
            </div>
            <hr>
        </div>
        <div class="col-md-7">
            <div class="panel panel-default user-private-info">
                <div class="panel-heading">
                    个人档案
                    <button class="btn btn-link pull-right"><i class="fa fa-edit"></i> 编辑</button>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-xs-3">
                            <p>真人头像 <span class="fa fa-lock"></span></p>
                            <div class="user-avatar">
                                <img src="{{ asset($user->avatar) }}" class="img img-responsive" alt="">
                            </div>
                        </div>
                        <div class="col-xs-4">
                            <p class="list-title">真实姓名 <span class="fa fa-lock"></span></p>
                            <p>{{ $user->real_name ?? '暂无' }}</p>
                            <p class="list-title">出生日期</p>
                            <p>{{ $user->birthday ?? '1970-01-01' }}</p>
                            <p class="list-title">手机号码 <span class="fa fa-lock"></span></p>
                            <p>{{ $user->mobile ?? '暂无' }}</p>
                            <p class="list-title">现居城市</p>
                            <p>{{ $user->city ?? '暂无' }}</p>
                        </div>
                        <div class="col-xs-5">
                            <p class="list-title">性别</p>
                            <p>保密</p>
                            <p class="list-title">Email <span class="fa fa-lock"></span></p>
                            <p>{{ $user->email ?? '暂无' }}</p>
                            <p class="list-title">通讯地址 <span class="fa fa-lock"></span></p>
                            <p>{{ $user->address ?? '暂无' }}</p>
                        </div>
                    </div>
                    <hr>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="panel panel-default">
                <div class="panel-heading">个人档案</div>
                <div class="panel-body">

                </div>
            </div>
        </div>
    </div>
@stop


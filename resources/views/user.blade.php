@extends('layouts.app')

@section('title', '个人档案')

@section('top')
<section class="user-banner">
    <div class="container">
        <div class="col-xs-4 col-md-2">
            <img src="{{ asset('images/user.png') }}" class="img img-responsive img-circle" alt="">
            <p class="user-name"><i class="fa fa-rocket"></i> Martinhacker</p>
        </div>
        <div class="col-xs-8 col-md-3">
            <div class="reputation-div">
                <span class="btn-reputation">声望 20</span>
            </div>
            <div class="edit-banner-info">
                <p><span class="fa fa-map-marker"></span><a href="">填写现居城市</a></p>
                <p><span class="fa fa-graduation-cap"></span><a href="">填写所在院校</a></p>
                <p><span class="fa fa-building-o"></span><a href=""></a></p>
                <p><span class="fa fa-building-o"></span><a href=""></a></p>
            </div>
        </div>
        <div class="col-md-7"></div>
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
            <div class="panel panel-default">
                <div class="panel-heading">个人档案</div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-3">
                            <p>真人头像 <span class="fa fa-lock"></span></p>
                            <img src="{{ asset('images/user.png') }}" class="img img-responsive" alt="">
                        </div>
                        <div class="col-md-4">
                            <p class="list-title">真实姓名 <span class="fa fa-lock"></span></p>
                            <p>暂无</p>
                            <p class="list-title">出生日期</p>
                            <p>1970-01-01</p>
                            <p class="list-title">手机号码 <span class="fa fa-lock"></span></p>
                            <p>暂无</p>
                            <p class="list-title">现居城市</p>
                            <p>暂无</p>
                        </div>
                        <div class="col-md-4">
                            <p class="list-title">性别</p>
                            <p>保密</p>
                            <p class="list-title">Email <span class="fa fa-lock"></span></p>
                            <p>暂无</p>
                            <p class="list-title">通讯地址 <span class="fa fa-lock"></span></p>
                            <p>暂无</p>
                        </div>
                        <div class="col-md-1"></div>
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


@extends('layouts.app')

@section('title', 'Welcome')

@section('top')
    @include('partial.navbar')
    @include('partial.banner')
@stop

@section('content')
    <div class="col-xs-12 col-md-9">
        <div class="welcome-table-nav">
            <span class="fa fa-grav"></span> 所有商家
            <ul class="nav nav-pills pull-right">
                <li role="presentation" class="active"><a href="#home" data-toggle="tab">海华苑</a></li>
                <li role="presentation"><a href="#profile" data-toggle="tab">燕华苑</a></li>
                <li role="presentation"><a href="#messages" data-toggle="tab">京华苑</a></li>
                <li role="presentation"><a href="#settings" data-toggle="tab">粤华苑</a></li>
            </ul>
        </div>
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="home">
                <div class="welcome-store">
                    <a href="{{ route('job', 1) }}">
                        <div class="col-md-10">
                            <span class="h4">外卖员</span><span class="pull-right">Github 专卖店</span>
                            <p>GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.</p>
                            <small class="pull-right">地址：广东省珠海市</small>
                        </div>
                        <div class="hidden-xs col-md-2">
                            <img src="{{ asset('images/user.png') }}" class="img img-responsive" alt="">
                        </div>
                    </a>
                </div>
                <div class="welcome-store">
                    <a href="{{ route('job', 1) }}">
                        <div class="col-md-10">
                            <span class="h4">外卖员</span><span class="pull-right">地址：广东省珠海市</span>
                            <p>GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.</p>
                            <small class="pull-right">Github 专卖店</small>
                        </div>
                        <div class="hidden-xs col-md-2">
                            <img src="{{ asset('images/user.png') }}" class="img img-responsive" alt="">
                        </div>
                    </a>
                </div>
                <div class="welcome-store">
                    <a href="{{ route('job', 1) }}">
                        <div class="col-md-10">
                            <span class="h4">外卖员</span><span class="pull-right">地址：广东省珠海市</span>
                            <p>GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.</p>
                            <small class="pull-right">Github 专卖店</small>
                        </div>
                        <div class="hidden-xs col-md-2">
                            <img src="{{ asset('images/user.png') }}" class="img img-responsive" alt="">
                        </div>
                    </a>
                </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="profile">..123.123123</div>
            <div role="tabpanel" class="tab-pane" id="messages">.123..</div>
            <div role="tabpanel" class="tab-pane" id="settings">...123123</div>
        </div>
    </div>
    <div class="hidden-xs col-md-3">
        <div class="welcome-recommend">
            <span class="fa fa-heart-o"></span> Part-time 推荐
            <span class="pull-right"><a href="" class="more">more <span class="fa fa-angle-double-right"></span></a></span>
            <div class="full-area">
                {{--<img src="{{ asset('img/sun-shine.png') }}" class="img-icon" alt="">--}}
                <div class="left-area">
                    <img src="{{ asset('images/user.png') }}" class="img img-responsive" alt="">
                </div>
                <div class="right-area">
                    <a href="">
                        <p>前端开发实习生</p>
                        <small>Github专卖店</small>
                    </a>
                    <span class="label">上周六8点</span>
                </div>
            </div>
            <div class="full-area">
                <div class="left-area">
                    <img src="{{ asset('images/user.png') }}" class="img img-responsive" alt="">
                </div>
                <div class="right-area">
                    <a href="">
                        <p>前端开发实习生</p>
                        <small>Github专卖店</small><small>上周六8点</small>
                    </a>
                </div>
            </div>
        </div>
    </div>
@stop

@section('javascripts')
    <script>
        $(function () {
            @if(session()->has('success'))
                Notification.create(
                // 消息通知框的标题
                "{{ session('success') }}",
                // 消息通知框的内容
                "Long text Long text Long text Long text.",
                // 图片
                "{{ asset('images/user.png') }}",
                // 效果
                "tada", 1, 5);
            @endif
            $('.glyphicon-remove-circle').on('click', function () {
                $('.welcome-banner').hide('normal');
            });
            {{--$('button').on('click', function () {--}}
                {{--Notification.create(--}}
                    {{--// 消息通知框的标题--}}
                    {{--"Notification title",--}}
                    {{--// 消息通知框的内容--}}
                    {{--"Long text Long text Long text Long text.",--}}
                    {{--// 图片--}}
                    {{--"{{ asset('images/user.png') }}",--}}
                    {{--// 效果--}}
                    {{--"tada", 1, 3, function() {--}}
                        {{--$("body").overhang({--}}
                            {{--type: "error",--}}
                            {{--message: "You could not be logged in at this time.",--}}
                            {{--closeConfirm: "true"--}}
                        {{--});--}}
                    {{--}--}}
                {{--);--}}
            {{--});--}}
        })
    </script>
@stop
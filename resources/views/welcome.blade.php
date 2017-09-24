@extends('layouts.app')

@section('title', 'Welcome')

@section('top')
    @include('partial.navbar')
    @include('partial.banner')
@stop

@section('content')
    <div class="col-md-9">
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
                    <a href="">
                        <div class="store-left">
                            <img src="{{ asset('images/user.png') }}" class="img img-responsive" alt="">
                        </div>
                        <div class="store-right">
                            <span class="h4">Github 专卖店</span>
                            <p>GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.</p>
                        </div>
                    </a>
                </div>
                <div class="welcome-store">
                    <a href="">
                        <div class="store-left">
                            <img src="{{ asset('images/user.png') }}" class="img img-responsive" alt="">
                        </div>
                        <div class="store-right">
                            <span class="h4">Github 专卖店</span>
                            <p>GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.</p>
                        </div>
                    </a>
                </div>
                <div class="welcome-store">
                    <a href="">
                        <div class="store-left">
                            <img src="{{ asset('images/user.png') }}" class="img img-responsive" alt="">
                        </div>
                        <div class="store-right">
                            <span class="h4">Github 专卖店</span>
                            <p>GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.</p>
                        </div>
                    </a>
                </div>
                <div class="welcome-store">
                    <a href="">
                        <div class="store-left">
                            <img src="{{ asset('images/user.png') }}" class="img img-responsive" alt="">
                        </div>
                        <div class="store-right">
                            <span class="h4">Github 专卖店</span>
                            <p>GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.</p>
                        </div>
                    </a>
                </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="profile">..123.123123</div>
            <div role="tabpanel" class="tab-pane" id="messages">.123..</div>
            <div role="tabpanel" class="tab-pane" id="settings">...123123</div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="welcome-recommend">
            <span class="h4"><span class="fa fa-heart-o"></span> Part-time 推荐</span>
            <span class="pull-right"><a href="" class="more">more <span class="fa fa-angle-double-right"></span></a></span>
            <hr style="margin-top: 5px;">
        </div>
    </div>
    {!! Form::button('click me!', ['class' => 'btn btn-info btn-lg', 'style' => 'display: block; margin: 500px auto;']) !!}
@stop

@section('javascripts')
    <script src="http://www.jq22.com/jquery/jquery-1.10.2.js"></script>
    <script>
        $(function () {
            $('.glyphicon-remove-circle').click(function () {
                $('.welcome-banner').hide();
            });
            $('button').click(function () {
                Notification.create(
                    // 消息通知框的标题
                    "Notification title",
                    // 消息通知框的内容
                    "Long text Long text Long text Long text.",
                    // 图片
                    "{{ asset('images/user.png') }}",
                    // 效果
                    "tada", 1, 3, function() {
                        $("body").overhang({
                            type: "error",
                            message: "You could not be logged in at this time.",
                            closeConfirm: "true"
                        });
                    }
                );
            });
        })
    </script>
@stop
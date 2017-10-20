@extends('layouts.app')

@section('title', 'Welcome')

@section('top')
    @include('partial.navbar')
    @if(!Auth::check())
        @include('partial.banner')
    @endif
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
            {{--<open-config user="{{ Auth::check() ? Auth::user()->id : Auth::loginUsingId(4) }}"></open-config>--}}
        </div>
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="home">
                <div class="welcome-store open-modal">
                    <a href="{{ route('job', 1) }}">
                        <div class="col-xs-9 col-md-10">
                            <span class="h4">外卖员</span><span class="pull-right">地址：广东省珠海市</span>
                            <div class="job-description">
                                <p>
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                </p>
                            </div>
                            <small class="pull-right">Github 专卖店</small>
                        </div>
                        <div class="col-xs-3 col-md-2">
                            <img src="{{ asset('images/avatars/user1.png') }}" class="img img-responsive" alt="">
                        </div>
                    </a>
                </div>
                <div class="welcome-store">
                    <a href="{{ route('job', 1) }}">
                        <div class="col-xs-9 col-md-10">
                            <span class="h4">外卖员</span><span class="pull-right">地址：广东省珠海市</span>
                            <div class="job-description">
                                <p>
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                </p>
                            </div>
                            <small class="pull-right">Github 专卖店</small>
                        </div>
                        <div class="col-xs-3 col-md-2">
                            <img src="{{ asset('images/avatars/user2.png') }}" class="img img-responsive" alt="">
                        </div>
                    </a>
                </div>
                <div class="welcome-store">
                    <a href="{{ route('job', 1) }}">
                        <div class="col-xs-9 col-md-10">
                            <span class="h4">外卖员</span><span class="pull-right">地址：广东省珠海市</span>
                            <div class="job-description">
                                <p>
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                </p>
                            </div>
                            <small class="pull-right">Github 专卖店</small>
                        </div>
                        <div class="col-xs-3 col-md-2">
                            <img src="{{ asset('images/avatars/user3.png') }}" class="img img-responsive" alt="">
                        </div>
                    </a>
                </div>
                <div class="welcome-store">
                    <a href="{{ route('job', 1) }}">
                        <div class="col-xs-9 col-md-10">
                            <span class="h4">外卖员</span><span class="pull-right">地址：广东省珠海市</span>
                            <div class="job-description">
                                <p>
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                </p>
                            </div>
                            <small class="pull-right">Github 专卖店</small>
                        </div>
                        <div class="col-xs-3 col-md-2">
                            <img src="{{ asset('images/avatars/user4.png') }}" class="img img-responsive" alt="">
                        </div>
                    </a>
                </div>
                <div class="welcome-store">
                    <a href="{{ route('job', 1) }}">
                        <div class="col-xs-9 col-md-10">
                            <span class="h4">外卖员</span><span class="pull-right">地址：广东省珠海市</span>
                            <div class="job-description">
                                <p>
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                </p>
                            </div>
                            <small class="pull-right">Github 专卖店</small>
                        </div>
                        <div class="col-xs-3 col-md-2">
                            <img src="{{ asset('images/avatars/user5.png') }}" class="img img-responsive" alt="">
                        </div>
                    </a>
                </div>
                <div class="welcome-store">
                    <a href="{{ route('job', 1) }}">
                        <div class="col-xs-9 col-md-10">
                            <span class="h4">外卖员</span><span class="pull-right">地址：广东省珠海市</span>
                            <div class="job-description">
                                <p>
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                </p>
                            </div>
                            <small class="pull-right">Github 专卖店</small>
                        </div>
                        <div class="col-xs-3 col-md-2">
                            <img src="{{ asset('images/avatars/user6.png') }}" class="img img-responsive" alt="">
                        </div>
                    </a>
                </div>
                <div class="welcome-store">
                    <a href="{{ route('job', 1) }}">
                        <div class="col-xs-9 col-md-10">
                            <span class="h4">外卖员</span><span class="pull-right">地址：广东省珠海市</span>
                            <div class="job-description">
                                <p>
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                </p>
                            </div>
                            <small class="pull-right">Github 专卖店</small>
                        </div>
                        <div class="col-xs-3 col-md-2">
                            <img src="{{ asset('images/avatars/user8.png') }}" class="img img-responsive" alt="">
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
                <div class="left-area">
                    <img src="{{ asset('images/avatars/user1.png') }}" class="img img-responsive" alt="">
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
                    <img src="{{ asset('images/avatars/user1.png') }}" class="img img-responsive" alt="">
                </div>
                <div class="right-area">
                    <a href="">
                        <p>前端开发实习生</p>
                        <small>Github专卖店</small>
                    </a>
                    <span class="label">上周六8点</span>
                </div>
            </div>
        </div>
    </div>
    @include('modal.job-modal')
@stop

@section('content-aliyun')
    <div class="col-md-9" style="padding-top: 30px;">
        <div class="discard-area">
            <a href="" style="text-decoration: none;">
                <h4>我又丢卡啦！！！！（规定字数）</h4>
                <p>我又丢卡了！！！
                    大概在丽泽湖里面，有没有好心人帮我捞一下！！！！范德萨范德萨范德萨法第三方打分的萨芬撒大发送到防守打法是打发打范德萨发</p>
                <p><small>地点：丽泽A231</small><small style="margin-left: 20px;">联系方式： 13106803427</small><small class="pull-right">发布时间： 15小时之前</small></p>
            </a>
        </div>
        <hr>
        <div class="discard-area">
            <a href="" style="text-decoration: none;">
                <h4>我又丢卡啦！！！！（规定字数）</h4>
                <p>我又丢卡了！！！
                    大概在丽泽湖里面，有没有好心人帮我捞一下！！！！fdsfsdffdsfsdadfdsfdsfadsfdsafsadasdfasdfsdafsdafdsafdsafsadfsadfsadfasdf
                fdsafdsafsadfadf</p>
                <p><small>地点：丽泽A231</small><small style="margin-left: 20px;">联系方式： 13106803427</small><small class="pull-right">发布时间： 15小时之前</small></p>
            </a>
        </div>
        <hr>
        <div class="discard-area">
            <a href="" style="text-decoration: none;">
                <h4>我又丢卡啦！！！！（规定字数）</h4>
                <p>我又丢卡了！！！
                    大概在丽泽湖里面，有没有好心人帮我捞一下！！！！</p>
                <p><small>地点：丽泽A231</small><small style="margin-left: 20px;">联系方式： 13106803427</small><small class="pull-right">发布时间： 15小时之前</small></p>
            </a>
        </div>
        <hr>
        <div class="discard-area">
            <a href="" style="text-decoration: none;">
                <h4>我又丢卡啦！！！！（规定字数）</h4>
                <p>我又丢卡了！！！
                    大概在丽泽湖里面，有没有好心人帮我捞一下！！！！</p>
                <p><small>地点：丽泽A231</small><small style="margin-left: 20px;">联系方式： 13106803427</small><small class="pull-right">发布时间： 15小时之前</small></p>
            </a>
        </div>
        <hr>
        <div class="discard-area">
            <a href="" style="text-decoration: none;">
                <h4>我又丢卡啦！！！！（规定字数）</h4>
                <p>我又丢卡了！！！
                    大概在丽泽湖里面，有没有好心人帮我捞一下！！！！</p>
                <p><small>地点：丽泽A231</small><small style="margin-left: 20px;">联系方式： 13106803427</small><small class="pull-right">发布时间： 15小时之前</small></p>
            </a>
        </div>
        <hr>
    </div>
    <div class="col-md-3"></div>
@stop

@section('javascripts')
    <script src="{{ asset('js/constellation.js') }}"></script>
    <script>
        $(function () {
            @if(session()->has('register_success') && $data = session()->get('register_success'))
                Tool.welcomeBack('{{ $data['title'] }}', '{{ $data['msg'] }}', '{{ $data['avatar'] }}', $('meta[name="animate"]').attr('content'));
            @endif

            @if($needToActivate)
                $("body").overhang({ type: "confirm", message: '立即激活？', closeConfirm: true, callback: function () {
                    var selection = $("body").data("overhangConfirm");
                    if (selection) {
                        $.post('/email/verify', {}, function (data) {
                            $("body").overhang({ type: "success", message: '邮件已发送，请尽快激活账号' });
                        })
                    }
                }});
            @endif

            @if(session()->has('login_success') && $data = session()->get('login_success'))
                Tool.welcomeBack('{{ $data['title'] }}', '{{ $data['msg'] }}', '{{ $data['avatar'] }}', $('meta[name="animate"]').attr('content'));
            @endif
        })
    </script>
@stop
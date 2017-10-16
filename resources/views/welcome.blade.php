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
                            <img src="{{ asset('images/avatar/user1.png') }}" class="img img-responsive" alt="">
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
                            <img src="{{ asset('images/avatar/user2.png') }}" class="img img-responsive" alt="">
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
                            <img src="{{ asset('images/avatar/user3.png') }}" class="img img-responsive" alt="">
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
                            <img src="{{ asset('images/avatar/user4.png') }}" class="img img-responsive" alt="">
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
                            <img src="{{ asset('images/avatar/user5.png') }}" class="img img-responsive" alt="">
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
                            <img src="{{ asset('images/avatar/user6.png') }}" class="img img-responsive" alt="">
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
                            <img src="{{ asset('images/avatar/user8.png') }}" class="img img-responsive" alt="">
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
                    <img src="{{ asset('images/avatar/user1.png') }}" class="img img-responsive" alt="">
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
                    <img src="{{ asset('images/avatar/user1.png') }}" class="img img-responsive" alt="">
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
    @include('modal.job-modal')
@stop

@section('javascripts')
    <script src="{{ asset('js/constellation.js') }}"></script>
    <script>
        $(function () {
            @if(session()->has('mobile_register_success') && $data = session()->get('mobile_register_success'))
                Tool.welcomeBack('{{ $data['title'] }}', '{{ $data['msg'] }}', '{{ $data['avatar'] }}', $('meta[name="animate"]').attr('content'));
            @endif

            @if(session()->has('email_register_success') && $data = session()->get('email_register_success'))
                $("body").overhang({ type: "prompt", message: '验证码已经发到你的邮箱', closeConfirm: true, html: true});
            @endif

            @if(session()->has('login_success') && $data = session()->get('login_success'))
                Tool.welcomeBack('{{ $data['title'] }}', '{{ $data['msg'] }}', '{{ $data['avatar'] }}', $('meta[name="animate"]').attr('content'));
            @endif
        })
    </script>
@stop
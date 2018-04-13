@extends('layouts.app')

@section('title', 'Welcome')

@section('stylesheets')
    <style type="text/css">
        .footer {
            margin-top: 5vh
        }
    </style>
@endsection

@section('top')
    <section class="app-red-top"></section>
    @include('partial.navbar')
    @if(!Auth::check())
        @include('partial.banner')
    @endif
@stop

@section('content')
    <div class="container">
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
                    @foreach($jobs as $job)
                        @if($job->location == 'haihua')
                            <div class="welcome-store">
                                <a href="{{ route('job', $job->id) }}">
                                    <div class="col-xs-9 col-md-10">
                                        <span class="h4">{{ $job->name }}</span><span class="pull-right">地址：{{ $job->address }}</span>
                                        <div class="job-description"><p>{{ $job->description }}</p></div>
                                        <small class="pull-right">{{ $job->business->name }}</small>
                                    </div>
                                    <div class="col-xs-3 col-md-2">
                                        <img src="{{ asset($job->business->avatar) }}" class="img img-responsive" alt="">
                                    </div>
                                </a>
                            </div>
                        @endif
                    @endforeach
                </div>
                <div role="tabpanel" class="tab-pane" id="profile">
                    @foreach($jobs as $job)
                        @if($job->location == 'yanhua')
                            <div class="welcome-store">
                                <a href="{{ route('job', $job->id) }}">
                                    <div class="col-xs-9 col-md-10">
                                        <span class="h4">{{ $job->name }}</span><span class="pull-right">地址：{{ $job->address }}</span>
                                        <div class="job-description"><p>{{ $job->description }}</p></div>
                                        <small class="pull-right">{{ $job->business->name }}</small>
                                    </div>
                                    <div class="col-xs-3 col-md-2">
                                        <img src="{{ asset($job->business->avatar) }}" class="img img-responsive" alt="">
                                    </div>
                                </a>
                            </div>
                        @endif
                    @endforeach
                </div>
                <div role="tabpanel" class="tab-pane" id="messages">
                    @foreach($jobs as $job)
                        @if($job->location == 'jinghua')
                            <div class="welcome-store">
                                <a href="{{ route('job', $job->id) }}">
                                    <div class="col-xs-9 col-md-10">
                                        <span class="h4">{{ $job->name }}</span><span class="pull-right">地址：{{ $job->address }}</span>
                                        <div class="job-description"><p>{{ $job->description }}</p></div>
                                        <small class="pull-right">{{ $job->business->name }}</small>
                                    </div>
                                    <div class="col-xs-3 col-md-2">
                                        <img src="{{ asset($job->business->avatar) }}" class="img img-responsive" alt="">
                                    </div>
                                </a>
                            </div>
                        @endif
                    @endforeach
                </div>
                <div role="tabpanel" class="tab-pane" id="settings">
                    @foreach($jobs as $job)
                        @if($job->location == 'yuehua')
                            <div class="welcome-store">
                                <a href="{{ route('job', $job->id) }}">
                                    <div class="col-xs-9 col-md-10">
                                        <span class="h4">{{ $job->name }}</span><span class="pull-right">地址：{{ $job->address }}</span>
                                        <div class="job-description"><p>{{ $job->description }}</p></div>
                                        <small class="pull-right">{{ $job->business->name }}</small>
                                    </div>
                                    <div class="col-xs-3 col-md-2">
                                        <img src="{{ asset($job->business->avatar) }}" class="img img-responsive" alt="">
                                    </div>
                                </a>
                            </div>
                        @endif
                    @endforeach
                </div>
            </div>
        </div>
        <div class="hidden-xs col-md-3">
            <div class="welcome-recommend">
                <span class="fa fa-heart-o"></span> Part-time 推荐
                <span class="pull-right"><a href="" class="more">more <span class="fa fa-angle-double-right"></span></a></span>
                @foreach($recommendation as $rec)
                    <div class="full-area">
                        <div class="left-area">
                            <img src="{{ asset($rec->business->avatar) }}" class="img img-responsive" alt="">
                        </div>
                        <div class="right-area">
                            <a href="{{ route('job', $rec->id) }}">
                                <p>{{ $rec->name }}</p>
                                <small>{{ $rec->business->name }}</small>
                            </a>
                            <span class="label">{{ $rec->address }}</span>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
    {{--@include('modal.job-modal')--}}
@stop

@section('scripts')
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
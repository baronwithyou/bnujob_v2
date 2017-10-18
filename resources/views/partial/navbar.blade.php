<section class="app-red-top"></section>
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="{{ route('index') }}">bnu <span style="color: #5eb1e7;">job</span></a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li class="active"><a href="{{ route('index') }}">所有兼职 <span class="sr-only">(current)</span></a></li>
            </ul>
            <ul class="nav navbar-nav">
                <li><a href="javascript:void(0)" style="visibility: hidden"></a></li>
                <li><a href="">丢卡狂魔集中营</a></li>
                <li><a href="">讨论区</a></li>
                <li><a href="">二手市场</a></li>
            </ul>

            <ul class="nav navbar-nav navbar-right">
                @if(Auth::check())
                <?php $user = Auth::user()?>
                @if($user->isAdmin())
                    <li><a href="{{ route('voyager.dashboard') }}" style="font-size: 20px;"><i class="fa fa-hand-spock-o"></i> King</a></li>
                @endif
                <li><a href="#"><span class="fa fa-bell-o" style="font-size: 20px;"></span></a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" style="padding: 10px 15px;" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <img src="{{ asset($user->avatar) }}" style="width: 30px" class="img img-circle" alt="">
                        {{ $user->name }} <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="{{ route('user.index') }}">个人中心</a></li>
                        <li><a href="#">兼职状态</a></li>
                        <li>
                            {!! Form::open(['route' => 'logout']) !!}
                                {!! Form::submit('登出', ['class' => 'list-like']) !!}
                            {!! Form::close() !!}
                        </li>
                    </ul>
                </li>
                @else
                <li role="separator" class="divider"></li>
                <li><a href="#auth-modal" data-toggle="modal" class="list-btn-xs">立即登录</a></li>
                <li><a href="#auth-modal" data-toggle="modal" class="list-btn-xs">免费注册</a></li>
                @endif
            </ul>


            {{--<div class="search-wrapper hidden-xs">--}}
                {{--<div class="input-holder">--}}
                    {{--<input type="text" class="search-input" placeholder="输入兼职/商家查询" />--}}
                    {{--<button class="search-icon" onclick="searchToggle(this, event);"><span></span></button>--}}
                {{--</div>--}}
                {{--<span class="close" onclick="searchToggle(this, event);"></span>--}}
            {{--</div>--}}
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>
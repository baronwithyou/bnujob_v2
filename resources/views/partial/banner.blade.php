<header class="welcome-banner">
    <span class="glyphicon glyphicon-remove-circle"></span>
    <div class="bg" style="position: absolute;">
        <canvas id="display"></canvas>
        <div id="blachole"></div>
    </div>
    <div class="banner-text">
        <h2>北师人 Part-time 社区</h2>
        <h4>更安全方便的找到心仪的 Job</h4>
        <p>我们坚信，你有无数个加入我们的理由！</p>
    </div>
    <div class="banner-form">
        {!! Form::open(['route' => 'register', 'method' => 'post']) !!}
        <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
            {!! Form::text('name', null, ['class' => 'form-control', 'placeholder' => '真实姓名或常用昵称']) !!}
            @if($errors->has('name'))
                <span class="help-block">
                    <strong>{{ $errors->first('name') }}</strong>
                </span>
            @endif
        </div>
        <div class="form-group{{ $errors->has('mobile') ? ' has-error' : '' }}">
            {!! Form::text('mobile', null, ['class' => 'form-control', 'placeholder' => '手机号(仅支持大陆手机号码)', 'v-validate' => 'required']) !!}
        </div>
        <div class="form-group{{ $errors->has('verify_code') || $errors->has('mobile') ? ' has-error' : '' }}">
            <div class="input-group">
                {!! Form::text('verify_code', null, ['class' => 'form-control', 'placeholder' => '短信验证码']) !!}
                <span class="input-group-addon" id="basic-addon2"><a href="">获取验证码</a></span>
            </div>
            @if($errors->has('mobile'))
                <span class="help-block span-inline">
                    <strong>{{ $errors->first('mobile') }}</strong>
                </span>
            @endif
            @if($errors->has('verify_code'))
                <span class="help-block span-inline">
                    <strong>{{ $errors->first('verify_code') }}</strong>
                </span>
            @endif
        </div>
        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
            {!! Form::password('password', ['class' => 'form-control', 'placeholder' => '密码(不少于六位)']) !!}
            @if($errors->has('password'))
                <span class="help-block">
                    <strong>{{ $errors->first('password') }}</strong>
                </span>
            @endif
        </div>
        <span>已有账号？<a href="#auth-check" data-toggle="modal">立即登录</a></span>
            {!! Form::submit('注册', ['class' => 'btn btn-register pull-right']) !!}
        {!! Form::close() !!}
    </div>
</header>

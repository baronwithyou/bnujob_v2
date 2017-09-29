<div class="modal fade" tabindex="-1" role="dialog" id="auth-check">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">登录注册</h4>
            </div>
            <div class="modal-body">
                <div class="auth-part">
                    <div class="register-part">
                        <h4>注册新账号</h4>
                        {!! Form::open(['id' => 'register-form']) !!}
                        <div class="form-group validate-name">
                            {!! Form::label('name', '名字') !!}
                            {!! Form::text('name', null, ['class' => 'form-control', 'placeholder' => '真实姓名或常用昵称']) !!}
                        </div>
                        <div class="form-group validate-mobile validate-verify validate-email">
                            {!! Form::radio('register_type', 'mobile', true, ['id' => 'mobile']) !!} {!! Form::label('mobile', '用手机号注册') !!}
                            {!! Form::radio('register_type', 'email', false, ['id' => 'email']) !!} {!! Form::label('email', '用Email注册') !!}
                            <div id="register_type_show">
                                {!! Form::text('mobile', null, ['class' => 'form-control', 'placeholder' => '手机号(仅支持大陆手机号码)', 'style' => 'margin-bottom: 15px']) !!}
                                <div class="input-group">
                                    {!! Form::text('mobile-verify', null, ['class' => 'form-control', 'placeholder' => '短信验证码']) !!}
                                    <span class="input-group-addon" id="basic-addon2"><a href="">获取验证码</a></span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group validate-password">
                            {!! Form::label('password', '密码') !!}
                            {!! Form::password('password', ['class' => 'form-control', 'placeholder' => '不少于六位']) !!}
                        </div>
                        <span>同意并接受 <a href="">《服务条款》</a></span>
                        {!! Form::submit('注册', ['class' => 'btn btn-register pull-right']) !!}
                        {!! Form::close() !!}
                    </div>
                    <div class="login-part">
                        <h4>登录</h4>
                        {!! Form::open(['url' => '/']) !!}
                        <div class="form-group">
                            {!! Form::text('mobile', null, ['class' => 'form-control', 'placeholder' => '11位手机号或邮箱']) !!}
                        </div>
                        <div class="form-group">
                            {!! Form::password('password', ['class' => 'form-control', 'placeholder' => '密码']) !!}
                        </div>
                        {!! Form::checkbox('remember_token', '1', true) !!} 记住登录状态
                        {!! Form::submit('登录', ['class' => 'btn btn-register pull-right']) !!}
                        {!! Form::close() !!}
                        <div class="third-party">
                            第三方登录:
                            <a href="{{ route('auth', 'weixin') }}"><span class="fa fa-wechat fa-lg"></span></a>
                            <a href="{{ route('auth', 'qq') }}"><span class="fa fa-qq fa-lg"></span></a>
                            <a href=""><span class="fa fa-weibo fa-lg"></span></a>
                            <a href=""><span class="fa fa-github fa-lg"></span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<div class="modal fade auth-check" tabindex="-1" role="dialog" id="auth-modal">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">登录注册</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xs-12 col-md-5 col-md-offset-1 register-part">
                            <h4>注册新账号</h4>
                            <register-form></register-form>
                        </div>
                        <div class="col-xs-12 col-md-5 login-part">
                            <h4>登录</h4>
                            <login-form></login-form>
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
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
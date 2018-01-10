@extends('layouts.app')

@section('stylesheets')
@stop

@section('top')
    <section style="background: #1C213F;">
{{--        <img src="{{ asset('images/ocean/certificate.jpg') }}" class="img img-responsive" alt="" style="margin: 0 auto;">--}}
    </section>
@stop

@section('content')
<div class="row" style="margin-top: 50px;">
    <div class="col-md-6">
        <h3>实名制认证</h3>
        {!! Form::open() !!}
        <div class="form-group">
            <label for="">真实姓名</label>
            <input type="text" name="real_name" id="" class="form-control" placeholder="真实姓名（如：哈利波特）">
        </div>

        <div class="form-group">
            <label for="">身份证号</label>
            <input type="text" name="credit_id" id="" class="form-control" placeholder="请输入身份证号（如：4414XXXXXXXXXXXX）">
        </div>

        <button type="button" class="btn btn-primary btn-block" style="margin-bottom: 20px;">下一步</button>

        <div class="progress">
            <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 45%">
                45% Complete
            </div>
        </div>


        {{--<div class="form-group">--}}
            {{--<label for="">商家手机号</label>--}}
            {{--<input type="text" name="mobile" class="form-control" placeholder="手机号(仅支持大陆手机号码)">--}}
        {{--</div>--}}

        {{--<div class="form-group">--}}
            {{--<div class="input-group">--}}
                {{--<input type="text" name="verify_code" placeholder="短信验证码" class="form-control" id="">--}}
                {{--<span class="input-group-addon" id="basic-addon2">--}}
                    {{--<button class="btn btn-link" >获取验证码</button>--}}
                {{--</span>--}}
            {{--</div>--}}
        {{--</div>--}}

        {{--<div class="form-group">--}}
            {{--<label for="">商家名称</label>--}}
            {{--<input type="text" name="name" class="form-control" placeholder="商家名称">--}}
        {{--</div>--}}

        {{--<div class="form-group">--}}
            {{--<label for="">营业类型</label>--}}
            {{--{!! Form::select('type', [], null, ['class' => 'form-control']) !!}--}}
        {{--</div>--}}

        {{--<div class="form-group">--}}
            {{--<label for="">商家简介</label>--}}
            {{--{!! Form::textarea('abstract', '', ['class' => 'form-control']) !!}--}}
        {{--</div>--}}
        {!! Form::close() !!}
    </div>
    <div class="col-md-6">
        <img src="{{ asset('images/vegetables.jpg') }}" class="img img-responsive" alt="">
    </div>
</div>
@stop

@section('scripts')
    <script>
        $(function() {
            $('.btn-warning').click(function () {
                NProgress.set(0.4);
            });

        });
    </script>
@stop
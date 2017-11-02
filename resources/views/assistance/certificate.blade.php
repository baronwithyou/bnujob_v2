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
    <div class="col-md-8 col-md-offset-2">
        <h3>实名制认证</h3>
        {!! Form::open() !!}
        <div class="form-group">
            <label for="">真实姓名</label>
            <input type="text" name="real_name" id="" class="form-control" placeholder="请输入真实姓名（如：李白）">
        </div>

        <div class="from-group">
            <label for="">身份证号</label>
            <input type="text" name="credit_id" id="" class="form-control" placeholder="请输入身份证号（如：4414XXXXXXXXXXXX）">
        </div>
        <button type="button" class="btn btn-primary btn-block" style="margin-top: 20px;">下一步</button>
        {!! Form::close() !!}
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
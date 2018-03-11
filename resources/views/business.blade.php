@extends('layouts.app')

@section('title', '商家信息')

@section('stylesheets')
    <style>

    </style>
@stop

@section('content')
    <div class="container business-info">
        <div class="row" style="margin-top: 20px;">
            <div class="col-md-3" style="padding-left: 60px; ">
                @include('partial.business_info', $business)
            </div>
            <div class="col-md-9" style="padding-right: 60px;">
                @include('partial.business_nav')
                <div class="row" style="margin-top: 20px;">
                    <div class="col-md-4">
                        <div class="panel panel-default" style="background-color: #fafafb; border-radius: 0;">
                            <div class="panel-body">
                                <small>手机号码</small>
                                <p><strong>{{ $business->mobile }}</strong></p>
                                <div class="row">
                                    <div class="col-md-9 col-md-offset-3">
                                        <button class="btn btn-default btn-xs btn-block">
                                            <span class="fa fa-pencil"></span>
                                            update mobile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="panel panel-default" style="background-color: #fafafb; border-radius: 0;">
                            <div class="panel-body">

                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div id="stat-chart" style="width: 100%;height:330px;"></div>
                    </div>
                </div>
            </div>
            {{--<div class="col-md-3 col-md-offset-1">--}}
                {{--<div id="stat-chart" style="width: 100%;height:330px;"></div>--}}
                {{--<div class="list-group">--}}
                    {{--<a href="{{ route('business.index') }}" class="list-group-item active">商家信息</a>--}}
                    {{--<a href="{{ route('business.publish') }}" class="list-group-item">发布兼职</a>--}}
                    {{--<a href="{{ route('business.all_jobs') }}" class="list-group-item">所有兼职--}}
                        {{--@if($tentative > 0)--}}
                            {{--<span class="badge">{{ $tentative }}</span>--}}
                        {{--@endif--}}
                    {{--</a>--}}
                    {{--<a href="{{ route('business.resume.check') }}" class="list-group-item">简历审核</a>--}}
                {{--</div>--}}
            {{--</div>--}}
            {{--<div class="col-md-7">--}}
                {{--<h2>Publish profile</h2>--}}
                {{--<hr>--}}
                {{--<div class="row">--}}
                    {{--<div class="col-md-7" id="business-profile">--}}
                        {{--<div class="form-group">--}}
                            {{--<label for="name">商家名称</label>--}}
                            {{--<input type="text" disabled class="form-control" value="{{ $business->name }}">--}}
                        {{--</div>--}}
                        {{--<div class="form-group">--}}
                            {{--<label for="name">商家手机号</label>--}}
                            {{--<input type="text" disabled class="form-control" value="{{ $business->mobile }}">--}}
                        {{--</div>--}}
                        {{--<div class="form-group">--}}
                            {{--<label for="">商家类型</label>--}}
                            {{--{!! Form::select('type', config('content.business_type'), $business->type,--}}
                             {{--['class' => 'form-control', 'id' => 'business-type']) !!}--}}
                        {{--</div>--}}
                        {{--<div class="form-group">--}}
                            {{--<label for="business-abstract">商家简介</label>--}}
                            {{--<textarea name="" id="business-abstract" cols="30" rows="10" class="form-control">{{ $business->abstract }}</textarea>--}}
                        {{--</div>--}}
                        {{--<button class="btn btn-success" id="upload-business-profile">Upload profile</button>--}}
                    {{--</div>--}}
                    {{--<div class="col-md-4 col-md-offset-1">--}}
                        {{--<img src="{{ asset($business->avatar) }}" style="width: 100%" alt="" id="img-show" class="img img-responsive">--}}
                        {{--<button class="btn btn-block btn-default" data-toggle="modal" style="margin-top: 30px" data-target="#upload-avatar">Upload new picture</button>--}}
                    {{--</div>--}}
                {{--</div>--}}
            {{--</div>--}}
        </div>
    </div>
@stop

@section('scripts')
    <script>
        $(function () {
            var myChart = echarts.init(document.getElementById('stat-chart'));
            option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:['被收藏数','被投递数','简历通过数']
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '15',
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:'{{ $business->collected_count }}', name:'被收藏数'},
                            {value:'{{ $business->delivered_count }}', name:'被投递数'},
                            {value:'{{ $business->passes_count }}', name:'简历通过数'},
                        ]
                    }
                ]
            };

            myChart.setOption(option);
            $('#upload-business-profile').on('click', function () {
                var type = $('#business-type :selected').val();
                var abstract = $('#business-abstract').val();
                var id = '{{ $business->id }}';
                $.post('/business/profile/update', {'type': type, 'abstract': abstract, 'id': id}, function (data) {
                    data = JSON.parse(data);
                })
            });

            var img_url = '';
            $('#avatar-upload').on('change', function (e) {
                var formData = new FormData();
                formData.append('file', $(e.target)[0].files[0]);
                console.log(formData);
                $.ajax({
                    url: '{{ route('image.upload') }}',
                    type: 'POST',
                    data: formData,
                    cache: false,
                    processData: false,
                    contentType: false,
                    success: function (res) {
                        res = JSON.parse(res);
                        if (res.status == 1) {
                            img_url = res.msg;
                            $('#upload-avatar .img-area').append('<img id="post-upload-image" class="img img-responsive" src="/' + res.msg + '">');
                            setTimeout(function () {
                                jcropApi = $.Jcrop('#post-upload-image', {
                                    aspectRatio: 1,
                                    allowResize: true,
                                    allowSelect: false,
                                    setSelect: [0, 0, 200, 200]
                                });
                            }, 1000);
                        } else {
                            swal("Error!", res.msg, "error");
                        }
                    }
                });
            });

            $('#upload-avatar #img-upload-btn').on('click', function () {
                if (img_url) {
                    $.ajax({
                        type: 'POST',
                        url: '{{ route('business.avatar.store') }}',
                        data: {
                            image: img_url,
                            selectArray: jcropApi.tellSelect(),
                            display_size: jcropApi.getWidgetSize(),
                        },
                        success: function (res) {
                            var res = JSON.parse(res);
                            if (res.status == 1) {
                                $('#upload-avatar').modal('hide');
                                $('#img-show').attr('src', res.data.url);
                            } else {
                                swal("Error!", res.msg, "error");
                            }
                        }
                    });
                } else {
                }
            });

            @if(($tentative = \App\Http\Helpers::getDeliverMeg()) > 0)
            Notification.create(
                '通知', '你有 <a href="{{ route('business.all_jobs') }}">{{ $tentative }} 条投递信息</a>', '{{ asset('images/user.jpg') }}', 'bounceInLeft', 1, 10, function() {}
            );
            @endif
        });
    </script>
@stop


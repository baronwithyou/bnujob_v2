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
                    <div class="col-md-8" id="business-profile">
                        <div class="row">
                            <div class="col-md-6">
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
                        </div>
                        <div class="row">
                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="">商家类型</label>
                                    {!! Form::select('type', config('content.business_type'), $business->type,
                                     ['class' => 'form-control', 'id' => 'business-type']) !!}
                                </div>
                                <div class="form-group">
                                    <label for="business-abstract">商家简介</label>
                                    <textarea name="" id="business-abstract" cols="30" rows="10" class="form-control">{{ $business->abstract }}</textarea>
                                </div>
                                <button class="btn btn-success" id="upload-business-profile">Upload profile</button>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div id="stat-chart" style="width: 100%;height:330px;"></div>
                    </div>
                </div>
            </div>
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

            @if(($tentative = \App\Http\Helpers::getDeliverMeg()) > 0)
            Notification.create(
                '通知', '你有 <a href="{{ route('business.all_jobs') }}">{{ $tentative }} 条投递信息</a>', '{{ asset('images/user.jpg') }}', 'bounceInLeft', 1, 10, function() {}
            );
            @endif
        });
    </script>
@stop


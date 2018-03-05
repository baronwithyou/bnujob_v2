@extends('layouts.app')

@section('title', '商家信息')

@section('stylesheets')
    <style>
        /*.publish-area {*/
            /*background: #eeeeee;*/
        /*}*/

        /*.publish-area .row {*/
            /*margin:0 55px;*/
        /*}*/

        /*.publish-top .publish-img {*/
            /*-webkit-border-radius: 5px;*/
            /*-moz-border-radius: 5px;*/
            /*border-radius: 5px;*/
            /*width: 100px;*/
            /*float: left;*/
            /*padding: 20px;*/
            /*display: inline-block;*/
        /*}*/
        /*.publish-top .publish-title {*/
            /*display: inline-block;*/
        /*}*/
        /*.footer {*/
            /*margin-top: 0;*/
        /*}*/
    </style>
@stop

@section('content')
    <div class="container">
        <div class="row" style="margin-top: 50px;">
            <div class="col-md-3 col-md-offset-1">
                <div class="list-group">
                    <a href="{{ route('business.index') }}" class="list-group-item active">商家信息</a>
                    <a href="{{ route('business.publish') }}" class="list-group-item">发布兼职</a>
                    <a href="#" class="list-group-item">简历审核</a>
                </div>
                <div id="stat-chart" style="width: 100%;height:330px;"></div>
            </div>
            <div class="col-md-7">
                <h2>Publish profile</h2>
                <hr>
                <div class="row">
                    <div class="col-md-7" id="business-profile">
                        <div class="form-group">
                            <label for="name">商家名称</label>
                            <input type="text" disabled class="form-control" value="{{ $business->name }}">
                        </div>
                        <div class="form-group">
                            <label for="name">商家手机号</label>
                            <input type="text" disabled class="form-control" value="{{ $business->mobile }}">
                        </div>
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
                    <div class="col-md-4 col-md-offset-1">
                        <img src="{{ asset($business->avatar) }}" style="width: 100%" alt="" id="img-show" class="img img-responsive">
                        <button class="btn btn-block btn-default" data-toggle="modal" style="margin-top: 30px" data-target="#upload-avatar">Upload new picture</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" tabindex="-1" role="dialog" id="upload-avatar">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">头像上传</h4>
                </div>
                <div class="modal-body">
                    <input type="file" class="btn btn-default" id="avatar-upload">
                    <div class="img-area"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="img-upload-btn">Save changes</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
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
//                    console.log(data);
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
        });
    </script>
@stop


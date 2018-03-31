@extends('layouts.app')

@section('title', '兼职详情')

@section('top')
    <div class="container">
        @if(Auth::check() && \App\Http\Helpers::checkCommented(Auth::user()->id, $job->id))
            <?php $commented = 1?>
        @endif
        <div class="job-title">
            <div class="row">
                <div class="col-xs-8 col-md-9">
                    <h3>{{ $job->name }} <small>{{ $job->business->name }}</small></h3>
                    <span class="label label-primary">餐饮</span>
                    <span class="label label-primary">IT</span>
                    <span style="margin-left:  2%"><span class="fa fa-phone"></span> {{ $job->contact }}</span>
                    <div class="pull-right">
                        <span>￥{{ $job->salary }}元/天</span>
                        <span>地址：{{ $job->address }}</span>
                    </div>
                </div>
                <div class="col-xs-4 col-md-3">
                    <div class="deliver-area">
                        <record-btn ct="{{ $job->delivered_count }}" j_id="{{ $job->id }}" is_c="{{ Auth::check() }}" @auth dd="{{ $delivered }}" @endauth></record-btn>
                    </div>
                    <div class="collect-area">
                        <collect-btn c="{{ $job->collected_count }}" j_id="{{ $job->id }}"  is_c="{{ Auth::check() }}" @auth is_cl="{{ $is_collected }}" @endauth></collect-btn>
                        {{--<button class="btn btn-default">收藏</button>--}}
                        {{--<span><strong>{{ $job->collected_count }}</strong> 人收藏</span>--}}
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-9">
                <div class="job-detail">
                    <h4 class="detail-title">工作描述</h4>
                    <p style="margin-left: 20px; word-break: break-all;">{!! nl2br($job->description) !!}</p>
                    <h4 class="detail-title">岗位需求</h4>
                    <p style="margin-left: 20px; word-break: break-all;">{!! nl2br($job->required) !!}</p>
                    <hr>
                </div>
                <div class="job-comment">
                    @foreach($comments as $comment)
                        <comment c="{{ $comment->content }}" a="{{ $comment->agree_count }}" is_m="{{ Auth::check() && $comment->user_id == Auth::user()->id }}"
                                 t="{{ $comment->created_at }}" u="{{ $comment->user_id }}" p="{{ $comment->poster->name }}"
                                 c_id="{{ $comment->id }}" is_c="{{ Auth::check() ? true : false }}"></comment>
                    @endforeach
                </div>
                <div class="comment-edit">
                    <div class="col-md-10 col-md-offset-1">
                        <h4>撰写评论</h4>
                        <div id="job-comment-editor"></div>
                        <button class="btn btn-yellow pull-right btn-submit">提交评论</button>
                    </div>
                </div>
            </div>
            <div class="hidden-xs col-md-3">
                <div class="similar-job-detail">
                    <div class="panel panel-default similar-search">
                        <div class="panel-body">
                            <button class="close">&times;</button>
                            <span>在寻找类似兼职？</span>
                            {!! Form::text('job', $job->name, ['class' => 'form-control search']) !!}
                            {!! Form::button('查找', ['class' => 'btn btn-default pull-right']) !!}
                        </div>
                    </div>
                    <div class="similar-job">
                        <span class="fa fa-meh-o"></span> 相似兼职
                        <span class="pull-right"><a href="" class="more">more <span class="fa fa-angle-double-right"></span></a></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop

@section('scripts')
    <script>
        $(function () {
            $('.similar-search .close').click(function () {
                $('.similar-search').hide();
            });

            var E = window.wangEditor;
            var editor = new E('#job-comment-editor');
            editor.customConfig.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'link',  // 插入链接
                'list',  // 列表
                'quote',  // 引用
                'image',  // 插入图片
                'code',  // 插入代码
                'undo',  // 撤销
                'redo'  // 重复
            ];
            editor.customConfig.zIndex = 2;
            editor.create();
            $('.btn-submit').click(function () {
                const content = editor.txt.text();
                if (content == '' || content == null) {
                    return false;
                }
                @if(Auth::check())
                    @if(!isset($commented))
                        $.post('{{ route('job.comment.store') }}', { content: content, job_id: '{{ $job->id }}' }, function (data) {
                            data = JSON.parse(data);
                            if (data.status == 1) {
                                swal('Good job!', data.msg, 'success');
                                editor.txt.html(' ');
                            } else {
                                swal('Sorry', data.msg, 'error');
                            }
                        });
                    @else
                        swal('你已经评论过该兼职', '每个用户只能发布一个评论');
                    @endif
                @else
                    $('#auth-modal').modal('show');
                @endif
            })
        });
    </script>
@stop


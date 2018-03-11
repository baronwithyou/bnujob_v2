@extends('layouts.app')

@section('title', '兼职情况')

@section('top')
    @include('partial.user_banner', $user)
@stop

@section('content')
    <div class="container">
        <div class="row user-content">
            <div class="col-md-2">
                @include('partial.user_nav', ['active_location' => 2])
            </div>
            <div class="col-md-7">
                <div class="alert alert-warning alert-dismissible" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <strong>点击</strong>未读信息以取消提示！！
                </div>
                <div class="panel panel-default deliver-status">
                    <div class="panel-heading">兼职状态</div>
                    <div class="panel-body">
                        <table class="table table-hover">
                            <tr>
                                <th>#</th>
                                <th>兼职名称</th>
                                <th>兼职公司</th>
                                <th>兼职薪资</th>
                                <th>投递时间</th>
                                <th>状态</th>
                            </tr>
                            <?php $i = 1;?>
                            @foreach($user->delivers as $deliver)
                                <tr @if(!$deliver->receive && $deliver->status != 'tentative') class="able-click" deliver_id="{{ $deliver->id }}" @endif>
                                    <td>{{ $i++ }}</td>
                                    <td>{{ $deliver->job->name }}</td>
                                    <td>{{ $deliver->job->business->name }}</td>
                                    <td>{{ $deliver->job->salary }} / 天</td>
                                    <td>{{ $deliver->created_at->diffForHumans() }}</td>
                                    <td>
                                        @switch($deliver->status)
                                            @case('pass')
                                                <span class="label label-success">待联系</span>
                                            @break

                                            @case('fail')
                                                <span class="label label-danger">未通过</span>
                                            @break

                                            @default
                                            <span class="label label-default">待审核</span>
                                        @endswitch
                                    </td>
                                </tr>
                            @endforeach
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                @include('partial.user_upload')
            </div>
        </div>
    </div>
@stop

@section('scripts')
    <script>
        $(function () {
            $(".able-click").click(function () {
                var $this = $(this);
                var deliver_id = $(this).attr('deliver_id');
                $.post('receive/' + deliver_id, {}, function (data) {
                    data = JSON.parse(data);
                    if (data.status) {
                        $this.removeClass('able-click');
                    }
//                    console.log(data);
                })
            })
        })
    </script>
@endsection
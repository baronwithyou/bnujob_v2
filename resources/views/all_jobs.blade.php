@extends('layouts.app')

@section('title', '查看已发布兼职')

@section('stylesheets')
    <style>

    </style>
@endsection

@section('content')
    <div class="container business-info">
        <div class="row" style="margin-top: 20px;">
            <div class="col-md-3" style="padding-left: 60px; ">
                @include('partial.business_info', $business)
            </div>
            <div class="col-md-9" style="padding-right: 60px;">
                @include('partial.business_nav')
                <div class="panel panel-default" style="margin-top: 20px;">
                    <div class="panel-body">
                        <table class="table table-hover" style="">
                            <tr>
                                <th>#</th>
                                <th>兼职</th>
                                <th>薪资</th>
                                <th>位置</th>
                                <th>创建时间</th>
                                <th>操作</th>
                            </tr>
                            <?php $i = 1;?>
                            @foreach($jobs as $job)
                                <tr>
                                    <td>{{ $i++ }}</td>
                                    <td>{{ $job->name }}</td>
                                    <td>{{ $job->salary }}</td>
                                    <td>{{ config('content.location.'.$job->location)." ".$job->address }}</td>
                                    <td>{{ optional($job->created_at)->diffForHumans() }}</td>
                                    <td>
                                        <button class="btn btn-xs btn-success">详情</button>
                                        <?php $count = 0;?>
                                        @foreach($job->delivers as $deliver)
                                            @if($deliver->status == 'tentative')
                                                <?php $count++;?>
                                            @endif
                                        @endforeach
                                        <a href="{{ route('business.resume.check', $job->id) }}" class="btn btn-xs btn-primary">
                                            投递详情
                                            @if($count > 0)
                                                <span class="badge">{{ $count }}</span>
                                            @endif
                                        </a>
                                    </td>
                                </tr>
                            @endforeach
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
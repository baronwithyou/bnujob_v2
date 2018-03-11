@extends('layouts.app')

@section('title', '查看已发布兼职')

@section('stylesheets')
    <style>
        .footer {
            margin: 0;
        }
    </style>
@endsection

@section('content')
    <div class="container">
        <div class="row">
            <div class="jumbotron" style="margin-top: 30px;">
                <h2>发布过的所有兼职</h2>
                <table class="table table-striped table-hover">
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
                            <td>{{ $job->created_at }}</td>
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
@endsection
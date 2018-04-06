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
                <div class="panel panel-default deliver-status">
                    <div class="panel-heading">我的收藏</div>
                    <div class="panel-body">
                        <table class="table table-hover">
                            <tr>
                                <th>#</th>
                                <th>兼职名称</th>
                                <th>兼职公司</th>
                                <th>兼职薪资</th>
                            </tr>
                            @php $i = 1; @endphp
                            @foreach($collects as $collect)
                                <tr>
                                    <td>{{ $i++ }}</td>
                                    <td><a href="{{ route('job', $collect->job->id) }}">{{ $collect->job->name }}</a></td>
                                    <td>{{ $collect->job->business->name }}</td>
                                    <td>{{ $collect->job->salary }}</td>
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

@endsection
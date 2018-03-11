@extends('layouts.app')

@section('title', '审批简历')

@section('stylesheets')
    <style>
        .jumbotron p {
            font-size: 14px;
            margin-bottom: 5px;
            font-weight: inherit;
        }
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
                    <h4>未审核</h4>
                    @include('partial.table', ['delivers' => $tentative, 'part' => false])
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <h4 class="text-success">已通过</h4>
                            @include('partial.table', ['delivers' => $pass, 'part' => true])
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <h4 class="text-danger">未通过</h4>
                            @include('partial.table', ['delivers' => $fail, 'part' => true])
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
\@endsection

@section('scripts')
    <script>
        $(function () {
            $('.resume-modal .btn-yes').click(function () {
                postCheckResult($(this), 'pass');
            });
            $('.resume-modal .btn-no').click(function () {
                postCheckResult($(this), 'fail');
            });

            function postCheckResult(btn, type) {
                var data = {
                    'resume_id': btn.attr('resume_id'),
                    'job_id': btn.attr('job_id'),
                    'type': type
                };
                $.post('{{ route('business.resume.check.update') }}', data, function (response) {
//                    response = JSON.parse(response);
                    location.reload();
                })
            }
        })
    </script>
@endsection



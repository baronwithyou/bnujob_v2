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
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="jumbotron" style="margin-top: 30px;">
                <h2>未审核</h2>
                @include('partial.table', ['delivers' => $tentative, 'part' => false])
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <div class="jumbotron">
                <h4 class="text-success">已通过</h4>
                @include('partial.table', ['delivers' => $pass, 'part' => true])
            </div>
        </div>
        <div class="col-md-6">
            <div class="jumbotron">
                <h4 class="text-danger">未通过</h4>
                @include('partial.table', ['delivers' => $fail, 'part' => true])
            </div>
        </div>
    </div>
</div>
@endsection

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



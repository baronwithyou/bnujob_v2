@extends('layouts.app')

@section('title', '商家信息')

@section('stylesheets')
    <style>
        .publish-area {
            background: #eeeeee;
        }

        .publish-area .row {
            margin:0 55px;
        }

        .publish-top .publish-img {
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            width: 100px;
            float: left;
            padding: 20px;
            display: inline-block;
        }
        .publish-top .publish-title {
            display: inline-block;
        }
        .footer {
            margin-top: 0;
        }
    </style>
@stop

@section('content')
    <div class="container">
        <div class="row publish-top">
            <img src="{{ asset('images/sun.png') }}" class="img publish-img" alt="">
            <div class="publish-title">
                <h3>Detail</h3>
                <span style="color: #cdcdcd;">商家详情</span>
            </div>
        </div>
    </div>
@stop


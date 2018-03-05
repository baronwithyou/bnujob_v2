@extends('layouts.app')

@section('title', '个人档案')

@section('stylesheets')
    <style>

    </style>
@stop

@section('top')
<section class="user-banner">
    <div class="container-fluid">
        <div class="col-xs-7 col-md-offset-1 col-md-2">
            <img src="{{ asset($user->avatar) }}" class="img img-responsive img-circle img-avatar" alt="">
            <h3 class="text-center">{{ $user->name }}</h3>
        </div>
        <div class="col-xs-5 col-md-3">
            <div class="reputation-div">
                <span class="btn-reputation">声望 {{ $user->reputation }}</span>
            </div>
            <div class="edit-banner-info hidden-xs">
                <p><span class="fa fa-map-marker"></span><a href="">填写现居城市</a></p>
                <p><span class="fa fa-graduation-cap"></span><a href="">填写所在院校</a></p>
                <p><span class="fa fa-building-o"></span><a href="">填写所在年级</a></p>
                {{--<p><span class="fa fa-building-o"></span><a href="">填写</a></p>--}}
            </div>
        </div>
        <div class="hidden-xs col-md-5">
            <div class="ocean">
                <div class="ocean-middle pull-right">
                    <img src="{{ asset('images/ocean/shark.png') }}" class="shark" alt="">
                    <img src="{{ asset('images/ocean/fishes.png') }}" class="fishes" alt="">
                </div>
                <div class="ocean-bottom pull-right">
                    <img src="{{ asset('images/ocean/bottom1.png') }}" class="barnacle" alt="">
                    <img src="{{ asset('images/ocean/bottom2.png') }}" class="coral" alt="">
                    <img src="{{ asset('images/ocean/bottom3.png') }}" class="sea-weed" alt="">
                </div>
            </div>
        </div>
    </div>
</section>
@stop

@section('content')
    <div class="container">
        <div class="row user-content">
            <div class="col-md-2">
                <div class="row hidden-xs">
                    <div class="col-md-6" style="border-right: 1px solid #eeeeee;">收藏 <a href="javascript:void(0);" class="follow-num">{{ $user->collects_count }}</a></div>
                    <div class="col-md-6">投递了 <a href="javascript:void(0);" class="follow-num">{{ $user->delivers_count }}</a></div>
                </div>
                <hr class="no-top">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        校园情况 <span class="fa fa-lock"></span>
                        <button class="btn btn-link pull-right" style="padding: 0;"><i class="fa fa-edit"></i> 编辑</button>
                    </div>
                    <div class="panel-body">
                        <small>CET4/6</small>
                        <p class="black-sentence">592分</p>
                        <hr>
                        <small>绩点</small>
                        <p class="black-sentence">4.0 / 5.0（满分）</p>
                    </div>
                </div>
            </div>

            <div class="col-md-7" id="private-info">
                <div class="alert alert-success alert-dismissible" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    编辑校园情况、求职设置、以及各种经历即可默认创建简历！ <strong>简历越丰富，成功的几率越大!</strong>
                </div>
                <div class="panel panel-default user-private-info">
                    <div class="panel-heading">
                        个人档案
                        <button class="btn btn-link pull-right" @click="toggle"><i class="fa fa-edit"></i> 编辑</button>
                    </div>
                    <div class="panel-body" >
                        <div class="row" v-if="!edit">
                            <div class="col-xs-3 hidden-xs">
                                <p>真人头像 <span class="fa fa-lock"></span></p>
                                <img src="{{ asset($user->avatar) }}" class="img img-responsive img-circle" alt="">
                            </div>
                            <div class="col-xs-5 col-md-4">
                                <p class="list-title">真实姓名 <span class="fa fa-lock"></span></p>
                                <p>@{{ real_name ? real_name : '暂无' }}</p>
                                <p class="list-title">出生日期</p>
                                <p>@{{ birthday ? birthday : '1970-01-01' }}</p>
                                <p class="list-title">手机号码 <span class="fa fa-lock"></span></p>
                                <p>@{{ mobile ? mobile : '暂无' }}</p>
                                <p class="list-title">现居城市</p>
                                <p>@{{ city ? city : '暂无' }}</p>
                            </div>
                            <div class="col-xs-7 col-md-5">
                                <p class="list-title">性别</p>
                                <p>@{{ gender != 0 ? (gender == 1 ? '男' : '女') : '保密' }}</p>
                                <p class="list-title">Email <span class="fa fa-lock"></span></p>
                                <p>@{{ email ? email : '暂无' }}</p>
                                <p class="list-title">通讯地址 <span class="fa fa-lock"></span></p>
                                <p>@{{ address ? address : '暂无' }}</p>
                            </div>
                        </div>
                        <div v-else>
                            <div class="row">
                                <div class="col-md-3 hidden-xs">
                                    <p>真人头像 <span class="fa fa-lock"></span></p>
                                    <img src="{{ asset($user->avatar) }}" class="img img-responsive img-circle" alt="">
                                </div>
                                <div class="col-xs-5 col-md-4">
                                    <p class="list-title">真实姓名 <span class="fa fa-lock"></span></p>
                                    <p><input type="text" placeholder="真实姓名" class="form-control" v-model="real_name"></p>
                                    <p class="list-title">出生日期</p>
                                    <p><input type="date" placeholder="出生日期" class="form-control" v-model="birthday"></p>
                                    <p class="list-title">手机号码 <span class="fa fa-lock"></span></p>
                                    <p>@{{ mobile ? mobile : '暂无' }}</p>
                                    <p class="list-title">现居城市</p>
                                    <p><input type="text" placeholder="现居城市" class="form-control" v-model="city"></p>
                                </div>
                                <div class="col-xs-7 col-md-5">
                                    <p class="list-title">性别</p>
                                    <p>
                                        <select name="gender" id="" class="form-control" v-model="gender">
                                            <option value="" disabled>请选择</option>
                                            <option value="0">未知</option>
                                            <option value="1">男</option>
                                            <option value="2">女</option>
                                        </select>
                                    </p>
                                    <p class="list-title">Email <span class="fa fa-lock"></span></p>
                                    <p><input type="text" placeholder="Email" class="form-control" v-model="email"></p>
                                    <p class="list-title">通讯地址 <span class="fa fa-lock"></span></p>
                                    <p><input type="text" placeholder="通讯地址" class="form-control" v-model="address"></p>
                                </div>
                                {{--<p class="list-title">手机号码 <span class="fa fa-lock"></span></p>--}}
                                {{--<input type="text" class="form-control" disabled v-model="mobile" v-if="mobile">--}}
                                {{--<div style="margin-bottom: 50px;" v-else>--}}
                                    {{--<input type="text" class="form-control" style="width: 60%;float: left;" value="{{ $user->mobile }}">--}}
                                    {{--<button class="btn btn-default" style="width: 38%;float: left;margin-left: 2%;">发送验证码</button>--}}
                                {{--</div>--}}
                            </div>
                            <div class="row">
                                <div class="pull-right" style="margin: 0 30px 15px;">
                                    <button type="button" class="btn btn-yellow" @click="save">保存</button>
                                    <button type="button" class="btn btn-default" @click="toggle">取消</button>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <p>技能爱好 <button class="btn btn-link pull-right" @click="skillToggle"><i class="fa fa-edit"></i> 编辑</button></p>
                        <div v-if="!skill_edit">
                            <p v-if="!skill_content">暂时没有技能爱好</p>
                            <p v-else>@{{ skill_content }}</p>
                        </div>
                        <div v-else>
                            <textarea name="" cols="10" rows="10" v-model="skill_content" class="form-control" placeholder="请输入技能爱好"></textarea>
                            <div class="pull-right">
                                <button type="button" class="btn btn-yellow btn-xs" @click="skillSave">保存</button>
                                <button type="button" class="btn btn-default btn-xs" @click="skillToggle">取消</button>
                            </div>
                            <hr>
                        </div>
                        <hr>
                        <p>个人介绍 <button class="btn btn-link pull-right" @click="introductionToggle"><i class="fa fa-edit"></i> 编辑</button></p>
                        <div v-if="!introduction_edit">
                            <p v-if="!introduction_content">暂时没有个人介绍</p>
                            <p v-else>@{{ introduction_content }}</p>
                        </div>
                        <div v-else>
                            <textarea name="" cols="10" rows="10" v-model="introduction_content" class="form-control" placeholder="请输入个人介绍"></textarea>
                            <div class="pull-right">
                                <button type="button" class="btn btn-yellow btn-xs" @click="introductionSave">保存</button>
                                <button type="button" class="btn btn-default btn-xs" @click="introductionToggle">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
                <resume-toggle title="实习经历" type="job_experience1"></resume-toggle>
                <resume-toggle title="校园经历" type="campus_experience1"></resume-toggle>
                <resume-toggle title="作品" type="works1"></resume-toggle>
            </div>

            <div class="col-md-3">
                <div class="panel panel-default">

                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        求职设置 <span class="fa fa-lock"></span>
                        <button class="btn btn-link pull-right" style="padding: 0;"><i class="fa fa-edit"></i> 编辑</button>
                    </div>
                    <div class="panel-body">
                        <small>期望职位</small>
                        <p class="black-sentence">算法工程师</p>
                        <small>期望薪资</small>
                        <p class="black-sentence">￥300/天</p>
                        <small>教育情况</small>
                        <p class="black-sentence">硕士</p>
                        <small>一周可上班天数</small>
                        <p class="black-sentence">5天</p>
                        <small>求职状态</small>
                        <p class="black-sentence">正在找工作</p>
                        <small>求职类型</small>
                        <p class="black-sentence">实习</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop

@section('scripts')
    <script>
        new Vue({
            el: "#private-info",
            data: {
                edit: false,
                real_name: '{{ $user->real_name }}',
                birthday: '{{ $user->birthday }}',
                mobile: '{{ $user->mobile }}',
                city: '{{ $user->city }}',
                gender: '{{ $user->gender }}',
                email: '{{ $user->email }}',
                address: '{{ $user->address }}',
                verify_code: '',

                skill_edit: false,
                introduction_edit: false,
                introduction_content: '{{ optional($resume)->evaluate }}',
                skill_content: '{{ optional($resume)->skill }}',
            },
            methods: {
                toggle: function() {
                    this.edit = !this.edit;
                },
                save: function () {
                    var params = {
                        real_name: this.real_name,
                        birthday: this.birthday,
                        mobile: this.mobile,
                        city: this.city,
                        gender: this.gender,
                        email: this.email,
                        address: this.address
                    };
                    axios.post('/user/private/info/update', params).then(response => {
                        const data = response.data;
                        if (data.status) {
                            this.edit = false;
                        }
                    });
                },
                skillToggle: function () {
                    this.skill_edit = !this.skill_edit;
                },
                introductionToggle: function () {
                    this.introduction_edit = !this.introduction_edit;
                },
                skillSave: function () {
                    this.resumeSave('skill');
                },
                introductionSave: function () {
                    this.resumeSave('evaluate');
                },
                resumeSave: function (type) {
                    var content = this.skill_content;
                    if (type == 'evaluate')
                        content = this.introduction_content;
                    axios.post('user/resume/normal/update/' + type, {content: content}).then(response => {
                        const data = response.data;
//                        console.log(data);
                        if (data.status) {
                            if (type == 'evaluate')
                                this.introduction_edit = false;
                            else
                                this.skill_edit = false;
                        }
                    });
                }
            }
        });
    </script>
@stop
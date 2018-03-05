@extends('layouts.app')

@section('title', '兼职发布')

@section('stylesheets')
    <style>
        .publish-area {
            /*background: #eeeeee;*/
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
        .publish-area .input-area{
            border: 5px solid #cccccc;
            background: #fff;
            padding: 10px 20px;
            margin: 0 0 40px 0;
        }
        .publish-area .confirm-area {

        }
        .publish-area .btn-send {
            position: absolute;
            bottom: 40px;
            left: 0;
            width: 15%;
            height: 50px;
        }
        .footer {
            margin-top: 0;
        }
    </style>
@stop

@section('content')
<div class="container">
    <div class="row publish-top">
        <img src="{{ asset('images/p.jpeg') }}" class="img publish-img" alt="">
        <div class="publish-title">
            <h3>Publish</h3>
            <span style="color: #cdcdcd;">商家发布兼职</span>
        </div>
    </div>
</div>
<div class="container-fluid publish-area" id="publish">
    <div class="row" style="position: relative;">
        <div class="col-md-3">
            <div class="list-group">
                <a href="{{ route('business.index') }}" class="list-group-item">商家信息</a>
                <a href="{{ route('business.publish') }}" class="list-group-item active">发布兼职</a>
                <a href="#" class="list-group-item">简历审核</a>
            </div>
        </div>
        <div class="col-md-9" style="padding-right: 0;">
            <div class="row input-area">
                <div class="col-md-6">
                    <div class="form-group" :class="{'has-error': errors.has('name')}">
                        <label for="name">工作名称</label>
                        <input type="text" v-validate data-vv-rules="required" data-vv-as="工作名称" name="name"
                               :class="{'is-danger': errors.has('name') }"  class="form-control" placeholder="工作名称（如：外送员）" v-model="name">
                        <span class="help-block"><strong v-show="errors.has('name')">@{{ errors.first('name') }}</strong></span>
                    </div>
                    <div class="form-group" :class="{'has-error': errors.has('salary')}">
                        <label for="salary" style="display: block;">薪资</label>
                        <input type="text" class="form-control" v-validate data-vv-rules="required" data-vv-as="薪资" name="salary"
                               placeholder="薪资" :class="{'is-danger': errors.has('salary') }" v-model="salary" style="width: 70%; display: inline-block;"> / 天
                        <span class="help-block"><strong v-show="errors.has('salary')">@{{ errors.first('salary') }}</strong></span>
                    </div>
                    <div class="form-group" :class="{'has-error': errors.has('description')}">
                        <label for="description">工作描述</label>
                        <textarea name="description" v-validate data-vv-rules="required" data-vv-as="工作描述" :class="{'is-danger': errors.has('description') }"
                                  class="form-control" placeholder="请输入工作描述" v-model="description" cols="30" rows="10"></textarea>
                        <span class="help-block"><strong v-show="errors.has('description')">@{{ errors.first('description') }}</strong></span>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group" :class="{'has-error': errors.has('required')}">
                        <label for="required">岗位需求</label>
                        <textarea name="required" v-validate data-vv-rules="required" data-vv-as="岗位需求" :class="{'is-danger': errors.has('required') }"
                                  class="form-control" placeholder="请输入岗位需求" v-model="required" cols="30" rows="10"></textarea>
                        <span class="help-block"><strong v-show="errors.has('required')">@{{ errors.first('required') }}</strong></span>
                    </div>
                    <div class="form-group" :class="{'has-error': errors.has('contact')}">
                        <label for="contact">联系方式</label>
                        <input type="text" class="form-control" v-validate data-vv-rules="required" data-vv-as="联系方式" name="contact"
                               placeholder="联系方式" :class="{'is-danger': errors.has('contact') }" v-model="contact">
                        <span class="help-block"><strong v-show="errors.has('contact')">@{{ errors.first('contact') }}</strong></span>
                    </div>
                    <div class="form-group" :class="{'has-error': errors.has('location')}">
                        <label for="location">所属范围</label>
                        {{--<input type="text" class="form-control" v-validate data-vv-rules="required" data-vv-as="所属范围" name="location"--}}
                               {{--placeholder="所属范围" :class="{'is-danger': errors.has('location') }" v-model="location">--}}
                        <select id="location" v-model="location" class="form-control">
                            <option value="" disabled>请选择</option>
                            @foreach(config('content.location') as $key => $value)
                                <option value="{{ $key }}">{{ $value }}</option>
                            @endforeach
                        </select>
                        <span class="help-block"><strong v-show="errors.has('location')">@{{ errors.first('location') }}</strong></span>
                    </div>
                    <div class="form-group" :class="{'has-error': errors.has('address')}">
                        <label for="address">工作地址</label>
                        <input type="text" class="form-control" v-validate data-vv-rules="required" data-vv-as="工作地址" name="address"
                               placeholder="工作地址" :class="{'is-danger': errors.has('address') }" v-model="address">
                        <span class="help-block"><strong v-show="errors.has('address')">@{{ errors.first('address') }}</strong></span>
                    </div>
                </div>
            </div>
        </div>
        {{--<img src="{{ asset('images/stopcock.png') }}" style="margin-left: -7px" class="img" alt="">--}}
        <button class="btn btn-yellow btn-block btn-send" @click="send">发送</button>
    </div>
</div>
@stop

@section('scripts')
    <script>
        new Vue({
            el: '#publish',
            data() {
                return {
                    name: '',
                    salary: '',
                    description: '',
                    required: '',
                    contact: '',
                    address: '',
                    location: '',
                }
            },
            methods: {
                send: function () {
                    const params = {
                        name: this.name,
                        salary: this.salary,
                        description: this.description,
                        required: this.required,
                        contact: this.contact,
                        address: this.address,
                        location: this.location,
                    };
                    axios.post('{{ route('business.publish.store') }}', params).then(response => {
                        const data = response.data;
                        if (data.status) {
                            swal({
                                title: "Good job!",
                                text: data.msg,
                                icon: "success",
                                button: "确定!",
                            }).then(() => {
                                window.location.href = '{{ route('business.index') }}';
                            });
                        } else {

                        }
                    });
                }
            }
        })
    </script>
@stop
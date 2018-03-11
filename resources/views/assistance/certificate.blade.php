@extends('layouts.app')

@section('title', '商家认证')

@section('stylesheets')
    <style>
        #certificate-area .col-md-6{
            margin-top: 20px;
            border: 2px dashed rgba(27,31,35,0.3);
            padding: 20px;
        }
        #certificate-area .tips {
            min-height: 56px;
            padding: 10px;
            border: solid 1px #0366d6;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            width: 100%;
        }
        #certificate-area .tips h4 {
            font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
            color: #0366d6;
            margin: 1px 20px 3px 0;
            font-size: 16px;
            line-height: 1.2
        }
        #certificate-area .tips .left-part {
            float: left;
            width: 36%;
        }
        #certificate-area .tips .right-part {
            width: 54%;
            float: left;
        }
    </style>
@stop

@section('content')
    <div class="certificate-area">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-md-offset-1" style="padding: 0;">
                    <ul class="nav nav-tabs" style="margin-top: 20px;">
                        <li role="presentation" class="active"><a href="#">实名制认证</a></li>
                    </ul>
                </div>
            </div>

            <div class="row" id="certificate-area">
                <div class="col-md-6 col-md-offset-1" v-if="first" >
                    {!! Form::open() !!}
                    <div class="form-group" :class="{'has-error': errors.has('real_name')}">
                        <label for="real_name">真实姓名</label>
                        <input type="text" v-validate data-vv-rules="required" data-vv-as="真实姓名" name="real_name"
                               :class="{'is-danger': errors.has('real_name') }"  class="form-control" placeholder="真实姓名（如：哈利波特）" v-model="real_name">
                        <span class="help-block"><strong v-show="errors.has('real_name')">@{{ errors.first('real_name') }}</strong></span>
                    </div>

                    <div class="form-group" :class="{'has-error': errors.has('identity')}">
                        <label for="identity">身份证号</label>
                        <input type="text" v-validate data-vv-rules="required" data-vv-as="身份证号" name="identity"
                               :class="{'is-danger': errors.has('identity') }"  class="form-control" placeholder="身份证号（如：4414XXXXXXXXXXXX）" v-model="identity">
                        <span class="help-block"><strong v-show="errors.has('identity')">@{{ errors.first('identity') }}</strong></span>
                    </div>

                    <label for="" style="margin-right: 10px;">商家手机号</label>
                    <label for="new_mobile"><input type="radio" name="mobile_select" id="new_mobile" :checked="is_new"  @click="toggle('new')"> 使用新手机号</label>
                    <label for="default_mobile" v-if="mobile"><input type="radio" name="mobile_select" style="margin-left: 20px;" :checked="!is_new" id="default_mobile" @click="toggle('default')"> 使用账号绑定手机号</label>

                    <div v-if="is_new" :class="{'has-error': errors.has('mobile') || errors.has('verify_code')}">
                        <input type="text" name="mobile" v-validate data-vv-rules="required" v-model="mobile"
                               class="form-control" placeholder="手机号(仅支持大陆手机号码)" style="margin-bottom: 15px;">
                        <div class="input-group">
                            <input type="text" name="verify_code" v-validate data-vv-rules="required" class="form-control"
                                   placeholder="短信验证码" v-model="verify_code">
                            <span class="input-group-addon">
                            <button type="button" class="btn btn-link" @click="getVerifyCode" :disabled="disabled">获取验证码 <span v-show="disabled">(@{{ time }}秒后再试)</span></button>
                        </span>
                        </div>
                        <span class="help-block">
                        <strong v-show="errors.has('mobile')">
                            @{{ errors.first('mobile') }}
                        </strong>
                        <strong v-show="errors.has('verify_code')">
                            @{{ errors.first('verify_code') }}
                        </strong>
                    </span>
                    </div>
                    <div class="form-group" v-else>
                        <input type="text" name="" class="form-control" disabled placeholder="{{ Auth::user()->mobile }}" v-model="mobile">
                    </div>
                    <div class="class">
                        <button type="button" @click="nextStep" class="btn btn-yellow btn-block">下一步</button>
                    </div>
                    {!! Form::close() !!}
                </div>
                <div class="col-md-6 col-md-offset-1" v-else>
                        <h2>详细信息</h2>
                        <div class="form-group" :class="{'has-error': errors.has('name')}">
                            <label for="name">店铺名称</label>
                            <input type="text" v-validate data-vv-rules="required" data-vv-as="店铺名称" name="name"
                                   :class="{'is-danger': errors.has('name') }"  class="form-control" placeholder="店铺名称（如：金拱门）" v-model="name">
                            <span class="help-block"><strong v-show="errors.has('name')">@{{ errors.first('name') }}</strong></span>
                        </div>

                        <div class="form-group" :class="{'has-error': errors.has('school')}">
                            <label for="school">所属校区</label>
                            <input type="text" v-validate data-vv-rules="required" data-vv-as="所属校区" name="school"
                                   :class="{'is-danger': errors.has('school') }"  class="form-control" placeholder="北京师范大学珠海分校" disabled v-model="school">
                            <span class="help-block"><strong v-show="errors.has('school')">@{{ errors.first('school') }}</strong></span>
                        </div>

                        <div class="form-group" :class="{'has-error': errors.has('type')}">
                            <label for="type">营业类型</label>
                            <select id="type" v-model="type" class="form-control" @change="clear">
                                <option value="" disabled>请选择</option>
                                @foreach(config('content.business_type') as $ind => $type)
                                    <option value="{{ $ind }}">{{ $type }}</option>
                                @endforeach
                            </select>
                            <span class="help-block"><strong v-show="errors.has('type')">@{{ errors.first('type') }}</strong></span>
                        </div>

                        <div class="form-group" :class="{'has-error': errors.has('abstract')}">
                            <label for="abstract">商家简介</label>
                            <textarea name="abstract" v-validate data-vv-rules="required" data-vv-as="商家简介" :class="{'is-danger': errors.has('abstract') }"
                                      class="form-control" placeholder="请输入商家简介" v-model="abstract" cols="30" rows="10"></textarea>
                            <span class="help-block"><strong v-show="errors.has('abstract')">@{{ errors.first('abstract') }}</strong></span>
                        </div>

                        <div class="row">
                            <div class="col-md-3">
                                <button type="button" class="btn btn-default btn-block" @click="priorStep">上一步</button>
                            </div>
                            <div class="col-md-9">
                                <button type="button" @click="complete" class="btn btn-yellow btn-block" style="margin-bottom: 20px;">完成</button>
                            </div>
                        </div>
                    </div>
                <div class="col-md-4">
                    <div class="panel panel-default tips">
                        <div class="panel-body">
                            <div class="left-part">
                                <span class="fa fa-5x fa-ravelry"></span>
                            </div>
                            <div class="right-part">
                                <h4>冷知识</h4>
                                <p>长颈鹿的角叫长颈鹿角</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
@stop

@section('scripts')
    <script>
        $(function () {
            if ('{{ session()->get('first_pass') }}')
                NProgress.set(0.5);
        });
        new Vue({
            el: "#certificate-area",
            data() {
                return {
                    first: '{{ !session()->get('first_pass') }}',
                    is_new: '{{ session()->has('first') ? session()->get('first')['is_new'] : true }}',
                    real_name: '{{ session()->has('first') ? session()->get('first')['real_name'] : '' }}',
                    identity: '{{ session()->has('first') ? session()->get('first')['credit_id'] : '' }}',
                    mobile: '{{ Auth::user()->mobile }}',
                    verify_code: '{{ session()->has('first') ? session()->get('first')['verify_code'] : '' }}',
                    disabled: false,
                    time: 60,

                    name: '',
                    school: '北京师范大学珠海分校',
                    type: '',
                    abstract: '',
                }
            },
            methods: {
                clear: function () {
                    this.errors.remove('type');
                },
                toggle: function (btn) {
                    if (btn === 'new')
                        this.is_new = true;
                    else
                        this.is_new = false;
                },
                nextStep: function () {
                    if (this.is_new && (!this.verify_code || !this.mobile)) {
                        this.errors.add('mobile', '手机号码和验证码不能为空');
                        return false;
                    }
                    const params = {
                        real_name: this.real_name,
                        identity: this.identity,
                        mobile: this.mobile,
                        verify_code: this.verify_code,
                        is_new: this.is_new
                    };
                    axios.post('/business/certificate_first', params).then(response => {
                        const data = response.data;
                        if (data.status) {
                            this.first = false;
                            NProgress.set(0.5);
                        } else {
                            const real_data = data.data;
                            if (real_data['type'] === 'mobile')
                                this.errors.add('mobile', real_data.msg);
                            else
                                this.errors.add('identity', real_data.msg);
                        }
                    }).catch(error => {
                        const errors = error.response.data.errors;
                        if (errors.real_name) {
                            this.errors.add('real_name', errors.real_name[0]);
                        }
                        if (errors.mobile) {
                            this.errors.add('mobile', errors.mobile[0]);
                        }
                        if (errors.identity) {
                            this.errors.add('identity', errors.identity[0]);
                        }
                    });
                },
                getVerifyCode() {
                    if (this.is_new && !this.mobile) {
                        this.errors.add('mobile', '手机号 是必须的.');
                        return;
                    }
                    axios.post('/get-verify-code', {'mobile': this.mobile}).then(response => {
                        const data = response.data;
                        if (data.status) {
                            Tool.successPrompt(data.msg);
                            const the = this;
                            this.disabled = true;
                            let t1 = window.setInterval(function() {
                                the.time--;
                                if (!the.time) {
                                    window.clearInterval(t1);
                                    the.disabled = false;
                                }
                            }, 1000);
                        } else {
                            this.errors.add('mobile', data.msg);
                        }
                    }).catch(error => {
//                        console.log(error);
                        Tool.errorPrompt('获取验证码失败,请稍后再试');
                    });
                },
                priorStep() {
                    this.first = true;
                },
                complete() {
                    const params = {
                        name: this.name,
                        school: this.school,
                        type: this.type,
                        abstract: this.abstract
                    };
                    axios.post('certificate_second', params).then(response => {
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
                            swal(data.msg);
                        }
                    }).catch(error => {
                        const errors = error.response.data.errors;
                        if (errors.name) {
                            this.errors.add('name', errors.name[0]);
                        }
                        if (errors.abstract) {
                            this.errors.add('abstract', errors.abstract[0]);
                        }
                        if (errors.type) {
                            this.errors.add('type', errors.type[0]);
                        }
                    });
                }
            }
        });
    </script>
@stop
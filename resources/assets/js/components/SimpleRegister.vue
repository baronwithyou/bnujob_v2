<template>
    <div class="register">
        <div class="form-group" :class="{'has-error': errors.has('name')}">
            <input type="text" v-validate data-vv-rules="required" v-model="name"
                   :class="{'is-danger': errors.has('name') }"  name="name"
                   class="form-control" placeholder="真实姓名或常用昵称" id="name">
            <span class="help-block"><strong v-show="errors.has('name')">{{ errors.first('name') }}</strong></span>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('mobile') || errors.has('verify_code')}">
            <input type="text" v-validate data-vv-rules="required" v-model="mobile"
                   name="mobile" id="mobile" class="form-control" placeholder="手机号(仅支持大陆手机号码)">
        </div>
        <div class="form-group" :class="{'has-error': errors.has('mobile') || errors.has('verify_code')}">
            <div class="input-group">
                <input type="text" v-validate data-vv-rules="required" v-model="verify_code"
                       name="verify_code" placeholder="短信验证码" class="form-control" id="">
                <span class="input-group-addon" id="basic-addon2"><a href="javascript:void(0)" @click="getVerifyCode">获取验证码</a></span>
            </div>
            <span class="help-block">
                <strong v-show="errors.has('mobile')">
                    {{ errors.first('mobile') }}
                </strong>
                <strong v-show="errors.has('verify_code')">
                    {{ errors.first('verify_code') }}
                </strong>
            </span>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('password')}">
            <input type="password" v-validate data-vv-rules="required|min:6" v-model="password"
                   class="form-control" placeholder="密码(不少于六位)" name="password" id="password">
            <span class="help-block"><strong v-show="errors.has('password')">{{ errors.first('password') }}</strong></span>
        </div>
        <span>已有账号？<a href="#auth-check" data-toggle="modal">立即登录</a></span>
        <button class="btn btn-register pull-right" @click="register">注册</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                mobile: '',
                name: '',
                verify_code: '',
                password: '',
            }
        },
        methods: {
            getVerifyCode() {
                axios.post('/get-verify-code', {'mobile': this.mobile}).then(response => {
                    const data = response.data;
                    if (data.status) {
                        Tool.successPrompt(data.msg);
                    } else {
                        Tool.errorPrompt(data.msg);
                    }
                }).catch(error => {
                    Tool.errorPrompt('获取验证码失败');
                });
            },
            register() {
                if (!this.name || !this.mobile || !this.verify_code || !this.password) {
                    Tool.errorPrompt('请完整填写信息再提交');
                    return false;
                }
                axios.post('/register',
                    {'name': this.name, 'mobile': this.mobile, 'verify_code': this.verify_code, 'password': this.password}).then(response => {
                    const data = response.data;
                    if (data.status) {
                        Tool.successPrompt(data.msg);
                        location.reload();
                    } else {
                        Tool.errorPrompt(data.msg);
                    }
                }).catch(error => {
                    const errors = error.response.data.errors;
                    let msg = '';
                    if (errors.mobile) {
                        msg += errors.mobile[0];
                    }
                    Tool.errorPrompt(msg);
                })
            }
        }
    }
</script>

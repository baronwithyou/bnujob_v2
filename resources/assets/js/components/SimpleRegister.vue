<template>
    <div class="register">
        <div class="form-group" :class="{'has-error': errors.has('name')}">
            <input type="text" v-validate data-vv-rules="required" v-model="name" name="name"
                   @keyup.enter="register"  class="form-control" placeholder="真实姓名或常用昵称">
            <span class="help-block"><strong v-show="errors.has('name')">{{ errors.first('name') }}</strong></span>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('mobile') || errors.has('verify_code')}">
            <input type="text" v-validate data-vv-rules="required" v-model="mobile" @keyup.enter="register"
                   name="mobile" class="form-control" placeholder="手机号(仅支持大陆手机号码)">
        </div>
        <div class="form-group" :class="{'has-error': errors.has('mobile') || errors.has('verify_code')}">
            <div class="input-group">
                <input type="text" v-validate data-vv-rules="required|digits:6" v-model="verify_code"
                       @keyup.enter="register" name="verify_code" placeholder="短信验证码" class="form-control" id="">
                <span class="input-group-addon" id="basic-addon2">
                    <button class="btn btn-link" @click="getVerifyCode" :disabled="disabled">获取验证码 <span v-show="disabled">({{ time }}秒后再试)</span></button>
                </span>
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
            <input type="password" v-validate data-vv-rules="required|min:6" v-model="password" @keyup.enter="register"
                   class="form-control" placeholder="密码(不少于六位)" name="password">
            <span class="help-block"><strong v-show="errors.has('password')">{{ errors.first('password') }}</strong></span>
        </div>
        <span>已有账号？<a href="#auth-modal" data-toggle="modal">立即登录</a></span>
        <button class="btn btn-register pull-right" @click="register" id="simple-register-btn" data-type="expand-right"
                :disabled="allowToSubmit">注册</button>
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
                disabled: false,
                time: 60
            }
        },
        computed: {
            allowToSubmit: function () {
                return this.errors.has('password') || this.errors.has('name') ||
                    this.errors.has('mobile') || this.errors.has('verify_code')
            }
        },
        methods: {
            getVerifyCode() {
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
                    Tool.errorPrompt('获取验证码失败,请稍后再试');
                });
            },
            register() {
                if (!this.name || !this.mobile || !this.verify_code || !this.password) {
                    if (!this.name) {
                        this.errors.add('name', '用户名 是必须的.');
                    }
                    if (!this.mobile) {
                        this.errors.add('mobile', '手机号 是必须的.');
                    }
                    if (!this.verify_code) {
                        this.errors.add('verify_code', '验证码 是必须的.');
                    }
                    if (!this.password) {
                        this.errors.add('password', '密码 是必须的.');
                    }
                    return false;
                }
                var l = Ladda.create(document.querySelector('#register-btn'));
                l.start();
                axios.post('/register',
                    {'name': this.name, 'mobile': this.mobile, 'verify_code': this.verify_code, 'password': this.password}).then(response => {
                    const data = response.data;
                    if (data.status) {
                        location.reload();
                    } else {
                        l.stop();
                        Tool.errorPrompt(data.msg);
                    }
                }).catch(error => {
                    l.stop();
                    const errors = error.response.data.errors;
                    if (errors.name) {
                        this.errors.add('name', errors.name[0]);
                    }
                })
            }
        }
    }
</script>

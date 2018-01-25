<template>
    <div>
        <div class="form-group" :class="{'has-error': errors.has('name')}">
            <label for="name">用户名</label>
            <input type="text" v-validate data-vv-rules="required" data-vv-as="用户名" @keyup.enter="register"
                   :class="{'is-danger': errors.has('name') }"  name="name" class="form-control" placeholder="真实姓名或常用昵称" id="name" v-model="name">
            <span class="help-block"><strong v-show="errors.has('name')">{{ errors.first('name') }}</strong></span>
        </div>
        <div class="form-group">
            <input type="radio" name="register_type" id="mobile-select" checked @click="changeSelectedType('mobile')"> <label for="mobile-select">用手机号注册</label>
            <input type="radio" name="register_type" id="email-select" @click="changeSelectedType('email')"> <label for="email-select">用Email注册</label>
        </div>
        <div class="form-group" v-show="mobileSelected" :class="{'has-error': errors.has('mobile') || errors.has('verify_code')}">
            <input type="text" name="mobile" v-validate data-vv-rules="required" v-model="mobile"
                   @keyup.enter="register" class="form-control" placeholder="手机号(仅支持大陆手机号码)" style="margin-bottom: 15px;">
            <div class="input-group">
                <input type="text" name="verify_code" v-validate data-vv-rules="required" class="form-control"
                       @keyup.enter="register" placeholder="短信验证码" v-model="verify_code">
                <span class="input-group-addon">
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
        <div class="form-group" v-show="mobileSelected === false" :class="{'has-error': errors.has('email')}" >
            <input type="email" name="email" v-validate data-vv-rules="required|email" @keyup.enter="register"
                   placeholder="part-time@bnujob.com" class="form-control" v-model="email">
            <span class="help-block">
                <strong v-show="errors.has('email')">
                    {{ errors.first('email') }}
                </strong>
            </span>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('password')}">
            <label for="password">密码</label>
            <input type="password" name="password" v-validate data-vv-rules="required|min:6" @keyup.enter="register"
                   id="password" class="form-control" placeholder="不少于六位" v-model="password">
            <span class="help-block"><strong v-show="errors.has('password')">{{ errors.first('password') }}</strong></span>
        </div>
        <span>同意并接受 <a href="">《服务条款》</a></span>
        <button class="btn btn-primary pull-right ladda-button" data-style="expand-right" @click="register" :disabled="allowToSubmit" id="register-btn">注册</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                verify_code: '',
                mobile: '',
                password: '',
                email: '',
                mobileSelected: true,
                time: 60,
                disabled: false
            }
        },
        computed: {
            allowToSubmit: function () {
                var allow = this.errors.has('password') || this.errors.has('name');
                if (this.mobileSelected) {
                    return allow || this.errors.has('mobile') || this.errors.has('verify_code')
                } else {
                    return allow || this.errors.has('email')
                }
            }
        },
        methods: {
            changeSelectedType: function (type) {
                if (type === 'mobile') {
                    this.mobileSelected = true
                } else {
                    this.mobileSelected = false;
                }
            },
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
                    console.log(error);
                    Tool.errorPrompt('获取验证码失败,请稍后再试');
                });
            },
            register() {
                var errors = 0;
                if (!this.name) {
                    this.errors.add('name', '用户名 是必须的.');
                    errors++;
                }
                if (!this.password) {
                    this.errors.add('password', '密码 是必须的.');
                    errors++;
                }
                if (this.mobileSelected) {
                    if (!this.mobile) {
                        this.errors.add('mobile', '手机号 是必须的.');
                        errors++;
                    }
                    if (!this.verify_code) {
                        this.errors.add('verify_code', '验证码 是必须的.');
                        errors++;
                    }
                } else {
                    if (!this.email) {
                        this.errors.add('email', '邮箱 是必须的.');
                        errors++;
                    }
                }
                if (errors > 0) {
                    return false;
                }
                var params;
                if (this.mobileSelected) {
                    params = {'name': this.name, 'mobile': this.mobile, 'verify_code': this.verify_code, 'password': this.password};
                } else {
                    params = {'name': this.name, 'email': this.email, 'password': this.password};
                }
                var l = Ladda.create(document.querySelector('#register-btn'));
                l.start();
                axios.post('/register', params).then(response => {
                    const data = response.data;
                    if (data.status) {
                        location.reload();
                    } else {
                        l.stop();
                        this.errors.add('verify_code', data.msg);
                    }
                }).catch(error => {
                    l.stop();
                    const errors = error.response.data.errors;
                    if (errors.name) {
                        this.errors.add('name', errors.name[0]);
                    }
                    if (errors.mobile) {
                        this.errors.add('mobile', errors.mobile[0]);
                    }
                    if (errors.email) {
                        this.errors.add('email', errors.email[0]);
                    }
                });
            }
        }
    }
</script>

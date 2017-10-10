<template>
    <div class="register">
        <div class="form-group" :class="{'has-error': errors.has('name')}">
            <input type="text" v-validate data-vv-rules="required"
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
                <input type="text" v-validate data-vv-rules="required"
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
            <input type="password" v-validate data-vv-rules="required|min:6"  name="password" id="password"
                   class="form-control" placeholder="密码(不少于六位)">
            <span class="help-block"><strong v-show="errors.has('password')">{{ errors.first('password') }}</strong></span>
        </div>
        <span>已有账号？<a href="#auth-check" data-toggle="modal">立即登录</a></span>
        <button class="btn btn-register pull-right">注册</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                mobile: ''
            }
        },
        methods: {
            getVerifyCode() {
                axios.post('/get-verify-code', {'mobile': this.mobile}).then(response => {
                    Tool.test(response.data.msg);
                }).catch(error => {

                });
            }
        }
    }
</script>

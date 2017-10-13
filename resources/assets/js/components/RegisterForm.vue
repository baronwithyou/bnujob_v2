<template>
    <div>
        <div class="form-group" :class="{'has-error': errors.has('name')}">
            <label for="name">用户名</label>
            <input type="text" v-validate data-vv-rules="required" data-vv-as="用户名" :class="{'is-danger': errors.has('name') }"  name="name" class="form-control" placeholder="真实姓名或常用昵称" id="name" v-model="name">
            <span class="help-block"><strong v-show="errors.has('name')">{{ errors.first('name') }}</strong></span>
        </div>
        <div class="form-group" :class="{'has-error': mobile_error}">
            <input type="radio" name="register_type" value="mobile" id="mobile" checked> <label for="mobile">用手机号注册</label>
            <input type="radio" name="register_type" value="email" id="email"> <label for="email">用Email注册</label>
            <div id="register_type_show">
                <input type="text" name="mobile" v-model="mobile" class="form-control" placeholder="手机号(仅支持大陆手机号码)" style="margin-bottom: 15px;" id="">
                <div class="input-group">
                    <input type="text" name="mobile-verify" class="form-control" placeholder="短信验证码" id="mobile-verify" v-model="verify_code">
                    <span class="input-group-addon" id="basic-addon2"><a href="">获取验证码</a></span>
                </div>
            </div>
            <span class="help-block"><strong v-text="mobile_msg"></strong></span>
        </div>
        <div class="form-group" :class="{'has-error': password_error}">
            <label for="password">密码</label>
            <input type="password" name="password" id="password" class="form-control" placeholder="不少于六位" v-model="password">
            <span class="help-block"><strong v-text="password_msg"></strong></span>
        </div>
        <span>同意并接受 <a href="">《服务条款》</a></span>
        <button type="button" @click="register" class="btn btn-register pull-right">注册</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name_error: '',
                mobile_error: '',
                password_error: '',
                name : '',
                mobile : '',
                verify_code : '',
                password : '',
            }
        },
        computed: {
            name_msg() {
                return this.name_error ? this.name_error : '';
            },
            mobile_msg() {
                return this.mobile_error ? this.mobile_error : '';
            },
            password_msg() {
                return this.password_error ? this.password_error : '';
            }
        },
        methods: {
            register: function() {
                axios.post('/register', {name: this.name, mobile: this.mobile, password: this.password, verify_code: this.verify_code}).then(response => {

                }).catch(error => {
                    error = error.response.data.errors;
                    this.name_error = error.name ? error.name[0] : '';
                    this.password_error = error.password ? error.password[0] : '';
                    this.mobile_error = (error.mobile || error.verify_code) ? error.mobile[0] + " " + error.verify_code[0] : '';
                })
            }
        }
    }
</script>

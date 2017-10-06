<template>
    <div>
        <div class="form-group" :class="{'has-error': name_error}">
            <input type="text" class="form-control" placeholder="11位手机号或邮箱" v-model="name">
            <span class="help-block"><strong v-text="name_msg"></strong></span>
        </div>
        <div class="form-group" :class="{'has-error': password_error}">
            <input type="password" class="form-control" placeholder="密码" v-model="password">
            <span class="help-block"><strong v-text="password_msg"></strong></span>
        </div>
        <input type="checkbox" name="remember_token" checked id=""> 记住登录状态
        <button type="button" @click="login" class="btn btn-register pull-right">登录</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name_error: '',
                password_error: '',
                name : '',
                password : '',
            }
        },
        computed: {
            name_msg() {
                return this.name_error ? this.name_error : '';
            },
            password_msg() {
                return this.password_error ? this.password_error : '';
            }
        },
        methods: {
            login: function() {
                axios.post('/login', {name: this.name, password: this.password}).then(response => {

                }).catch(error => {
                    error = error.response.data.errors;
                    this.name_error = error.mobile ? error.mobile[0] : '';
                    this.name_error += error.email ? error.email[0] : '';
                    this.password_error = error.password ? error.password[0] : '';
                })
            }
        }
    }
</script>

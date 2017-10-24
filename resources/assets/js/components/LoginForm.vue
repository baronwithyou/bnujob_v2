<template>
    <div>
        <div class="form-group" :class="{'has-error': errors.has('username') || errors.has('all')}">
            <input type="text" v-validate data-vv-rules="required"  name="username"
                   :class="{'is-danger': errors.has('username') }" class="form-control" placeholder="11位手机号或邮箱" v-model="username">
            <span class="help-block"><strong v-show="errors.has('username')">{{ errors.first('username') }}</strong></span>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('password') || errors.has('all')}">
            <input type="password" v-validate data-vv-rules="required"
                   name="password" class="form-control" placeholder="密码" v-model="password">
            <span class="help-block">
                <strong v-show="errors.has('password')">{{ errors.first('password') }}</strong>
                <strong v-show="errors.has('all')">{{ errors.first('all') }}</strong>
            </span>
        </div>
        <input type="checkbox" name="remember_token" checked id="remember"> <label for="remember">记住登录状态</label>
        <button type="button" @click="login" class="btn btn-register pull-right ladda-button" data-style="expand-right"
                :disabled="errors.has('username') || errors.has('password')" id="login-btn"><span class="ladda-label">登录</span></button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login() {
                if (!this.username || !this.password) {
                    if (!this.username) {
                        this.errors.add('username', '用户名 是必须的.');
                    }
                    if (!this.password) {
                        this.errors.add('password', '密码 是必须的.');
                    }
                    return false;
                }
                var l = Ladda.create(document.querySelector('#login-btn'));
                l.start();
                axios.post('/login', {'username': this.username, 'password': this.password}).then(response => {
                    location.reload();
                }).catch(error => {
                    const errors = error.response.data.errors;
                    this.errors.add('all', errors.mobile[0]);
                    l.stop();
                });
            }
        }
    }
</script>

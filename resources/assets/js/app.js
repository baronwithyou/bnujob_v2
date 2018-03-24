
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

require('./main');

window.Tool = require('./tool');

window.Vue = require('vue');

window.NProgress = require('nprogress');

window.echarts = require('echarts');

require('sweetalert');

import zh_CN from '../locale/vee-validate/zh_CN';

import VeeValidate, { Validator } from 'vee-validate';

Validator.addLocale(zh_CN);

const dictionary = {
    zh_CN: {
        attributes: {
            email: '邮箱',
            mobile: '手机号',
            verify_code: '验证码',
            password: '密码',
            name: '用户名',
            username: '用户名'
        }
    }
};
Validator.updateDictionary(dictionary);

Vue.use(VeeValidate, {
    locale: 'zh_CN'
});


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Vue.component('example', require('./components/Example.vue'));

Vue.component('register-form', require('./components/RegisterForm.vue'));

Vue.component('simple-register', require('./components/SimpleRegister.vue'));

Vue.component('login-form', require('./components/LoginForm.vue'));

// Vue.component('open-config', require('./components/OpenConfig.vue'));

Vue.component('resume-toggle', require('./components/ResumeToggle.vue'));

Vue.component('comment', require('./components/Comment.vue'));

Vue.component('record-btn', require('./components/DeliverBtn.vue'));

Vue.component('collect-btn', require('./components/CollectBtn.vue'));

// Vue.component('introduction', require('./components/Introduction.vue'));

const app = new Vue({
    el: '#app'
});

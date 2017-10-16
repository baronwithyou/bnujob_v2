<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Example Component</div>

                    <div class="panel-body">
                        <!--{{ firstName + ' ' + lastName }}-->
                        {{ fullName }}
                        <button class="btn btn-primary btn-block" @click="changeName()">Change Name</button>
                        <template v-if="ok">
                            <h4>1.This template would not appear</h4>
                        </template>
                        <div v-if="ok">
                            <h4>2.This is True</h4>
                        </div>
                        <div v-else>
                            <h4>3.This is False</h4>
                        </div>
                        <div class="form-group">
                            <input type="radio" name="register_type" value="mobile" id="mobile-select" checked @click="changeSelectedStatus('mobile')"> <label for="mobile-select">用手机号注册</label>
                            <input type="radio" name="register_type" value="email" id="email-select" @click="changeSelectedStatus('email')"> <label for="email-select">用Email注册</label>
                            <hr>
                            <template v-if="selected">
                                <label for="mobile">手机号</label>
                                <input type="text" name="" id="mobile" class="form-control">
                            </template>
                            <template v-else>
                                <label for="email">Email</label>
                                <input type="text" name="" id="email" class="form-control">
                            </template>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: 'Hello',
                firstName: 'Martin',
                lastName: 'Lam',
                ok: false,
                selected: true
            }
        },
        mounted() {
            console.log('Component mounted.')
        },
        // 计算属性是基于他们的依赖进行缓存的（只有在相关依赖发生改变了才重新求值）
        computed: {
            now: function () {
                return Date.now();
            },
            reverseMessage: function () {
                return this.message.split('').reverse().join('');
            },
            fullName: {
                get: function () {
                    return this.firstName + " " + this.lastName;
                },
                set: function (newValue) {
                    var names = newValue.split(' ');
                    this.firstName = names[0];
                    this.lastName = names[names.length - 1];
                }
            },
        },
        // 函数定义与计算属性完全相反
        methods: {
            changeName: function () {
                this.fullName = 'Hello world';
            },
            changeSelectedStatus: function (type) {
                if (type === 'mobile') {
                    this.selected = true
                } else {
                    this.selected = false;
                }
            }
        }
    }
</script>

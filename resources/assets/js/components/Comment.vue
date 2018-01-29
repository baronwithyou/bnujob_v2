<template>
    <div>
        <div class="row hover-area" >
            <div class="col-xs-2 col-md-1">
                <div class="comment-grade-btn pull-right" >
                    <button class="btn btn-default" @click="increase" :class="{'clicked': is_increase}" :disabled="is_increase">
                        <i class="fa fa-chevron-up"></i>
                    </button>
                    <button class="btn btn-default">{{ agree_count }}</button>
                    <button class="btn btn-default" @click="decrease" :class="{'clicked': is_decrease}" :disabled="is_decrease">
                        <i class="fa fa-chevron-down"></i>
                    </button>
                </div>
            </div>
            <div class="col-xs-10 col-md-11" v-if="!edit">
                <div class="comment-detail">
                    <div class="comment-content">
                        <p>{{ content }}</p>
                    </div>
                    <div class="comment-info">
                        <small>{{ poster }} 发布 </small>
                        <small>{{ time }} 前回答</small>
                        <small><a href="javascript:void(0)" style="color: #000" @click="editToggle" v-if="is_me">编辑</a></small>
                    </div>
                </div>
            </div>
            <div class="col-xs-10 col-md-11"  v-else>
                <textarea class="form-control" style="min-height: 140px;">{{ content }}</textarea>
                <div class="pull-right" style="margin-top: 5px">
                    <button class="btn btn-xs btn-default" @click="editToggle">取消</button>
                    <button class="btn btn-xs btn-primary" style="margin: 0 0 0 5px;">保存</button>
                </div>
            </div>
        </div>

        <hr>
    </div>
</template>

<script>
    export default {
        props: ['c', 'a', 't', 'u', 'c_id', 'is_c', 'p', 'is_m'],
        data() {
            return {
                agree_count: this.a,
                content: this.c,
                time: this.t,
                user_id: this.u,
                comment_id: this.c_id,
                is_check: this.is_c,
                poster: this.p,
                is_me: this.is_m,
                is_increase: false,
                is_decrease: false,
                edit: false
            }
        },
        mounted() {
            axios.post('/api/user/like/' + this.comment_id, {}).then(response => {
                const data = response.data;
                if (data === 'like')
                    this.is_increase = true;
                else if (data === 'dislike')
                    this.is_decrease = true;
            });
        },
        methods: {
            increase: function () {
                if (!this.checkAuth())
                    return false;
                axios.post('/job/comment/like/update', {user_id: this.user_id, comment_id: this.comment_id, type: 'like'}).then(response => {
                    const data = response.data;
                    if (data.status) {
                        if (this.is_decrease === true)
                            this.is_decrease = false;
                        else
                            this.is_increase = true;
                        this.agree_count++;
                    }
                });

            },
            decrease: function () {
                if (!this.checkAuth())
                    return false;
                axios.post('/job/comment/like/update', {user_id: this.user_id, comment_id: this.comment_id, type: 'dislike'}).then(response => {
                    const data = response.data;
                    if (data.status) {
                        if (this.is_increase === true)
                            this.is_increase = false;
                        else
                            this.is_decrease = true;
                        this.agree_count--;
                    }
                });
            },
            checkAuth: function () {
                if (!this.is_check) {
                    swal({
                        title: "未核实身份",
                        text: "你还未登录，是否跳转至登录页面!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    }).then((yse) => {
                        if (yse) {
                            $('#auth-modal').modal('show');
                        }
                    });
                    return false;
                }
                return true;
            },
            editToggle: function () {
                this.edit = !this.edit;
            }
        }
    }
</script>

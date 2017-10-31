<template>
    <div class="panel panel-default user-private-info">
        <div class="panel-heading">
            {{ title }}
        </div>
        <div class="panel-body"  v-if="edit">
            <div class="form-inline">
                <div class="form-group">
                    <label for="start_at">开始时间： </label>
                    <input type="date" name="start_at" id="start_at" v-model="start_at" class="form-control">
                </div>
                <div class="form-group">
                    <label for="end_at">结束时间： </label>
                    <input type="date" name="end_at" id="end_at" v-model="end_at" class="form-control">
                </div>
            </div>
            <div class="form-group" style="margin-top: 10px;">
                <textarea name="description" v-validate data-vv-rules="required|min:20" data-vv-as="具体描述" v-model="description"
                          id="description" cols="20" rows="10" class="form-control" placeholder="请输入具体描述"></textarea>
            </div>
            <div class="pull-right">
                <button type="button" class="btn btn-yellow" @click="save">保存</button>
                <button type="button" class="btn btn-default" @click="toggle">取消</button>
            </div>
        </div>
        <div class="panel-body" v-else>
            <div class="row">
                <div class="col-xs-6">{{ default_start }}</div>
                <div class="col-xs-6">{{ default_start }}</div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    {{ default_description }}
                </div>
            </div>
            <a href="javascript:void(0);" @click="toggle"><i class="fa fa-plus"></i> 添加{{ title }}</a>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['title', 'type', 'user'],
        mounted() {
            axios.post('/api/user/resume/' + this.type, {user: this.user}).then(response => {

            });
        },
        data() {
            return {
                edit: false,
                start_at: '',
                end_at: '',
                description: '',
                default_start : '',
                default_end: '',
                default_description: ''
            }
        },
        methods: {
            toggle() {
                if (this.edit === true) {
                    this.edit = false;
                } else {
                    this.edit = true;
                }
            },
            save() {
                axios.post('user/store/detail/' + this.type, {'start_at': this.start_at, 'end_at': this.end_at, 'description': this.description}).then(response => {
                    const data = response.data;
                    if (data.status) {
                        this.edit = false;
                    } else {

                    }
                });
            }
        }
    }
</script>

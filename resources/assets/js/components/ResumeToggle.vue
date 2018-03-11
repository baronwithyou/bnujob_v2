<template>
    <div class="panel panel-default user-private-info">
        <div class="panel-heading">
            {{ title }}
            <button class="btn btn-link pull-right" @click="toggle" style="padding: 0;"><i class="fa fa-edit"></i> 编辑</button>
        </div>
        <div class="panel-body"  v-if="edit">
            <div class="form-group">
                <label for="start_at">开始时间： </label>
                <input type="date" name="start_at" id="start_at" v-model="start_at" class="form-control">
            </div>
            <div class="form-group">
                <label for="end_at">结束时间： </label>
                <input type="date" name="end_at" id="end_at" v-model="end_at" class="form-control">
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
            <div v-if="description">
                <div class="row">
                    <div class="col-xs-6">开始时间：{{ start_at }}</div>
                    <div class="col-xs-6">结束时间：{{ end_at }}</div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        描述： {{ description }}
                    </div>
                </div>
            </div>
            <a href="javascript:void(0);" @click="toggle" v-else><i class="fa fa-plus"></i> 添加{{ title }}</a>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['title', 'type'],
        mounted() {
            axios.get('/api/user/resume/' + this.type).then(response => {
                const data = response.data;
                if (data) {
                    this.start_at = data.start_at;
                    this.end_at = data.end_at;
                    this.description = data.description;
                }
            });
        },
        data() {
            return {
                edit: false,
                start_at: '',
                end_at: '',
                description: '',
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
                axios.post('user/resume/' + this.type + '/update', {'start_at': this.start_at, 'end_at': this.end_at, 'description': this.description}).then(response => {
                    const data = response.data;
                    if (data.status) {
                        this.edit = false;
                    } else {
                        swal("Error", "系统错误，请稍后再试", "warning");
                    }
                });
            }
        }
    }
</script>

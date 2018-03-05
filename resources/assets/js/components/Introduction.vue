<template>
    <div>
        <p>{{ name }} <button class="btn btn-link pull-right"><i class="fa fa-edit"></i> 编辑</button></p>
        <div class="skill" v-if="!edit">
            暂时没有{{ name }}
        </div>
        <div v-else>
            <textarea name="" cols="20" rows="10" v-model="content" class="form-control" placeholder="请输入{{ name }}"></textarea>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['tmp_name', 'tmp_type', 'tmp_content'],
        data() {
            return {
                name: this.tmp_name,
                type: this.tmp_type,
                content: this.tmp_content,
                edit: false,
            }
        },
        methods: {
            click: function () {

            }
        }
    }
</script>
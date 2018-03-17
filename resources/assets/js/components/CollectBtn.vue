<template>
    <div>
        <button class="btn btn-yellow" @click="click">收藏</button>
        <span style="margin-left: 10px;"><strong>{{ count }}</strong> 人收藏</span>
    </div>
</template>

<script>
    export default {
        props: ['c', 'j_id'],
        data() {
            return {
                count: this.c,
                job_id: this.j_id,
            }
        },
        methods: {
            click: function () {
                axios.post('/job/collect', {job_id: this.job_id}).then(response => {
                    response = response.data;
                });
            },
        },
    }
</script>
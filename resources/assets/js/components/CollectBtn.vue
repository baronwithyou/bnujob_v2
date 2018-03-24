<template>
    <div>
        <button class="btn btn-default" @click="click">收藏</button>
        <span style="margin-left: 10px;"><strong>{{ count }}</strong> 人收藏</span>
    </div>
</template>

<script>
    export default {
        props: ['c', 'j_id', 'is_c', 'is_cl'],
        data() {
            return {
                count: this.c,
                job_id: this.j_id,
                is_check: this.is_c,
                is_collected: this.is_cl,
            }
        },
        methods: {
            click: function () {
                const self = this;
                axios.post('/job/collect', {job_id: this.job_id}).then(response => {
                    response = response.data;
                    if (response.status) {
                        if (self.is_collected)
                            self.count--;
                        else
                            self.count++;
                        self.is_collected = !self.is_collected;
                    } else {
                        swal('Warning', response.msg, 'error');
                    }
                });
            },
        }
    }
</script>
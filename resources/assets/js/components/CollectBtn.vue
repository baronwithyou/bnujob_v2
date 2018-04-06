<template>
    <div>
        <button class="btn btn-default" :class="{brown: is_collected}" @click="click">收藏</button>
        <span style="margin-left: 10px;"><strong>{{ count }}</strong> 人收藏</span>
    </div>
</template>

<script>
    export default {
        props: ['j_id'],
        data() {
            return {
                count: 0,
                job_id: this.j_id,
                is_check: false,
                is_collected: false,
            }
        },
        mounted() {
            // console.log(this.c, this.is_collected);
            const self = this;
            axios.post('/job/get/collect_config/' + self.job_id, {}).then(response => {
                response = response.data;
                self.count = response.count;
                self.is_check = response.is_check;
                self.is_collected = response.is_collected;
            });
        },
        methods: {
            click: function () {
                if (!this.is_check) {
                    $('#auth-modal').modal('show');
                    return false;
                }
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

<style>
    .brown {
        background: #eee;
    }
</style>
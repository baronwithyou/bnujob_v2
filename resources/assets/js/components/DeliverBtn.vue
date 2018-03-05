<template>
    <div>
        <button class="btn btn-yellow" @click="click">投递</button>
        <span style="margin-left: 10px;"><strong>{{ count }}</strong> 人投递</span>
    </div>
</template>

<script>
    export default {
        props: ['ct', 'dd', 'j_id', 'is_c'],
        data() {
            return {
                delivered: this.dd,
                count: this.ct,
                job_id: this.j_id,
                is_check: this.is_c
            }
        },
        methods: {
            click: function () {
                if (!this.is_check) {
                    $('#auth-modal').modal('show');
                    return false;j
                }
                if (this.delivered == 0) {
                    swal("投递后将无法撤销，是否同意此操作?", {
                        buttons: true,
                    }).then(value => {
                        if (value) {
                            axios.post('/job/deliver', { job_id: this.job_id }).then(response => {
                                const data = response.data;
                                if (data.status) {
                                    this.count++;
                                    this.delivered = 1;
                                    swal("Good job!", "投递成功，请等待审核信息!", "success");
                                } else {
                                    swal('Sorry!', data.msg, 'error');
                                }
                            }).catch();
                        }
                    });
                } else {
                    swal({
                        icon: "warning",
                        text: "你已经投递过该兼职，请勿重试",
                        dangerMode: true
                    });
                }
            },
        },
    }
</script>
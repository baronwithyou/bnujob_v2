<template>
    <div class="checkbox pull-right" style="padding: 2px 40px 2px 0; margin: 0">
        <label>
            <input type="checkbox" :checked="checked" :value="checked" @change="updateConfig" id="website-open-type"> <i class="fa fa-icon-eye-open"></i> 十级美颜效果
        </label>
    </div>
</template>

<script>
    export default {
        props: ['user'],
        data() {
            return {
                checked: false
            }
        },
        mounted() {
            if (this.user) {
                axios.post('/api/user/config/' + this.user).then(response => {
                    if (response.data.open_type && response.data.open_type === 'modal') {
                        this.checked = true;
                        $('.welcome-store').addClass('open-modal');
                    } else {
                        this.checked = false;
                        $('.welcome-store').removeClass('open-modal');
                    }
                });
            }
        },
        methods: {
            updateConfig() {
                axios.post('/api/user/config/update/' + this.user).then(response => {
                    this.checked = response.data.open_type === 'modal';
                    if (this.checked) {
                        $('.welcome-store').addClass('open-modal');
                    } else {
                        $('.welcome-store').removeClass('open-modal');
                    }
                }).catch();
            }
        }
    }
</script>

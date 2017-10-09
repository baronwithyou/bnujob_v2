<template>
    <div class="col-md-12">
        <label class="label" for="email">Email</label>
        <p :class="{ 'control': true }">
            <input v-validate data-vv-rules="required|email" data-vv-as="邮箱" :class="{'input': true, 'is-danger': errors.has('email') }" id="email" class="form-control" name="email" type="email" placeholder="Email">
            <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
        </p>
    </div>
</template>

<script>
    export default {
        mounted() {

        }
    }
</script>

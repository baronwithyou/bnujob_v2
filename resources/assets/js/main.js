$(function () {
    $("input[name='register_type']").change(function () {
        var $this = $("input[name='register_type']:checked");
        if ('email' === $this.val()) {
            $('#register_type_show').html('<input type="email" name="email" id="" placeholder="hacker@bnu.com" class="form-control">');
        } else {
            $('#register_type_show').html('<input type="text" name="mobile" id="" placeholder="手机号(仅支持大陆手机号码)" style="margin-bottom: 15px;" class="form-control">' +
                '<input type="text" name="mobile-verify" id="" placeholder="短信验证码" class="form-control">');
        }
    })
});
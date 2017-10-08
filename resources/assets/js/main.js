$(function () {
    var csrfToken = $('meta[name="csrf-token"]').attr('content');
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': csrfToken
        }
    });
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name=csrf-token]').getAttribute('content');

    // var error_arr = ['name', 'verify_code', 'mobile', 'password'];
    // $('#register-form').on('submit', function (e) {
    //     e.preventDefault();
    //     var $this = $(this);
    //     var data = $this.serialize();
    //     $.ajax({
    //         url: '/register',
    //         type: 'POST',
    //         data: data,
    //         dataType: 'json',
    //         success: function (result) {
    //
    //         },
    //         error: function (msg) {
    //             msg = JSON.parse(msg.responseText);
    //             var errors = msg.errors;
    //             console.log(errors);
    //             $.each(errors, function (i, val) {
    //                 var validate = $this.find('.validate-' + i);
    //                 validate.addClass('has-error');
    //                 validate.find(".help-block strong").html(val);
    //             });
    //             console.log(error_arr);
    //         }
    //     });
    // });

    $("input[name='register_type']").on('click', function () {
        var $this = $("input[name='register_type']:checked");
        if ('email' === $this.val()) {
            $('#register_type_show').html('<input type="email" name="email" id="" placeholder="part-time@bnujob.com" class="form-control">');
        } else {
            $('#register_type_show').html('<input type="text" name="mobile" id="" placeholder="手机号(仅支持大陆手机号码)" style="margin-bottom: 15px;" class="form-control">' +
                '<div class="input-group"><input type="text" name="mobile-verify" id="" placeholder="短信验证码" class="form-control"><span class="input-group-addon" id="basic-addon2"><a href="">获取验证码</a></span></div>');
        }
    });

    $('.search-wrapper').tooltip({
        content: '点击查询兼职信息'
    });


});

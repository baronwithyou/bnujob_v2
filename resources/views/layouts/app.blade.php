<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <link rel="stylesheet" href="{{ mix('css/all.css') }}">
    <title>bnu job - @yield('title')</title>
    @yield('stylesheets')
</head>
<body>
    @if(url()->current() != url('/'))
        <div class="app-top">
            @include('partial.navbar')
        </div>
    @endif
    @yield('top')

    <div class="container" id="app">
        @yield('content')
        @include('partial.footer')
        @include('modal.auth-check')
    </div>
    {{--@yield('footer')--}}
</body>
<script src="{{ mix('js/app.js') }}"></script>
<script src="{{ mix('js/all.js') }}"></script>
<script src="{{ asset('js/wangEditor.min.js') }}"></script>
<script>
    $(function () {
        var E = window.wangEditor;
        var editor = new E('#job-comment-editor');
        editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ];
        editor.create();
    })
    function searchToggle(obj, evt){
        var container = $(obj).closest('.search-wrapper');

        if(!container.hasClass('active')){
            container.addClass('active');
            evt.preventDefault();
        }
        else if(container.hasClass('active') && $(obj).closest('.input-holder').length === 0){
            container.removeClass('active');
            // clear input
            container.find('.search-input').val('');
            // clear and hide result container when we press close
            container.find('.result-container').fadeOut(100, function(){$(this).empty();});
        }
    }

    function submitFn(obj, evt){
        value = $(obj).find('.search-input').val().trim();

        _html = "Yup yup! Your search text sounds like this: ";
        if(!value.length){
            _html = "Yup yup! Add some text friend :D";
        }
        else{
            _html += "<b>" + value + "</b>";
        }

        $(obj).find('.result-container').html('<span>' + _html + '</span>');
        $(obj).find('.result-container').fadeIn(100);

        evt.preventDefault();
    }
</script>
@yield('javascripts')
</html>
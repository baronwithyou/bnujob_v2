<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="authorization" content="{{ Auth::check() ? 'Bearer '.Auth::user()->api_token : 'Bearer ' }}">
    <meta name="animate" content="{{ \App\Http\Helpers::getRandomAnimate() }}">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <link rel="stylesheet" href="{{ mix('css/all.css') }}">
    <title>BNU JOB - @yield('title')</title>
    @yield('stylesheets')
</head>
<body>
<div>
    @if(url()->current() != url('/'))
        <div class="app-top">
            @include('partial.navbar')
        </div>
    @endif
    <div id="app">
        @yield('top')
        @include('modal.auth-check')
    </div>
    @yield('content')
    @include('partial.footer')
</div>
</body>
<script src="{{ mix('js/app.js') }}"></script>
<script src="{{ mix('js/all.js') }}"></script>
<script src="{{ asset('js/wangEditor.min.js') }}"></script>
<script>
    $(function () {
        @if(count($errors->all()) > 0)
            Tool.errorPrompt('{{ $errors->first() }}');
        @endif

        @auth
            @if(($count = Auth::user()->unCheckMsg()) > 0 && url()->current() != route('user.deliver_status'))
            Notification.create(
                '通知', '你有 <a href="{{ route('user.deliver_status') }}">{{ $count }} 条未读信息</a>', '{{ asset(Auth::user()->avatar) }}', 'bounceInLeft', 1, 10, function() {}
            );
            @endif
        @endauth
    });
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
@yield('scripts')
</html>
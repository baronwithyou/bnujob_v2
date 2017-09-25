<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/main.css') }}">
    <link rel="stylesheet" href="{{ asset('css/all.css') }}">
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

    <div class="container">
        @yield('content')
    </div>
    @yield('footer')
    @include('modal.auth-check')
    <script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('js/all.js') }}"></script>
    @yield('javascripts')
</body>
</html>
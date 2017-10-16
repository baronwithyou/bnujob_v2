<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="animate" content="{{ \App\Http\Helpers::getRandomAnimate() }}">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <link rel="stylesheet" href="{{ mix('css/all.css') }}">
    <title>BNU JOB - Test</title>
</head>
<body>
<div id="app">
    {{--<example></example>--}}
    <div style="width: 90%; margin: 0 auto; background: #fafafa;">
        <section style="height: 5px; background: #f8d615;"></section>
        <div style="padding: 2% 5%;">
            <h3>bnu <span style="color: #5eb1e7;">job</span></h3>
            <p>海绵宝宝%id%号： %name%</p>
            <p>你好啊</p>
            <p>请尽快点击此链接以完成激活 <a style="text-decoration: none;" href="%url%">%url%</a></p>
            <p>对网站有任何兴趣 请联系我 martinhacker1@outlook.com</p>
        </div>
        <section style="height: 22px; background: #5eb1e7; color: #fff; text-align: center;">www.bnujob.cn</section>
    </div>

</div>
</body>
<script src="{{ mix('js/app.js') }}"></script>
<script src="{{ mix('js/all.js') }}"></script>
</html>


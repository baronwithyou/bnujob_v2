<section class="user-banner">
    <div class="container-fluid">
        <div class="col-xs-7 col-md-offset-1 col-md-2">
            <img src="{{ asset($user->avatar) }}" class="img img-responsive img-circle img-avatar" alt="">
            <h3 class="text-center">{{ $user->name }}</h3>
        </div>
        <div class="col-xs-5 col-md-3">
            <div class="reputation-div">
                <span class="btn-reputation">声望 {{ $user->reputation }}</span>
            </div>
            <div class="edit-banner-info hidden-xs">
                {{--<p><span class="fa fa-map-marker"></span><a href="">填写现居城市</a></p>--}}
                {{--<p><span class="fa fa-graduation-cap"></span><a href="">填写所在院校</a></p>--}}
                {{--<p><span class="fa fa-building-o"></span><a href="">填写所在年级</a></p>--}}
                {{--<p><span class="fa fa-building-o"></span><a href="">填写</a></p>--}}
            </div>
        </div>
        <div class="hidden-xs col-md-5">
            <div class="ocean">
                <div class="ocean-middle pull-right">
                    <img src="{{ asset('images/ocean/shark.png') }}" class="shark" alt="">
                    <img src="{{ asset('images/ocean/fishes.png') }}" class="fishes" alt="">
                </div>
                <div class="ocean-bottom pull-right">
                    <img src="{{ asset('images/ocean/bottom1.png') }}" class="barnacle" alt="">
                    <img src="{{ asset('images/ocean/bottom2.png') }}" class="coral" alt="">
                    <img src="{{ asset('images/ocean/bottom3.png') }}" class="sea-weed" alt="">
                </div>
            </div>
        </div>
    </div>
</section>
<div class="row hidden-xs">
    <div class="col-md-6" style="border-right: 1px solid #eeeeee;">收藏 <a href="javascript:void(0);" class="follow-num">{{ $user->collects_count }}</a></div>
    <div class="col-md-6">投递 <a href="{{ route('user.deliver_status') }}" class="follow-num">{{ $user->delivers_count }}</a></div>
</div>
<hr class="no-top">
<div class="list-group">
    <a href="{{ route('user.index') }}" class="list-group-item {{ url()->current() == route('user.index') ? 'active' : '' }}">个人档案</a>
    <a href="{{ route('user.deliver_status') }}" class="list-group-item {{ url()->current() == route('user.deliver_status') ? 'active' : '' }}">兼职状态</a>
    <a href="{{ route('user.collect') }}" class="list-group-item {{ url()->current() == route('user.collect') ? 'active' : '' }}">我的收藏</a>
</div>
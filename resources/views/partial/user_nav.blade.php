<div class="row hidden-xs">
    <div class="col-md-6" style="border-right: 1px solid #eeeeee;">收藏 <a href="javascript:void(0);" class="follow-num">{{ $user->collects_count }}</a></div>
    <div class="col-md-6">投递 <a href="{{ route('user.deliver_status') }}" class="follow-num">{{ $user->delivers_count }}</a></div>
</div>
<hr class="no-top">
<div class="list-group">
    <a href="{{ route('user.index') }}" class="list-group-item {{ $active_location == 1 ? 'active' : '' }}">个人档案</a>
    <a href="{{ route('user.deliver_status') }}" class="list-group-item {{ $active_location == 2 ? 'active' : '' }}">兼职状态</a>
    <a href="" class="list-group-item {{ $active_location == 3 ? 'active' : '' }}">我的收藏</a>
</div>
<ul class="nav nav-tabs business-nav" style="margin-top: 20px;">
    <li role="presentation" class="{{ url()->current() == route('business.all_jobs') ? 'active' : '' }}">
        <a href="{{ route('business.all_jobs') }}">所有兼职
            @if(($tentative = \App\Http\Helpers::getDeliverMeg()) > 0)
                <span class="badge">{{ $tentative }}</span>
            @endif
        </a>
    </li>
    <li role="presentation" class="{{ url()->current() == route('business.index') ? 'active' : '' }}"><a href="{{ route('business.index') }}">基本数据</a></li>
    <li role="presentation" class="{{ url()->current() == route('business.publish') ? 'active' : '' }}"><a href="{{ route('business.publish') }}">发布兼职</a></li>
</ul>

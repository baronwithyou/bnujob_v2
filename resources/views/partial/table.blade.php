<table class="table table-hover" style="background: #fff;">
    <tr>
        <th>#</th>
        @if($has_job_name)
        <th>兼职名称</th>
        @endif
        <th>投递人</th>
        <th>手机号码</th>
        <th>邮箱</th>
        <th>微信</th>
        <th>投递时间</th>
        <th>操作</th>
    </tr>
    <?php $i = 1;?>
    @foreach($delivers as $deliver)
        <tr>
            <td>{{ $i++ }}</td>
            @if($has_job_name)
            <td>{{ $deliver->job->name }}</td>
            @endif
            <td>{{ $deliver->user->real_name ? $deliver->user->real_name : $deliver->user->name }}</td>
            <td>{{ $deliver->user->mobile ?? '暂无' }}</td>
            <td>{{ $deliver->user->email ?? '暂无' }}</td>
            <td>{{ $deliver->user->wechat ?? '暂无' }}</td>
            <td>{{ $deliver->created_at->diffForHumans() }}</td>
            <td>
                <button data-toggle="modal" data-target="#resume-modal-{{ $deliver->id }}" class="btn btn-xs btn-primary">查看简历</button>
            </td>
        </tr>
        @include('modal.resume-modal', [
            'deliver' => $deliver,
            'part' => $part
        ])
    @endforeach
</table>
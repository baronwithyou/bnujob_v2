<div class="modal fade resume-modal" tabindex="-1" role="dialog" id="resume-modal-{{ $deliver->id }}">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">简历详情</h4>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="row">
                        <?php $user = $deliver->user; $resume = $user->resume; ?>
                        <h4><strong>真实姓名：</strong>{{ $user->real_name ?? '暂无'}}</h4>
                        <div class="col-md-4">
                            <p><strong>Email:</strong> {{ $user->email ?? '暂无' }}</p>
                            <p><strong>年龄:</strong> {{ $user->age ?? '暂无' }}</p>
                            <p><strong>CET：</strong>{{ $resume->cet ?? '暂无' }}</p>
                        </div>
                        <div class="col-md-4">
                            <p><strong>手机:</strong> {{ $user->mobile ?? '暂无' }}</p>
                            <p><strong>年级:</strong> {{ $user->grade ?? '暂无' }}</p>
                            <p><strong>专业：</strong>{{ $resume->specialty ?? '暂无' }}</p>
                        </div>
                        <div class="col-md-4">
                            <p><strong>性别：</strong>{{ config('content.gender.'.$user->gender) }}</p>
                            <p><strong>微信：</strong>{{ $user->wechat ?? '暂无' }}</p>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-12">
                            <p><strong>主修课程：</strong>{{ $resume->specialty_courses ?? '暂无' }}</p>
                            <p><strong>个人简介：</strong>{{ $user->abstract ?? '暂无' }}</p>
                            <p><strong>技能爱好：</strong>{{ $resume->skill ?? '暂无' }}</p>
                            <p><strong>个人评价：</strong>{{ $resume->evaluate ?? '暂无' }}</p>
                            <hr>
                            <p><strong>实习经历：</strong>{!! \App\Http\Helpers::displayJsonData($resume->job_experience1) !!}</p>
                            <hr>
                            <p><strong>校园经历：</strong>{!! \App\Http\Helpers::displayJsonData($resume->campus_experience1) !!}</p>
                            <hr>
                            <p><strong>作品展示：</strong>{!! \App\Http\Helpers::displayJsonData($resume->works1) !!}</p>
                            <hr>
                            <p><strong>附件简历：</strong>
                                @if($resume->upload_location)
                                    <a href=""></a>
                                @else
                                    暂无
                                @endif
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                @if(!$part)
                    <button class="btn btn-danger pull-left btn-no" resume_id="{{ $deliver->resume_id }}" job_id="{{ $deliver->job_id}}" style="width: 200px">NO(拒绝)</button>
                    <button class="btn btn-success btn-yes" resume_id="{{ $deliver->resume_id }}" job_id="{{ $deliver->job_id}}" style="width: 200px">YES(同意)</button>
                @else
                    <button class="btn btn-default" data-dismiss="modal">关闭</button>
                @endif
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
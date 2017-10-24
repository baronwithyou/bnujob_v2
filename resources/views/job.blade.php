@extends('layouts.app')

@section('title', '兼职详情')

@section('content')
    <div class="job-title">
        <div class="row">
            <div class="col-xs-8 col-md-9">
                <h3>快递员 <small>GITHUB美食小站</small></h3>
                <span class="label label-primary">餐饮</span>
                <span class="label label-primary">IT</span>
                <span style="margin-left:  2%"><span class="fa fa-phone"></span> 13106803427</span>
                <div class="pull-right">
                    <span>￥300元/天</span>
                    <span>地址：广东省珠海市</span>
                </div>
            </div>
            <div class="col-xs-4 col-md-3">
                <div class="deliver-area">
                    <button class="btn btn-yellow">投递</button>
                    <span><strong>3</strong>人投递</span>
                </div>
                <div class="collect-area">
                    <button class="btn btn-default">收藏</button>
                    <span><strong>10</strong>人收藏</span>
                </div>
            </div>
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col-md-9">
            <div class="job-detail">
                <h4 class="detail-title">工作描述</h4>
                <ol>
                    <li>负责制定市行办公和会议制度，组织市行办公和重要会议；</li>
                    <li>负责协调各部室工作，负责市行部署工作、会议议定事项 和行领导交办事项的督办、查办工作；</li>
                    <li>负责全行综合惰况反映及行务信息反映；</li>
                    <li>负责为行领导办公提供服务；</li>
                </ol>
                <h4 class="detail-title">岗位需求</h4>
                <ol>
                    <li>建筑学、环艺等相关专业本科学历；了解造价、材料、设备、建筑、施工相关专业综合知识；</li>
                    <li>一年以上工装设计经验；具备独立的设计能力，有创意、丰富的方案设计及方案深化设计经验；能独立完成整套施工图。</li>
                    <li>现场经验丰富，熟悉装饰施工工艺，最新材料；</li>
                    <li>良好学习能力；爱岗敬业、工作主动、责任感强；身体健康、品行端正，无不良嗜好！</li>
                    <li>熟练操作电脑，备有较高的设计水平和专业的施工图绘制水平。熟练掌握CAD、photoshop、3DMAX、STRECHUP等专业常用软件，精通3D效果图</li>
                    <li>服从工作安排，按时按量高标准完成设计任务；</li>
                    <li>根据公司需要出差</li>
                </ol>
                <hr>
            </div>
            <div class="job-comment">
                <div class="row">
                    <div class="col-xs-2 col-md-1">
                        <div class="comment-grade-btn pull-right">
                            <button class="btn btn-default">
                                <i class="fa fa-chevron-up"></i>
                            </button>
                            <button class="btn btn-default">12</button>
                            <button class="btn btn-default">
                                <i class="fa fa-chevron-down"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-xs-10 col-md-11">
                        <div class="comment-detail">
                            <div class="comment-content">
                                <p>
                                    因为这个不是json, 看看这个
                                    http://www.w3school.com.cn/js...
                                </p>
                            </div>
                            <div class="comment-info">
                                <small>41分钟前回答</small>
                                <small>3 评论</small>
                                <small>编辑</small>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
            <div class="comment-edit">
                <div class="col-md-10 col-md-offset-1">
                    <h4>撰写评论</h4>
                    <div id="job-comment-editor">
                        <p>Hello, <strong>Job Searcher</strong></p>
                    </div>
                    <button class="btn btn-yellow pull-right">提交评论</button>
                </div>
            </div>
        </div>
        <div class="hidden-xs col-md-3">
            <div class="similar-job-detail">
                <div class="panel panel-default similar-search">
                    <div class="panel-body">
                        <button class="close">&times;</button>
                        <span>在寻找类似兼职？</span>
                        {!! Form::text('job', '外卖员', ['class' => 'form-control search']) !!}
                        {!! Form::button('查找', ['class' => 'btn btn-default pull-right']) !!}
                    </div>
                </div>
                <div class="similar-job">
                    <span class="fa fa-meh-o"></span> 相似兼职
                    <span class="pull-right"><a href="" class="more">more <span class="fa fa-angle-double-right"></span></a></span>
                </div>
            </div>
        </div>
    </div>
@stop

@section('scripts')
    <script>
        $(function () {
            $('.similar-search .close').click(function () {
                $('.similar-search').hide();
            });
        });
    </script>
@stop


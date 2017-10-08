@extends('layouts.app')

@section('title', 'Welcome')

@section('top')
    @include('partial.navbar')
    @include('partial.banner')
@stop

@section('content')
    <div class="col-xs-12 col-md-9">
        <div class="welcome-table-nav">
            <span class="fa fa-grav"></span> 所有商家
            <ul class="nav nav-pills pull-right">
                <li role="presentation" class="active"><a href="#home" data-toggle="tab">海华苑</a></li>
                <li role="presentation"><a href="#profile" data-toggle="tab">燕华苑</a></li>
                <li role="presentation"><a href="#messages" data-toggle="tab">京华苑</a></li>
                <li role="presentation"><a href="#settings" data-toggle="tab">粤华苑</a></li>
            </ul>
        </div>
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="home">
                <div class="welcome-store">
                    <a href="{{ route('job', 1) }}">
                        <div class="col-md-10">
                            <span class="h4">外卖员</span><span class="pull-right">地址：广东省珠海市</span>
                            <div class="job-description">
                                <p>
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                </p>
                            </div>
                            <small class="pull-right">Github 专卖店</small>
                        </div>
                        <div class="hidden-xs col-md-2">
                            <img src="{{ asset('images/user.png') }}" class="img img-responsive" alt="">
                        </div>
                    </a>
                </div>
                <div class="welcome-store">
                    <a href="javascript:void(0);" id="test-1">
                        <div class="col-md-10">
                            <span class="h4">外卖员</span><span class="pull-right">地址：广东省珠海市</span>
                            <div class="job-description">
                                <p>
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                </p>
                            </div>
                            <small class="pull-right">Github 专卖店</small>
                        </div>
                        <div class="hidden-xs col-md-2">
                            <img src="{{ asset('images/user.png') }}" class="img img-responsive" alt="">
                        </div>
                    </a>
                </div>
                <div class="welcome-store">
                    <a href="{{ route('job', 1) }}">
                        <div class="col-md-10">
                            <span class="h4">外卖员</span><span class="pull-right">地址：广东省珠海市</span>
                            <div class="job-description">
                                <p>
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                    GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 29 million projects.
                                </p>
                            </div>
                            <small class="pull-right">Github 专卖店</small>
                        </div>
                        <div class="hidden-xs col-md-2">
                            <img src="{{ asset('images/user.png') }}" class="img img-responsive" alt="">
                        </div>
                    </a>
                </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="profile">..123.123123</div>
            <div role="tabpanel" class="tab-pane" id="messages">.123..</div>
            <div role="tabpanel" class="tab-pane" id="settings">...123123</div>
        </div>
    </div>
    <div class="hidden-xs col-md-3">
        <div class="welcome-recommend">
            <span class="fa fa-heart-o"></span> Part-time 推荐
            <span class="pull-right"><a href="" class="more">more <span class="fa fa-angle-double-right"></span></a></span>
            <div class="full-area">
                {{--<img src="{{ asset('img/sun-shine.png') }}" class="img-icon" alt="">--}}
                <div class="left-area">
                    <img src="{{ asset('images/user.png') }}" class="img img-responsive" alt="">
                </div>
                <div class="right-area">
                    <a href="">
                        <p>前端开发实习生</p>
                        <small>Github专卖店</small>
                    </a>
                    <span class="label">上周六8点</span>
                </div>
            </div>
            <div class="full-area">
                <div class="left-area">
                    <img src="{{ asset('images/user.png') }}" class="img img-responsive" alt="">
                </div>
                <div class="right-area">
                    <a href="">
                        <p>前端开发实习生</p>
                        <small>Github专卖店</small><small>上周六8点</small>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="cd-modal">
        <div class="modal-content">
            <h1>外卖员</h1>
            <h4 style="text-align: center; margin-bottom: 20px;">Github外卖小吃店</h4>

            <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    {{--<div class="row">--}}
                        {{--<button class="btn btn-primary pull-right" style="margin:0 15px;">投递</button>--}}
                        {{--<button class="btn btn-warning pull-right">收藏</button>--}}
                    {{--</div>--}}
                    <div class="row">
                        <div class="col-md-4"><span class="fa fa-phone"></span> 13106803427</div>
                        <div class="col-md-4"><span class="fa fa-rmb"></span> 300元/天</div>
                        <div class="col-md-4"><span class="fa fa-map-marker"></span> 广东省珠海市</div>
                    </div>
                    <hr>
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
                            <div class="col-md-1" style="padding: 0; margin: 0;">
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
                            <div class="col-md-8">
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
                        <h4>撰写评论</h4>
                        <div id="job-comment-editor">
                            <p>Hello, <strong>Job Searcher</strong></p>
                        </div>
                        <button class="btn btn-primary pull-right">提交评论</button>
                    </div>
                </div>
            </div>
        </div> <!-- .modal-content -->

        <a href="#0" class="modal-close">Close</a>
    </div>
    <div class="cd-transition-layer">
        <div class="bg-layer"></div>
    </div>
@stop

@section('javascripts')
    <script>
        $(function () {
            @if(session()->has('success'))
                Notification.create(
                // 消息通知框的标题
                "{{ session('success') }}",
                // 消息通知框的内容
                "Long text Long text Long text Long text.",
                // 图片
                "{{ asset('images/user.png') }}",
                // 效果
                "tada", 1, 5);
            @endif
            $('.glyphicon-remove-circle').on('click', function () {
                $('.welcome-banner').hide('normal');
            });
            $('.job-description').dotdotdot({
                ellipsis: "\u2026 ",
                /* The text to add as ellipsis. */

                truncate: "word",
                /* How to truncate the text: By "node", "word" or "letter". */

                keep: null,
                /* jQuery-selector for elements to keep after the ellipsis. */

                watch: "window",
                /* Whether to update the ellipsis:
                 true: Monitors the wrapper width and height.
                 "window": Monitors the window width and height.
                 */

                tolerance: 0
                /* Deviation for the measured wrapper height. */
            });
            {{--$('button').on('click', function () {--}}
                {{--Notification.create(--}}
                    {{--// 消息通知框的标题--}}
                    {{--"Notification title",--}}
                    {{--// 消息通知框的内容--}}
                    {{--"Long text Long text Long text Long text.",--}}
                    {{--// 图片--}}
                    {{--"{{ asset('images/user.png') }}",--}}
                    {{--// 效果--}}
                    {{--"tada", 1, 3, function() {--}}
                        {{--$("body").overhang({--}}
                            {{--type: "error",--}}
                            {{--message: "You could not be logged in at this time.",--}}
                            {{--closeConfirm: "true"--}}
                        {{--});--}}
                    {{--}--}}
                {{--);--}}
            {{--});--}}
            //cache some jQuery objects
            var modalTrigger = $('.welcome-store'),
                transitionLayer = $('.cd-transition-layer'),
                transitionBackground = transitionLayer.children(),
                modalWindow = $('.cd-modal');

            var frameProportion = 1.78, //png frame aspect ratio
                frames = 25, //number of png frames
                resize = false;

            //set transitionBackground dimentions
            setLayerDimensions();
            $(window).on('resize', function(){
                if( !resize ) {
                    resize = true;
                    (!window.requestAnimationFrame) ? setTimeout(setLayerDimensions, 300) : window.requestAnimationFrame(setLayerDimensions);
                }
            });

            //open modal window
            modalTrigger.on('click', function(event){
                event.preventDefault();
                transitionLayer.addClass('visible opening');
                var delay = ( $('.no-cssanimations').length > 0 ) ? 0 : 600;
                setTimeout(function(){
                    modalWindow.addClass('visible');
                }, delay);
            });

            //close modal window
            modalWindow.on('click', '.modal-close', function(event){
                event.preventDefault();
                transitionLayer.addClass('closing');
                modalWindow.removeClass('visible');
                transitionBackground.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
                    transitionLayer.removeClass('closing opening visible');
                    transitionBackground.off('webkitAnimationEnd oanimationend msAnimationEnd animationend');
                });
            });

            function setLayerDimensions() {
                var windowWidth = $(window).width(),
                    windowHeight = $(window).height(),
                    layerHeight, layerWidth;

                if( windowWidth/windowHeight > frameProportion ) {
                    layerWidth = windowWidth;
                    layerHeight = layerWidth/frameProportion;
                } else {
                    layerHeight = windowHeight*1.2;
                    layerWidth = layerHeight*frameProportion;
                }

                transitionBackground.css({
                    'width': layerWidth*frames+'px',
                    'height': layerHeight+'px',
                });

                resize = false;
            }
        })
    </script>
@stop
$(function () {
    var csrfToken = $('meta[name="csrf-token"]').attr('content');
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': csrfToken
        }
    });

    $('#logout').click(function () {
        $.post('/logout', {}, function () {
            location.href = '/';
        });
    });

    $('.search-wrapper').tooltip({
        content: '点击查询兼职信息'
    });

    var E = window.wangEditor;
    var editor = new E('#job-comment-editor');
    editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'link',  // 插入链接
        'list',  // 列表
        'quote',  // 引用
        'image',  // 插入图片
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
    ];
    editor.create();

    $('.glyphicon-remove-circle').on('click', function () {
        $('.welcome-banner').hide('normal');
    });

    // 截取首页部分字
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

    //cache some jQuery objects
    var modalTrigger = $('.open-modal'),
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
        $('body').addClass('hide-scroll');
        transitionLayer.addClass('visible opening');
        var delay = ( $('.no-cssanimations').length > 0 ) ? 0 : 600;
        setTimeout(function(){
            modalWindow.addClass('visible');
        }, delay);
    });

    //close modal window
    modalWindow.on('click', '.modal-close', function(event){
        event.preventDefault();
        $('body').removeClass('hide-scroll');
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
});

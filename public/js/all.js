/**
 * Created by Let Aurn IV on 22/09/2015.
 */

/*global  $*/

Notification = window.Notification || {};

Notification = function () {

    'use strict';

    var number = 0;
    var incPosition = 0;

    var template = function (title, text, image, position) {
        incPosition = number * 120;
        number = number + 1;
        var textHtml = '<div class="text">' + text + '</div>';
        var titleHtml = (!title ? '' : '<div class="title">' + title + '</div>');
        var imageHtml = (!image ? '' : '<div class="illustration"><img src="' + image + '" width="70" height="70" /></div>');
        var style;
        switch (parseInt(position, 10)) {
            case 1:
                style = "top:" + incPosition + "px; left:20px;";
                break;
            case 2:
                style = "top:" + incPosition + "px; right:20px;";
                break;
            case 3:
                style = "bottom:" + incPosition + "px; right:20px;";
                break;
            case 4:
                style = "bottom:" + incPosition + "px; left:20px;";
                break;
            default:
                ;
        }
        return {
            id: number,
            content: '<div class="notification notification-' + number + ' " style="' + style + '">' +
                '<div class="dismiss" style="cursor:pointer">&#10006;</div>' +
                imageHtml +
                '<div class="text">' + titleHtml + textHtml + '</div>' +
                '</div>'
        };
    };

    var hide = function (id) {
        $(document).find('.notification-' + id).remove();
        number = number - 1;
    };9

    var create = function (title, text, image, animation, position, delay, func) {
        var clickOrNot = 0;
        var notification = template(title, text, image, position);
        $(notification.content).addClass('animated ' + animation).appendTo('body');
        if (!delay) {
            delay = 3;
        }
        $('.notification .dismiss').click(function () {
            hide(notification.id);
            if (func) {
                clickOrNot = 1;
                func();
            }
        });
        setTimeout(function () {
            if (func && clickOrNot === 0) {
                hide(notification.id);
                func();
            }
        }, 1000 * delay);
    };

    return {
        create: create
    };

}();

/*! jQuery UI - v1.12.1 - 2017-09-17
* http://jqueryui.com
* Includes: widget.js, position.js, data.js, disable-selection.js, focusable.js, form-reset-mixin.js, jquery-1-7.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js, widgets/draggable.js, widgets/droppable.js, widgets/resizable.js, widgets/selectable.js, widgets/sortable.js, widgets/accordion.js, widgets/autocomplete.js, widgets/button.js, widgets/checkboxradio.js, widgets/controlgroup.js, widgets/datepicker.js, widgets/dialog.js, widgets/menu.js, widgets/mouse.js, widgets/progressbar.js, widgets/selectmenu.js, widgets/slider.js, widgets/spinner.js, widgets/tabs.js, widgets/tooltip.js, effect.js, effects/effect-blind.js, effects/effect-bounce.js, effects/effect-clip.js, effects/effect-drop.js, effects/effect-explode.js, effects/effect-fade.js, effects/effect-fold.js, effects/effect-highlight.js, effects/effect-puff.js, effects/effect-pulsate.js, effects/effect-scale.js, effects/effect-shake.js, effects/effect-size.js, effects/effect-slide.js, effects/effect-transfer.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function t(e){for(var t=e.css("visibility");"inherit"===t;)e=e.parent(),t=e.css("visibility");return"hidden"!==t}function i(e){for(var t,i;e.length&&e[0]!==document;){if(t=e.css("position"),("absolute"===t||"relative"===t||"fixed"===t)&&(i=parseInt(e.css("zIndex"),10),!isNaN(i)&&0!==i))return i;e=e.parent()}return 0}function s(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},e.extend(this._defaults,this.regional[""]),this.regional.en=e.extend(!0,{},this.regional[""]),this.regional["en-US"]=e.extend(!0,{},this.regional.en),this.dpDiv=a(e("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}function a(t){var i="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return t.on("mouseout",i,function(){e(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).removeClass("ui-datepicker-next-hover")}).on("mouseover",i,n)}function n(){e.datepicker._isDisabledDatepicker(p.inline?p.dpDiv.parent()[0]:p.input[0])||(e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),e(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).addClass("ui-datepicker-next-hover"))}function r(t,i){e.extend(t,i);for(var s in i)null==i[s]&&(t[s]=i[s]);return t}function o(e){return function(){var t=this.element.val();e.apply(this,arguments),this._refresh(),t!==this.element.val()&&this._trigger("change")}}e.ui=e.ui||{},e.ui.version="1.12.1";var h=0,l=Array.prototype.slice;e.cleanData=function(t){return function(i){var s,a,n;for(n=0;null!=(a=i[n]);n++)try{s=e._data(a,"events"),s&&s.remove&&e(a).triggerHandler("remove")}catch(r){}t(i)}}(e.cleanData),e.widget=function(t,i,s){var a,n,r,o={},h=t.split(".")[0];t=t.split(".")[1];var l=h+"-"+t;return s||(s=i,i=e.Widget),e.isArray(s)&&(s=e.extend.apply(null,[{}].concat(s))),e.expr[":"][l.toLowerCase()]=function(t){return!!e.data(t,l)},e[h]=e[h]||{},a=e[h][t],n=e[h][t]=function(e,t){return this._createWidget?(arguments.length&&this._createWidget(e,t),void 0):new n(e,t)},e.extend(n,a,{version:s.version,_proto:e.extend({},s),_childConstructors:[]}),r=new i,r.options=e.widget.extend({},r.options),e.each(s,function(t,s){return e.isFunction(s)?(o[t]=function(){function e(){return i.prototype[t].apply(this,arguments)}function a(e){return i.prototype[t].apply(this,e)}return function(){var t,i=this._super,n=this._superApply;return this._super=e,this._superApply=a,t=s.apply(this,arguments),this._super=i,this._superApply=n,t}}(),void 0):(o[t]=s,void 0)}),n.prototype=e.widget.extend(r,{widgetEventPrefix:a?r.widgetEventPrefix||t:t},o,{constructor:n,namespace:h,widgetName:t,widgetFullName:l}),a?(e.each(a._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,n,i._proto)}),delete a._childConstructors):i._childConstructors.push(n),e.widget.bridge(t,n),n},e.widget.extend=function(t){for(var i,s,a=l.call(arguments,1),n=0,r=a.length;r>n;n++)for(i in a[n])s=a[n][i],a[n].hasOwnProperty(i)&&void 0!==s&&(t[i]=e.isPlainObject(s)?e.isPlainObject(t[i])?e.widget.extend({},t[i],s):e.widget.extend({},s):s);return t},e.widget.bridge=function(t,i){var s=i.prototype.widgetFullName||t;e.fn[t]=function(a){var n="string"==typeof a,r=l.call(arguments,1),o=this;return n?this.length||"instance"!==a?this.each(function(){var i,n=e.data(this,s);return"instance"===a?(o=n,!1):n?e.isFunction(n[a])&&"_"!==a.charAt(0)?(i=n[a].apply(n,r),i!==n&&void 0!==i?(o=i&&i.jquery?o.pushStack(i.get()):i,!1):void 0):e.error("no such method '"+a+"' for "+t+" widget instance"):e.error("cannot call methods on "+t+" prior to initialization; "+"attempted to call method '"+a+"'")}):o=void 0:(r.length&&(a=e.widget.extend.apply(null,[a].concat(r))),this.each(function(){var t=e.data(this,s);t?(t.option(a||{}),t._init&&t._init()):e.data(this,s,new i(a,this))})),o}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,create:null},_createWidget:function(t,i){i=e(i||this.defaultElement||this)[0],this.element=e(i),this.uuid=h++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=e(),this.hoverable=e(),this.focusable=e(),this.classesElementLookup={},i!==this&&(e.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===i&&this.destroy()}}),this.document=e(i.style?i.ownerDocument:i.document||i),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){var t=this;this._destroy(),e.each(this.classesElementLookup,function(e,i){t._removeClass(i,e)}),this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),this.bindings.off(this.eventNamespace)},_destroy:e.noop,widget:function(){return this.element},option:function(t,i){var s,a,n,r=t;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof t)if(r={},s=t.split("."),t=s.shift(),s.length){for(a=r[t]=e.widget.extend({},this.options[t]),n=0;s.length-1>n;n++)a[s[n]]=a[s[n]]||{},a=a[s[n]];if(t=s.pop(),1===arguments.length)return void 0===a[t]?null:a[t];a[t]=i}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];r[t]=i}return this._setOptions(r),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return"classes"===e&&this._setOptionClasses(t),this.options[e]=t,"disabled"===e&&this._setOptionDisabled(t),this},_setOptionClasses:function(t){var i,s,a;for(i in t)a=this.classesElementLookup[i],t[i]!==this.options.classes[i]&&a&&a.length&&(s=e(a.get()),this._removeClass(a,i),s.addClass(this._classes({element:s,keys:i,classes:t,add:!0})))},_setOptionDisabled:function(e){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!e),e&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(t){function i(i,n){var r,o;for(o=0;i.length>o;o++)r=a.classesElementLookup[i[o]]||e(),r=t.add?e(e.unique(r.get().concat(t.element.get()))):e(r.not(t.element).get()),a.classesElementLookup[i[o]]=r,s.push(i[o]),n&&t.classes[i[o]]&&s.push(t.classes[i[o]])}var s=[],a=this;return t=e.extend({element:this.element,classes:this.options.classes||{}},t),this._on(t.element,{remove:"_untrackClassesElement"}),t.keys&&i(t.keys.match(/\S+/g)||[],!0),t.extra&&i(t.extra.match(/\S+/g)||[]),s.join(" ")},_untrackClassesElement:function(t){var i=this;e.each(i.classesElementLookup,function(s,a){-1!==e.inArray(t.target,a)&&(i.classesElementLookup[s]=e(a.not(t.target).get()))})},_removeClass:function(e,t,i){return this._toggleClass(e,t,i,!1)},_addClass:function(e,t,i){return this._toggleClass(e,t,i,!0)},_toggleClass:function(e,t,i,s){s="boolean"==typeof s?s:i;var a="string"==typeof e||null===e,n={extra:a?t:i,keys:a?e:t,element:a?this.element:e,add:s};return n.element.toggleClass(this._classes(n),s),this},_on:function(t,i,s){var a,n=this;"boolean"!=typeof t&&(s=i,i=t,t=!1),s?(i=a=e(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,a=this.widget()),e.each(s,function(s,r){function o(){return t||n.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof r?n[r]:r).apply(n,arguments):void 0}"string"!=typeof r&&(o.guid=r.guid=r.guid||o.guid||e.guid++);var h=s.match(/^([\w:-]*)\s*(.*)$/),l=h[1]+n.eventNamespace,u=h[2];u?a.on(l,u,o):i.on(l,o)})},_off:function(t,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.off(i).off(i),this.bindings=e(this.bindings.not(t).get()),this.focusable=e(this.focusable.not(t).get()),this.hoverable=e(this.hoverable.not(t).get())},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){this._addClass(e(t.currentTarget),null,"ui-state-hover")},mouseleave:function(t){this._removeClass(e(t.currentTarget),null,"ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){this._addClass(e(t.currentTarget),null,"ui-state-focus")},focusout:function(t){this._removeClass(e(t.currentTarget),null,"ui-state-focus")}})},_trigger:function(t,i,s){var a,n,r=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],n=i.originalEvent)for(a in n)a in i||(i[a]=n[a]);return this.element.trigger(i,s),!(e.isFunction(r)&&r.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,a,n){"string"==typeof a&&(a={effect:a});var r,o=a?a===!0||"number"==typeof a?i:a.effect||i:t;a=a||{},"number"==typeof a&&(a={duration:a}),r=!e.isEmptyObject(a),a.complete=n,a.delay&&s.delay(a.delay),r&&e.effects&&e.effects.effect[o]?s[t](a):o!==t&&s[o]?s[o](a.duration,a.easing,n):s.queue(function(i){e(this)[t](),n&&n.call(s[0]),i()})}}),e.widget,function(){function t(e,t,i){return[parseFloat(e[0])*(c.test(e[0])?t/100:1),parseFloat(e[1])*(c.test(e[1])?i/100:1)]}function i(t,i){return parseInt(e.css(t,i),10)||0}function s(t){var i=t[0];return 9===i.nodeType?{width:t.width(),height:t.height(),offset:{top:0,left:0}}:e.isWindow(i)?{width:t.width(),height:t.height(),offset:{top:t.scrollTop(),left:t.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:t.outerWidth(),height:t.outerHeight(),offset:t.offset()}}var a,n=Math.max,r=Math.abs,o=/left|center|right/,h=/top|center|bottom/,l=/[\+\-]\d+(\.[\d]+)?%?/,u=/^\w+/,c=/%$/,d=e.fn.position;e.position={scrollbarWidth:function(){if(void 0!==a)return a;var t,i,s=e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),n=s.children()[0];return e("body").append(s),t=n.offsetWidth,s.css("overflow","scroll"),i=n.offsetWidth,t===i&&(i=s[0].clientWidth),s.remove(),a=t-i},getScrollInfo:function(t){var i=t.isWindow||t.isDocument?"":t.element.css("overflow-x"),s=t.isWindow||t.isDocument?"":t.element.css("overflow-y"),a="scroll"===i||"auto"===i&&t.width<t.element[0].scrollWidth,n="scroll"===s||"auto"===s&&t.height<t.element[0].scrollHeight;return{width:n?e.position.scrollbarWidth():0,height:a?e.position.scrollbarWidth():0}},getWithinInfo:function(t){var i=e(t||window),s=e.isWindow(i[0]),a=!!i[0]&&9===i[0].nodeType,n=!s&&!a;return{element:i,isWindow:s,isDocument:a,offset:n?e(t).offset():{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:i.outerWidth(),height:i.outerHeight()}}},e.fn.position=function(a){if(!a||!a.of)return d.apply(this,arguments);a=e.extend({},a);var c,p,f,m,g,v,y=e(a.of),_=e.position.getWithinInfo(a.within),b=e.position.getScrollInfo(_),x=(a.collision||"flip").split(" "),k={};return v=s(y),y[0].preventDefault&&(a.at="left top"),p=v.width,f=v.height,m=v.offset,g=e.extend({},m),e.each(["my","at"],function(){var e,t,i=(a[this]||"").split(" ");1===i.length&&(i=o.test(i[0])?i.concat(["center"]):h.test(i[0])?["center"].concat(i):["center","center"]),i[0]=o.test(i[0])?i[0]:"center",i[1]=h.test(i[1])?i[1]:"center",e=l.exec(i[0]),t=l.exec(i[1]),k[this]=[e?e[0]:0,t?t[0]:0],a[this]=[u.exec(i[0])[0],u.exec(i[1])[0]]}),1===x.length&&(x[1]=x[0]),"right"===a.at[0]?g.left+=p:"center"===a.at[0]&&(g.left+=p/2),"bottom"===a.at[1]?g.top+=f:"center"===a.at[1]&&(g.top+=f/2),c=t(k.at,p,f),g.left+=c[0],g.top+=c[1],this.each(function(){var s,o,h=e(this),l=h.outerWidth(),u=h.outerHeight(),d=i(this,"marginLeft"),v=i(this,"marginTop"),w=l+d+i(this,"marginRight")+b.width,D=u+v+i(this,"marginBottom")+b.height,T=e.extend({},g),S=t(k.my,h.outerWidth(),h.outerHeight());"right"===a.my[0]?T.left-=l:"center"===a.my[0]&&(T.left-=l/2),"bottom"===a.my[1]?T.top-=u:"center"===a.my[1]&&(T.top-=u/2),T.left+=S[0],T.top+=S[1],s={marginLeft:d,marginTop:v},e.each(["left","top"],function(t,i){e.ui.position[x[t]]&&e.ui.position[x[t]][i](T,{targetWidth:p,targetHeight:f,elemWidth:l,elemHeight:u,collisionPosition:s,collisionWidth:w,collisionHeight:D,offset:[c[0]+S[0],c[1]+S[1]],my:a.my,at:a.at,within:_,elem:h})}),a.using&&(o=function(e){var t=m.left-T.left,i=t+p-l,s=m.top-T.top,o=s+f-u,c={target:{element:y,left:m.left,top:m.top,width:p,height:f},element:{element:h,left:T.left,top:T.top,width:l,height:u},horizontal:0>i?"left":t>0?"right":"center",vertical:0>o?"top":s>0?"bottom":"middle"};l>p&&p>r(t+i)&&(c.horizontal="center"),u>f&&f>r(s+o)&&(c.vertical="middle"),c.important=n(r(t),r(i))>n(r(s),r(o))?"horizontal":"vertical",a.using.call(this,e,c)}),h.offset(e.extend(T,{using:o}))})},e.ui.position={fit:{left:function(e,t){var i,s=t.within,a=s.isWindow?s.scrollLeft:s.offset.left,r=s.width,o=e.left-t.collisionPosition.marginLeft,h=a-o,l=o+t.collisionWidth-r-a;t.collisionWidth>r?h>0&&0>=l?(i=e.left+h+t.collisionWidth-r-a,e.left+=h-i):e.left=l>0&&0>=h?a:h>l?a+r-t.collisionWidth:a:h>0?e.left+=h:l>0?e.left-=l:e.left=n(e.left-o,e.left)},top:function(e,t){var i,s=t.within,a=s.isWindow?s.scrollTop:s.offset.top,r=t.within.height,o=e.top-t.collisionPosition.marginTop,h=a-o,l=o+t.collisionHeight-r-a;t.collisionHeight>r?h>0&&0>=l?(i=e.top+h+t.collisionHeight-r-a,e.top+=h-i):e.top=l>0&&0>=h?a:h>l?a+r-t.collisionHeight:a:h>0?e.top+=h:l>0?e.top-=l:e.top=n(e.top-o,e.top)}},flip:{left:function(e,t){var i,s,a=t.within,n=a.offset.left+a.scrollLeft,o=a.width,h=a.isWindow?a.scrollLeft:a.offset.left,l=e.left-t.collisionPosition.marginLeft,u=l-h,c=l+t.collisionWidth-o-h,d="left"===t.my[0]?-t.elemWidth:"right"===t.my[0]?t.elemWidth:0,p="left"===t.at[0]?t.targetWidth:"right"===t.at[0]?-t.targetWidth:0,f=-2*t.offset[0];0>u?(i=e.left+d+p+f+t.collisionWidth-o-n,(0>i||r(u)>i)&&(e.left+=d+p+f)):c>0&&(s=e.left-t.collisionPosition.marginLeft+d+p+f-h,(s>0||c>r(s))&&(e.left+=d+p+f))},top:function(e,t){var i,s,a=t.within,n=a.offset.top+a.scrollTop,o=a.height,h=a.isWindow?a.scrollTop:a.offset.top,l=e.top-t.collisionPosition.marginTop,u=l-h,c=l+t.collisionHeight-o-h,d="top"===t.my[1],p=d?-t.elemHeight:"bottom"===t.my[1]?t.elemHeight:0,f="top"===t.at[1]?t.targetHeight:"bottom"===t.at[1]?-t.targetHeight:0,m=-2*t.offset[1];0>u?(s=e.top+p+f+m+t.collisionHeight-o-n,(0>s||r(u)>s)&&(e.top+=p+f+m)):c>0&&(i=e.top-t.collisionPosition.marginTop+p+f+m-h,(i>0||c>r(i))&&(e.top+=p+f+m))}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments),e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments),e.ui.position.fit.top.apply(this,arguments)}}}}(),e.ui.position,e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])}}),e.fn.extend({disableSelection:function(){var e="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.on(e+".ui-disableSelection",function(e){e.preventDefault()})}}(),enableSelection:function(){return this.off(".ui-disableSelection")}}),e.ui.focusable=function(i,s){var a,n,r,o,h,l=i.nodeName.toLowerCase();return"area"===l?(a=i.parentNode,n=a.name,i.href&&n&&"map"===a.nodeName.toLowerCase()?(r=e("img[usemap='#"+n+"']"),r.length>0&&r.is(":visible")):!1):(/^(input|select|textarea|button|object)$/.test(l)?(o=!i.disabled,o&&(h=e(i).closest("fieldset")[0],h&&(o=!h.disabled))):o="a"===l?i.href||s:s,o&&e(i).is(":visible")&&t(e(i)))},e.extend(e.expr[":"],{focusable:function(t){return e.ui.focusable(t,null!=e.attr(t,"tabindex"))}}),e.ui.focusable,e.fn.form=function(){return"string"==typeof this[0].form?this.closest("form"):e(this[0].form)},e.ui.formResetMixin={_formResetHandler:function(){var t=e(this);setTimeout(function(){var i=t.data("ui-form-reset-instances");e.each(i,function(){this.refresh()})})},_bindFormResetHandler:function(){if(this.form=this.element.form(),this.form.length){var e=this.form.data("ui-form-reset-instances")||[];e.length||this.form.on("reset.ui-form-reset",this._formResetHandler),e.push(this),this.form.data("ui-form-reset-instances",e)}},_unbindFormResetHandler:function(){if(this.form.length){var t=this.form.data("ui-form-reset-instances");t.splice(e.inArray(this,t),1),t.length?this.form.data("ui-form-reset-instances",t):this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")}}},"1.7"===e.fn.jquery.substring(0,3)&&(e.each(["Width","Height"],function(t,i){function s(t,i,s,n){return e.each(a,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),n&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var a="Width"===i?["Left","Right"]:["Top","Bottom"],n=i.toLowerCase(),r={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+i]=function(t){return void 0===t?r["inner"+i].call(this):this.each(function(){e(this).css(n,s(this,t)+"px")})},e.fn["outer"+i]=function(t,a){return"number"!=typeof t?r["outer"+i].call(this,t):this.each(function(){e(this).css(n,s(this,t,!0,a)+"px")})}}),e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38},e.ui.escapeSelector=function(){var e=/([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;return function(t){return t.replace(e,"\\$1")}}(),e.fn.labels=function(){var t,i,s,a,n;return this[0].labels&&this[0].labels.length?this.pushStack(this[0].labels):(a=this.eq(0).parents("label"),s=this.attr("id"),s&&(t=this.eq(0).parents().last(),n=t.add(t.length?t.siblings():this.siblings()),i="label[for='"+e.ui.escapeSelector(s)+"']",a=a.add(n.find(i).addBack(i))),this.pushStack(a))},e.fn.scrollParent=function(t){var i=this.css("position"),s="absolute"===i,a=t?/(auto|scroll|hidden)/:/(auto|scroll)/,n=this.parents().filter(function(){var t=e(this);return s&&"static"===t.css("position")?!1:a.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"))}).eq(0);return"fixed"!==i&&n.length?n:e(this[0].ownerDocument||document)},e.extend(e.expr[":"],{tabbable:function(t){var i=e.attr(t,"tabindex"),s=null!=i;return(!s||i>=0)&&e.ui.focusable(t,s)}}),e.fn.extend({uniqueId:function(){var e=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++e)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&e(this).removeAttr("id")})}}),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());var u=!1;e(document).on("mouseup",function(){u=!1}),e.widget("ui.mouse",{version:"1.12.1",options:{cancel:"input, textarea, button, select, option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.on("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).on("click."+this.widgetName,function(i){return!0===e.data(i.target,t.widgetName+".preventClickEvent")?(e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.off("."+this.widgetName),this._mouseMoveDelegate&&this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(t){if(!u){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(t),this._mouseDownEvent=t;var i=this,s=1===t.which,a="string"==typeof this.options.cancel&&t.target.nodeName?e(t.target).closest(this.options.cancel).length:!1;return s&&!a&&this._mouseCapture(t)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(t)!==!1,!this._mouseStarted)?(t.preventDefault(),!0):(!0===e.data(t.target,this.widgetName+".preventClickEvent")&&e.removeData(t.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return i._mouseMove(e)},this._mouseUpDelegate=function(e){return i._mouseUp(e)},this.document.on("mousemove."+this.widgetName,this._mouseMoveDelegate).on("mouseup."+this.widgetName,this._mouseUpDelegate),t.preventDefault(),u=!0,!0)):!0}},_mouseMove:function(t){if(this._mouseMoved){if(e.ui.ie&&(!document.documentMode||9>document.documentMode)&&!t.button)return this._mouseUp(t);if(!t.which)if(t.originalEvent.altKey||t.originalEvent.ctrlKey||t.originalEvent.metaKey||t.originalEvent.shiftKey)this.ignoreMissingWhich=!0;else if(!this.ignoreMissingWhich)return this._mouseUp(t)}return(t.which||t.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(t){this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),this._mouseDelayTimer&&(clearTimeout(this._mouseDelayTimer),delete this._mouseDelayTimer),this.ignoreMissingWhich=!1,u=!1,t.preventDefault()},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}}),e.ui.plugin={add:function(t,i,s){var a,n=e.ui[t].prototype;for(a in s)n.plugins[a]=n.plugins[a]||[],n.plugins[a].push([i,s[a]])},call:function(e,t,i,s){var a,n=e.plugins[t];if(n&&(s||e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType))for(a=0;n.length>a;a++)e.options[n[a][0]]&&n[a][1].apply(e.element,i)}},e.ui.safeActiveElement=function(e){var t;try{t=e.activeElement}catch(i){t=e.body}return t||(t=e.body),t.nodeName||(t=e.body),t},e.ui.safeBlur=function(t){t&&"body"!==t.nodeName.toLowerCase()&&e(t).trigger("blur")},e.widget("ui.draggable",e.ui.mouse,{version:"1.12.1",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this._addClass("ui-draggable"),this._setHandleClassName(),this._mouseInit()},_setOption:function(e,t){this._super(e,t),"handle"===e&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){return(this.helper||this.element).is(".ui-draggable-dragging")?(this.destroyOnClear=!0,void 0):(this._removeHandleClassName(),this._mouseDestroy(),void 0)},_mouseCapture:function(t){var i=this.options;return this.helper||i.disabled||e(t.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(t),this.handle?(this._blurActiveElement(t),this._blockFrames(i.iframeFix===!0?"iframe":i.iframeFix),!0):!1)},_blockFrames:function(t){this.iframeBlocks=this.document.find(t).map(function(){var t=e(this);return e("<div>").css("position","absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(t){var i=e.ui.safeActiveElement(this.document[0]),s=e(t.target);s.closest(i).length||e.ui.safeBlur(i)},_mouseStart:function(t){var i=this.options;return this.helper=this._createHelper(t),this._addClass(this.helper,"ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return"fixed"===e(this).css("position")}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(t),this.originalPosition=this.position=this._generatePosition(t,!1),this.originalPageX=t.pageX,this.originalPageY=t.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0)},_refreshOffsets:function(e){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:e.pageX-this.offset.left,top:e.pageY-this.offset.top}},_mouseDrag:function(t,i){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(t,!0),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(this._trigger("drag",t,s)===!1)return this._mouseUp(new e.Event("mouseup",t)),!1;this.position=s.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var i=this,s=!1;return e.ui.ddmanager&&!this.options.dropBehaviour&&(s=e.ui.ddmanager.drop(this,t)),this.dropped&&(s=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",t)!==!1&&i._clear()}):this._trigger("stop",t)!==!1&&this._clear(),!1},_mouseUp:function(t){return this._unblockFrames(),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),this.handleElement.is(t.target)&&this.element.trigger("focus"),e.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp(new e.Event("mouseup",{target:this.element[0]})):this._clear(),this},_getHandle:function(t){return this.options.handle?!!e(t.target).closest(this.element.find(this.options.handle)).length:!0},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this._addClass(this.handleElement,"ui-draggable-handle")},_removeHandleClassName:function(){this._removeClass(this.handleElement,"ui-draggable-handle")},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper),a=s?e(i.helper.apply(this.element[0],[t])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return a.parents("body").length||a.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s&&a[0]===this.element[0]&&this._setPositionRelative(),a[0]===this.element[0]||/(fixed|absolute)/.test(a.css("position"))||a.css("position","absolute"),a},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_isRootNode:function(e){return/(html|body)/i.test(e.tagName)||e===this.document[0]},_getParentOffset:function(){var t=this.offsetParent.offset(),i=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==i&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var e=this.element.position(),t=this._isRootNode(this.scrollParent[0]);return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+(t?0:this.scrollParent.scrollTop()),left:e.left-(parseInt(this.helper.css("left"),10)||0)+(t?0:this.scrollParent.scrollLeft())}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,a=this.options,n=this.document[0];return this.relativeContainer=null,a.containment?"window"===a.containment?(this.containment=[e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,e(window).scrollLeft()+e(window).width()-this.helperProportions.width-this.margins.left,e(window).scrollTop()+(e(window).height()||n.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):"document"===a.containment?(this.containment=[0,0,e(n).width()-this.helperProportions.width-this.margins.left,(e(n).height()||n.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):a.containment.constructor===Array?(this.containment=a.containment,void 0):("parent"===a.containment&&(a.containment=this.helper[0].parentNode),i=e(a.containment),s=i[0],s&&(t=/(scroll|auto)/.test(i.css("overflow")),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(t?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=i),void 0):(this.containment=null,void 0)
},_convertPositionTo:function(e,t){t||(t=this.position);var i="absolute"===e?1:-1,s=this._isRootNode(this.scrollParent[0]);return{top:t.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.offset.scroll.top:s?0:this.offset.scroll.top)*i,left:t.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.offset.scroll.left:s?0:this.offset.scroll.left)*i}},_generatePosition:function(e,t){var i,s,a,n,r=this.options,o=this._isRootNode(this.scrollParent[0]),h=e.pageX,l=e.pageY;return o&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),t&&(this.containment&&(this.relativeContainer?(s=this.relativeContainer.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,e.pageX-this.offset.click.left<i[0]&&(h=i[0]+this.offset.click.left),e.pageY-this.offset.click.top<i[1]&&(l=i[1]+this.offset.click.top),e.pageX-this.offset.click.left>i[2]&&(h=i[2]+this.offset.click.left),e.pageY-this.offset.click.top>i[3]&&(l=i[3]+this.offset.click.top)),r.grid&&(a=r.grid[1]?this.originalPageY+Math.round((l-this.originalPageY)/r.grid[1])*r.grid[1]:this.originalPageY,l=i?a-this.offset.click.top>=i[1]||a-this.offset.click.top>i[3]?a:a-this.offset.click.top>=i[1]?a-r.grid[1]:a+r.grid[1]:a,n=r.grid[0]?this.originalPageX+Math.round((h-this.originalPageX)/r.grid[0])*r.grid[0]:this.originalPageX,h=i?n-this.offset.click.left>=i[0]||n-this.offset.click.left>i[2]?n:n-this.offset.click.left>=i[0]?n-r.grid[0]:n+r.grid[0]:n),"y"===r.axis&&(h=this.originalPageX),"x"===r.axis&&(l=this.originalPageY)),{top:l-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:o?0:this.offset.scroll.top),left:h-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:o?0:this.offset.scroll.left)}},_clear:function(){this._removeClass(this.helper,"ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_trigger:function(t,i,s){return s=s||this._uiHash(),e.ui.plugin.call(this,t,[i,s,this],!0),/^(drag|start|stop)/.test(t)&&(this.positionAbs=this._convertPositionTo("absolute"),s.offset=this.positionAbs),e.Widget.prototype._trigger.call(this,t,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(t,i,s){var a=e.extend({},i,{item:s.element});s.sortables=[],e(s.options.connectToSortable).each(function(){var i=e(this).sortable("instance");i&&!i.options.disabled&&(s.sortables.push(i),i.refreshPositions(),i._trigger("activate",t,a))})},stop:function(t,i,s){var a=e.extend({},i,{item:s.element});s.cancelHelperRemoval=!1,e.each(s.sortables,function(){var e=this;e.isOver?(e.isOver=0,s.cancelHelperRemoval=!0,e.cancelHelperRemoval=!1,e._storedCSS={position:e.placeholder.css("position"),top:e.placeholder.css("top"),left:e.placeholder.css("left")},e._mouseStop(t),e.options.helper=e.options._helper):(e.cancelHelperRemoval=!0,e._trigger("deactivate",t,a))})},drag:function(t,i,s){e.each(s.sortables,function(){var a=!1,n=this;n.positionAbs=s.positionAbs,n.helperProportions=s.helperProportions,n.offset.click=s.offset.click,n._intersectsWith(n.containerCache)&&(a=!0,e.each(s.sortables,function(){return this.positionAbs=s.positionAbs,this.helperProportions=s.helperProportions,this.offset.click=s.offset.click,this!==n&&this._intersectsWith(this.containerCache)&&e.contains(n.element[0],this.element[0])&&(a=!1),a})),a?(n.isOver||(n.isOver=1,s._parent=i.helper.parent(),n.currentItem=i.helper.appendTo(n.element).data("ui-sortable-item",!0),n.options._helper=n.options.helper,n.options.helper=function(){return i.helper[0]},t.target=n.currentItem[0],n._mouseCapture(t,!0),n._mouseStart(t,!0,!0),n.offset.click.top=s.offset.click.top,n.offset.click.left=s.offset.click.left,n.offset.parent.left-=s.offset.parent.left-n.offset.parent.left,n.offset.parent.top-=s.offset.parent.top-n.offset.parent.top,s._trigger("toSortable",t),s.dropped=n.element,e.each(s.sortables,function(){this.refreshPositions()}),s.currentItem=s.element,n.fromOutside=s),n.currentItem&&(n._mouseDrag(t),i.position=n.position)):n.isOver&&(n.isOver=0,n.cancelHelperRemoval=!0,n.options._revert=n.options.revert,n.options.revert=!1,n._trigger("out",t,n._uiHash(n)),n._mouseStop(t,!0),n.options.revert=n.options._revert,n.options.helper=n.options._helper,n.placeholder&&n.placeholder.remove(),i.helper.appendTo(s._parent),s._refreshOffsets(t),i.position=s._generatePosition(t,!0),s._trigger("fromSortable",t),s.dropped=!1,e.each(s.sortables,function(){this.refreshPositions()}))})}}),e.ui.plugin.add("draggable","cursor",{start:function(t,i,s){var a=e("body"),n=s.options;a.css("cursor")&&(n._cursor=a.css("cursor")),a.css("cursor",n.cursor)},stop:function(t,i,s){var a=s.options;a._cursor&&e("body").css("cursor",a._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(t,i,s){var a=e(i.helper),n=s.options;a.css("opacity")&&(n._opacity=a.css("opacity")),a.css("opacity",n.opacity)},stop:function(t,i,s){var a=s.options;a._opacity&&e(i.helper).css("opacity",a._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(e,t,i){i.scrollParentNotHidden||(i.scrollParentNotHidden=i.helper.scrollParent(!1)),i.scrollParentNotHidden[0]!==i.document[0]&&"HTML"!==i.scrollParentNotHidden[0].tagName&&(i.overflowOffset=i.scrollParentNotHidden.offset())},drag:function(t,i,s){var a=s.options,n=!1,r=s.scrollParentNotHidden[0],o=s.document[0];r!==o&&"HTML"!==r.tagName?(a.axis&&"x"===a.axis||(s.overflowOffset.top+r.offsetHeight-t.pageY<a.scrollSensitivity?r.scrollTop=n=r.scrollTop+a.scrollSpeed:t.pageY-s.overflowOffset.top<a.scrollSensitivity&&(r.scrollTop=n=r.scrollTop-a.scrollSpeed)),a.axis&&"y"===a.axis||(s.overflowOffset.left+r.offsetWidth-t.pageX<a.scrollSensitivity?r.scrollLeft=n=r.scrollLeft+a.scrollSpeed:t.pageX-s.overflowOffset.left<a.scrollSensitivity&&(r.scrollLeft=n=r.scrollLeft-a.scrollSpeed))):(a.axis&&"x"===a.axis||(t.pageY-e(o).scrollTop()<a.scrollSensitivity?n=e(o).scrollTop(e(o).scrollTop()-a.scrollSpeed):e(window).height()-(t.pageY-e(o).scrollTop())<a.scrollSensitivity&&(n=e(o).scrollTop(e(o).scrollTop()+a.scrollSpeed))),a.axis&&"y"===a.axis||(t.pageX-e(o).scrollLeft()<a.scrollSensitivity?n=e(o).scrollLeft(e(o).scrollLeft()-a.scrollSpeed):e(window).width()-(t.pageX-e(o).scrollLeft())<a.scrollSensitivity&&(n=e(o).scrollLeft(e(o).scrollLeft()+a.scrollSpeed)))),n!==!1&&e.ui.ddmanager&&!a.dropBehaviour&&e.ui.ddmanager.prepareOffsets(s,t)}}),e.ui.plugin.add("draggable","snap",{start:function(t,i,s){var a=s.options;s.snapElements=[],e(a.snap.constructor!==String?a.snap.items||":data(ui-draggable)":a.snap).each(function(){var t=e(this),i=t.offset();this!==s.element[0]&&s.snapElements.push({item:this,width:t.outerWidth(),height:t.outerHeight(),top:i.top,left:i.left})})},drag:function(t,i,s){var a,n,r,o,h,l,u,c,d,p,f=s.options,m=f.snapTolerance,g=i.offset.left,v=g+s.helperProportions.width,y=i.offset.top,_=y+s.helperProportions.height;for(d=s.snapElements.length-1;d>=0;d--)h=s.snapElements[d].left-s.margins.left,l=h+s.snapElements[d].width,u=s.snapElements[d].top-s.margins.top,c=u+s.snapElements[d].height,h-m>v||g>l+m||u-m>_||y>c+m||!e.contains(s.snapElements[d].item.ownerDocument,s.snapElements[d].item)?(s.snapElements[d].snapping&&s.options.snap.release&&s.options.snap.release.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[d].item})),s.snapElements[d].snapping=!1):("inner"!==f.snapMode&&(a=m>=Math.abs(u-_),n=m>=Math.abs(c-y),r=m>=Math.abs(h-v),o=m>=Math.abs(l-g),a&&(i.position.top=s._convertPositionTo("relative",{top:u-s.helperProportions.height,left:0}).top),n&&(i.position.top=s._convertPositionTo("relative",{top:c,left:0}).top),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h-s.helperProportions.width}).left),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l}).left)),p=a||n||r||o,"outer"!==f.snapMode&&(a=m>=Math.abs(u-y),n=m>=Math.abs(c-_),r=m>=Math.abs(h-g),o=m>=Math.abs(l-v),a&&(i.position.top=s._convertPositionTo("relative",{top:u,left:0}).top),n&&(i.position.top=s._convertPositionTo("relative",{top:c-s.helperProportions.height,left:0}).top),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h}).left),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l-s.helperProportions.width}).left)),!s.snapElements[d].snapping&&(a||n||r||o||p)&&s.options.snap.snap&&s.options.snap.snap.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[d].item})),s.snapElements[d].snapping=a||n||r||o||p)}}),e.ui.plugin.add("draggable","stack",{start:function(t,i,s){var a,n=s.options,r=e.makeArray(e(n.stack)).sort(function(t,i){return(parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(i).css("zIndex"),10)||0)});r.length&&(a=parseInt(e(r[0]).css("zIndex"),10)||0,e(r).each(function(t){e(this).css("zIndex",a+t)}),this.css("zIndex",a+r.length))}}),e.ui.plugin.add("draggable","zIndex",{start:function(t,i,s){var a=e(i.helper),n=s.options;a.css("zIndex")&&(n._zIndex=a.css("zIndex")),a.css("zIndex",n.zIndex)},stop:function(t,i,s){var a=s.options;a._zIndex&&e(i.helper).css("zIndex",a._zIndex)}}),e.ui.draggable,e.widget("ui.droppable",{version:"1.12.1",widgetEventPrefix:"drop",options:{accept:"*",addClasses:!0,greedy:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var t,i=this.options,s=i.accept;this.isover=!1,this.isout=!0,this.accept=e.isFunction(s)?s:function(e){return e.is(s)},this.proportions=function(){return arguments.length?(t=arguments[0],void 0):t?t:t={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight}},this._addToManager(i.scope),i.addClasses&&this._addClass("ui-droppable")},_addToManager:function(t){e.ui.ddmanager.droppables[t]=e.ui.ddmanager.droppables[t]||[],e.ui.ddmanager.droppables[t].push(this)},_splice:function(e){for(var t=0;e.length>t;t++)e[t]===this&&e.splice(t,1)},_destroy:function(){var t=e.ui.ddmanager.droppables[this.options.scope];this._splice(t)},_setOption:function(t,i){if("accept"===t)this.accept=e.isFunction(i)?i:function(e){return e.is(i)};else if("scope"===t){var s=e.ui.ddmanager.droppables[this.options.scope];this._splice(s),this._addToManager(i)}this._super(t,i)},_activate:function(t){var i=e.ui.ddmanager.current;this._addActiveClass(),i&&this._trigger("activate",t,this.ui(i))},_deactivate:function(t){var i=e.ui.ddmanager.current;this._removeActiveClass(),i&&this._trigger("deactivate",t,this.ui(i))},_over:function(t){var i=e.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this._addHoverClass(),this._trigger("over",t,this.ui(i)))},_out:function(t){var i=e.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this._removeHoverClass(),this._trigger("out",t,this.ui(i)))},_drop:function(t,i){var s=i||e.ui.ddmanager.current,a=!1;return s&&(s.currentItem||s.element)[0]!==this.element[0]?(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var i=e(this).droppable("instance");return i.options.greedy&&!i.options.disabled&&i.options.scope===s.options.scope&&i.accept.call(i.element[0],s.currentItem||s.element)&&c(s,e.extend(i,{offset:i.element.offset()}),i.options.tolerance,t)?(a=!0,!1):void 0}),a?!1:this.accept.call(this.element[0],s.currentItem||s.element)?(this._removeActiveClass(),this._removeHoverClass(),this._trigger("drop",t,this.ui(s)),this.element):!1):!1},ui:function(e){return{draggable:e.currentItem||e.element,helper:e.helper,position:e.position,offset:e.positionAbs}},_addHoverClass:function(){this._addClass("ui-droppable-hover")},_removeHoverClass:function(){this._removeClass("ui-droppable-hover")},_addActiveClass:function(){this._addClass("ui-droppable-active")},_removeActiveClass:function(){this._removeClass("ui-droppable-active")}});var c=e.ui.intersect=function(){function e(e,t,i){return e>=t&&t+i>e}return function(t,i,s,a){if(!i.offset)return!1;var n=(t.positionAbs||t.position.absolute).left+t.margins.left,r=(t.positionAbs||t.position.absolute).top+t.margins.top,o=n+t.helperProportions.width,h=r+t.helperProportions.height,l=i.offset.left,u=i.offset.top,c=l+i.proportions().width,d=u+i.proportions().height;switch(s){case"fit":return n>=l&&c>=o&&r>=u&&d>=h;case"intersect":return n+t.helperProportions.width/2>l&&c>o-t.helperProportions.width/2&&r+t.helperProportions.height/2>u&&d>h-t.helperProportions.height/2;case"pointer":return e(a.pageY,u,i.proportions().height)&&e(a.pageX,l,i.proportions().width);case"touch":return(r>=u&&d>=r||h>=u&&d>=h||u>r&&h>d)&&(n>=l&&c>=n||o>=l&&c>=o||l>n&&o>c);default:return!1}}}();e.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(t,i){var s,a,n=e.ui.ddmanager.droppables[t.options.scope]||[],r=i?i.type:null,o=(t.currentItem||t.element).find(":data(ui-droppable)").addBack();e:for(s=0;n.length>s;s++)if(!(n[s].options.disabled||t&&!n[s].accept.call(n[s].element[0],t.currentItem||t.element))){for(a=0;o.length>a;a++)if(o[a]===n[s].element[0]){n[s].proportions().height=0;continue e}n[s].visible="none"!==n[s].element.css("display"),n[s].visible&&("mousedown"===r&&n[s]._activate.call(n[s],i),n[s].offset=n[s].element.offset(),n[s].proportions({width:n[s].element[0].offsetWidth,height:n[s].element[0].offsetHeight}))}},drop:function(t,i){var s=!1;return e.each((e.ui.ddmanager.droppables[t.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&c(t,this,this.options.tolerance,i)&&(s=this._drop.call(this,i)||s),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,i)))}),s},dragStart:function(t,i){t.element.parentsUntil("body").on("scroll.droppable",function(){t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i)})},drag:function(t,i){t.options.refreshPositions&&e.ui.ddmanager.prepareOffsets(t,i),e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var s,a,n,r=c(t,this,this.options.tolerance,i),o=!r&&this.isover?"isout":r&&!this.isover?"isover":null;o&&(this.options.greedy&&(a=this.options.scope,n=this.element.parents(":data(ui-droppable)").filter(function(){return e(this).droppable("instance").options.scope===a}),n.length&&(s=e(n[0]).droppable("instance"),s.greedyChild="isover"===o)),s&&"isover"===o&&(s.isover=!1,s.isout=!0,s._out.call(s,i)),this[o]=!0,this["isout"===o?"isover":"isout"]=!1,this["isover"===o?"_over":"_out"].call(this,i),s&&"isout"===o&&(s.isout=!1,s.isover=!0,s._over.call(s,i)))}})},dragStop:function(t,i){t.element.parentsUntil("body").off("scroll.droppable"),t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i)}},e.uiBackCompat!==!1&&e.widget("ui.droppable",e.ui.droppable,{options:{hoverClass:!1,activeClass:!1},_addActiveClass:function(){this._super(),this.options.activeClass&&this.element.addClass(this.options.activeClass)},_removeActiveClass:function(){this._super(),this.options.activeClass&&this.element.removeClass(this.options.activeClass)},_addHoverClass:function(){this._super(),this.options.hoverClass&&this.element.addClass(this.options.hoverClass)},_removeHoverClass:function(){this._super(),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass)}}),e.ui.droppable,e.widget("ui.resizable",e.ui.mouse,{version:"1.12.1",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,classes:{"ui-resizable-se":"ui-icon ui-icon-gripsmall-diagonal-se"},containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_num:function(e){return parseFloat(e)||0},_isNumber:function(e){return!isNaN(parseFloat(e))},_hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",a=!1;return t[s]>0?!0:(t[s]=1,a=t[s]>0,t[s]=0,a)},_create:function(){var t,i=this.options,s=this;this._addClass("ui-resizable"),e.extend(this,{_aspectRatio:!!i.aspectRatio,aspectRatio:i.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:i.helper||i.ghost||i.animate?i.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)&&(this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.resizable("instance")),this.elementIsWrapper=!0,t={marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom"),marginLeft:this.originalElement.css("marginLeft")},this.element.css(t),this.originalElement.css("margin",0),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css(t),this._proportionallyResize()),this._setupHandles(),i.autoHide&&e(this.element).on("mouseenter",function(){i.disabled||(s._removeClass("ui-resizable-autohide"),s._handles.show())}).on("mouseleave",function(){i.disabled||s.resizing||(s._addClass("ui-resizable-autohide"),s._handles.hide())}),this._mouseInit()},_destroy:function(){this._mouseDestroy();var t,i=function(t){e(t).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(i(this.element),t=this.element,this.originalElement.css({position:t.css("position"),width:t.outerWidth(),height:t.outerHeight(),top:t.css("top"),left:t.css("left")}).insertAfter(t),t.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_setOption:function(e,t){switch(this._super(e,t),e){case"handles":this._removeHandles(),this._setupHandles();break;default:}},_setupHandles:function(){var t,i,s,a,n,r=this.options,o=this;if(this.handles=r.handles||(e(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this._handles=e(),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),s=this.handles.split(","),this.handles={},i=0;s.length>i;i++)t=e.trim(s[i]),a="ui-resizable-"+t,n=e("<div>"),this._addClass(n,"ui-resizable-handle "+a),n.css({zIndex:r.zIndex}),this.handles[t]=".ui-resizable-"+t,this.element.append(n);this._renderAxis=function(t){var i,s,a,n;t=t||this.element;for(i in this.handles)this.handles[i].constructor===String?this.handles[i]=this.element.children(this.handles[i]).first().show():(this.handles[i].jquery||this.handles[i].nodeType)&&(this.handles[i]=e(this.handles[i]),this._on(this.handles[i],{mousedown:o._mouseDown})),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)&&(s=e(this.handles[i],this.element),n=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),a=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),t.css(a,n),this._proportionallyResize()),this._handles=this._handles.add(this.handles[i])},this._renderAxis(this.element),this._handles=this._handles.add(this.element.find(".ui-resizable-handle")),this._handles.disableSelection(),this._handles.on("mouseover",function(){o.resizing||(this.className&&(n=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),o.axis=n&&n[1]?n[1]:"se")}),r.autoHide&&(this._handles.hide(),this._addClass("ui-resizable-autohide"))},_removeHandles:function(){this._handles.remove()},_mouseCapture:function(t){var i,s,a=!1;for(i in this.handles)s=e(this.handles[i])[0],(s===t.target||e.contains(s,t.target))&&(a=!0);return!this.options.disabled&&a},_mouseStart:function(t){var i,s,a,n=this.options,r=this.element;return this.resizing=!0,this._renderProxy(),i=this._num(this.helper.css("left")),s=this._num(this.helper.css("top")),n.containment&&(i+=e(n.containment).scrollLeft()||0,s+=e(n.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:i,top:s},this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:r.width(),height:r.height()},this.originalSize=this._helper?{width:r.outerWidth(),height:r.outerHeight()}:{width:r.width(),height:r.height()},this.sizeDiff={width:r.outerWidth()-r.width(),height:r.outerHeight()-r.height()},this.originalPosition={left:i,top:s},this.originalMousePosition={left:t.pageX,top:t.pageY},this.aspectRatio="number"==typeof n.aspectRatio?n.aspectRatio:this.originalSize.width/this.originalSize.height||1,a=e(".ui-resizable-"+this.axis).css("cursor"),e("body").css("cursor","auto"===a?this.axis+"-resize":a),this._addClass("ui-resizable-resizing"),this._propagate("start",t),!0},_mouseDrag:function(t){var i,s,a=this.originalMousePosition,n=this.axis,r=t.pageX-a.left||0,o=t.pageY-a.top||0,h=this._change[n];return this._updatePrevProperties(),h?(i=h.apply(this,[t,r,o]),this._updateVirtualBoundaries(t.shiftKey),(this._aspectRatio||t.shiftKey)&&(i=this._updateRatio(i,t)),i=this._respectSize(i,t),this._updateCache(i),this._propagate("resize",t),s=this._applyChanges(),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),e.isEmptyObject(s)||(this._updatePrevProperties(),this._trigger("resize",t,this.ui()),this._applyChanges()),!1):!1},_mouseStop:function(t){this.resizing=!1;var i,s,a,n,r,o,h,l=this.options,u=this;return this._helper&&(i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),a=s&&this._hasScroll(i[0],"left")?0:u.sizeDiff.height,n=s?0:u.sizeDiff.width,r={width:u.helper.width()-n,height:u.helper.height()-a},o=parseFloat(u.element.css("left"))+(u.position.left-u.originalPosition.left)||null,h=parseFloat(u.element.css("top"))+(u.position.top-u.originalPosition.top)||null,l.animate||this.element.css(e.extend(r,{top:h,left:o})),u.helper.height(u.size.height),u.helper.width(u.size.width),this._helper&&!l.animate&&this._proportionallyResize()),e("body").css("cursor","auto"),this._removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1},_updatePrevProperties:function(){this.prevPosition={top:this.position.top,left:this.position.left},this.prevSize={width:this.size.width,height:this.size.height}},_applyChanges:function(){var e={};return this.position.top!==this.prevPosition.top&&(e.top=this.position.top+"px"),this.position.left!==this.prevPosition.left&&(e.left=this.position.left+"px"),this.size.width!==this.prevSize.width&&(e.width=this.size.width+"px"),this.size.height!==this.prevSize.height&&(e.height=this.size.height+"px"),this.helper.css(e),e},_updateVirtualBoundaries:function(e){var t,i,s,a,n,r=this.options;n={minWidth:this._isNumber(r.minWidth)?r.minWidth:0,maxWidth:this._isNumber(r.maxWidth)?r.maxWidth:1/0,minHeight:this._isNumber(r.minHeight)?r.minHeight:0,maxHeight:this._isNumber(r.maxHeight)?r.maxHeight:1/0},(this._aspectRatio||e)&&(t=n.minHeight*this.aspectRatio,s=n.minWidth/this.aspectRatio,i=n.maxHeight*this.aspectRatio,a=n.maxWidth/this.aspectRatio,t>n.minWidth&&(n.minWidth=t),s>n.minHeight&&(n.minHeight=s),n.maxWidth>i&&(n.maxWidth=i),n.maxHeight>a&&(n.maxHeight=a)),this._vBoundaries=n},_updateCache:function(e){this.offset=this.helper.offset(),this._isNumber(e.left)&&(this.position.left=e.left),this._isNumber(e.top)&&(this.position.top=e.top),this._isNumber(e.height)&&(this.size.height=e.height),this._isNumber(e.width)&&(this.size.width=e.width)},_updateRatio:function(e){var t=this.position,i=this.size,s=this.axis;return this._isNumber(e.height)?e.width=e.height*this.aspectRatio:this._isNumber(e.width)&&(e.height=e.width/this.aspectRatio),"sw"===s&&(e.left=t.left+(i.width-e.width),e.top=null),"nw"===s&&(e.top=t.top+(i.height-e.height),e.left=t.left+(i.width-e.width)),e},_respectSize:function(e){var t=this._vBoundaries,i=this.axis,s=this._isNumber(e.width)&&t.maxWidth&&t.maxWidth<e.width,a=this._isNumber(e.height)&&t.maxHeight&&t.maxHeight<e.height,n=this._isNumber(e.width)&&t.minWidth&&t.minWidth>e.width,r=this._isNumber(e.height)&&t.minHeight&&t.minHeight>e.height,o=this.originalPosition.left+this.originalSize.width,h=this.originalPosition.top+this.originalSize.height,l=/sw|nw|w/.test(i),u=/nw|ne|n/.test(i);return n&&(e.width=t.minWidth),r&&(e.height=t.minHeight),s&&(e.width=t.maxWidth),a&&(e.height=t.maxHeight),n&&l&&(e.left=o-t.minWidth),s&&l&&(e.left=o-t.maxWidth),r&&u&&(e.top=h-t.minHeight),a&&u&&(e.top=h-t.maxHeight),e.width||e.height||e.left||!e.top?e.width||e.height||e.top||!e.left||(e.left=null):e.top=null,e},_getPaddingPlusBorderDimensions:function(e){for(var t=0,i=[],s=[e.css("borderTopWidth"),e.css("borderRightWidth"),e.css("borderBottomWidth"),e.css("borderLeftWidth")],a=[e.css("paddingTop"),e.css("paddingRight"),e.css("paddingBottom"),e.css("paddingLeft")];4>t;t++)i[t]=parseFloat(s[t])||0,i[t]+=parseFloat(a[t])||0;return{height:i[0]+i[2],width:i[1]+i[3]}},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var e,t=0,i=this.helper||this.element;this._proportionallyResizeElements.length>t;t++)e=this._proportionallyResizeElements[t],this.outerDimensions||(this.outerDimensions=this._getPaddingPlusBorderDimensions(e)),e.css({height:i.height()-this.outerDimensions.height||0,width:i.width()-this.outerDimensions.width||0})},_renderProxy:function(){var t=this.element,i=this.options;this.elementOffset=t.offset(),this._helper?(this.helper=this.helper||e("<div style='overflow:hidden;'></div>"),this._addClass(this.helper,this._helper),this.helper.css({width:this.element.outerWidth(),height:this.element.outerHeight(),position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(e,t){return{width:this.originalSize.width+t}},w:function(e,t){var i=this.originalSize,s=this.originalPosition;return{left:s.left+t,width:i.width-t}},n:function(e,t,i){var s=this.originalSize,a=this.originalPosition;return{top:a.top+i,height:s.height-i}},s:function(e,t,i){return{height:this.originalSize.height+i}},se:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},sw:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[t,i,s]))},ne:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},nw:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[t,i,s]))}},_propagate:function(t,i){e.ui.plugin.call(this,t,[i,this.ui()]),"resize"!==t&&this._trigger(t,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),e.ui.plugin.add("resizable","animate",{stop:function(t){var i=e(this).resizable("instance"),s=i.options,a=i._proportionallyResizeElements,n=a.length&&/textarea/i.test(a[0].nodeName),r=n&&i._hasScroll(a[0],"left")?0:i.sizeDiff.height,o=n?0:i.sizeDiff.width,h={width:i.size.width-o,height:i.size.height-r},l=parseFloat(i.element.css("left"))+(i.position.left-i.originalPosition.left)||null,u=parseFloat(i.element.css("top"))+(i.position.top-i.originalPosition.top)||null;i.element.animate(e.extend(h,u&&l?{top:u,left:l}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseFloat(i.element.css("width")),height:parseFloat(i.element.css("height")),top:parseFloat(i.element.css("top")),left:parseFloat(i.element.css("left"))};a&&a.length&&e(a[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",t)}})}}),e.ui.plugin.add("resizable","containment",{start:function(){var t,i,s,a,n,r,o,h=e(this).resizable("instance"),l=h.options,u=h.element,c=l.containment,d=c instanceof e?c.get(0):/parent/.test(c)?u.parent().get(0):c;d&&(h.containerElement=e(d),/document/.test(c)||c===document?(h.containerOffset={left:0,top:0},h.containerPosition={left:0,top:0},h.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight}):(t=e(d),i=[],e(["Top","Right","Left","Bottom"]).each(function(e,s){i[e]=h._num(t.css("padding"+s))}),h.containerOffset=t.offset(),h.containerPosition=t.position(),h.containerSize={height:t.innerHeight()-i[3],width:t.innerWidth()-i[1]},s=h.containerOffset,a=h.containerSize.height,n=h.containerSize.width,r=h._hasScroll(d,"left")?d.scrollWidth:n,o=h._hasScroll(d)?d.scrollHeight:a,h.parentData={element:d,left:s.left,top:s.top,width:r,height:o}))},resize:function(t){var i,s,a,n,r=e(this).resizable("instance"),o=r.options,h=r.containerOffset,l=r.position,u=r._aspectRatio||t.shiftKey,c={top:0,left:0},d=r.containerElement,p=!0;d[0]!==document&&/static/.test(d.css("position"))&&(c=h),l.left<(r._helper?h.left:0)&&(r.size.width=r.size.width+(r._helper?r.position.left-h.left:r.position.left-c.left),u&&(r.size.height=r.size.width/r.aspectRatio,p=!1),r.position.left=o.helper?h.left:0),l.top<(r._helper?h.top:0)&&(r.size.height=r.size.height+(r._helper?r.position.top-h.top:r.position.top),u&&(r.size.width=r.size.height*r.aspectRatio,p=!1),r.position.top=r._helper?h.top:0),a=r.containerElement.get(0)===r.element.parent().get(0),n=/relative|absolute/.test(r.containerElement.css("position")),a&&n?(r.offset.left=r.parentData.left+r.position.left,r.offset.top=r.parentData.top+r.position.top):(r.offset.left=r.element.offset().left,r.offset.top=r.element.offset().top),i=Math.abs(r.sizeDiff.width+(r._helper?r.offset.left-c.left:r.offset.left-h.left)),s=Math.abs(r.sizeDiff.height+(r._helper?r.offset.top-c.top:r.offset.top-h.top)),i+r.size.width>=r.parentData.width&&(r.size.width=r.parentData.width-i,u&&(r.size.height=r.size.width/r.aspectRatio,p=!1)),s+r.size.height>=r.parentData.height&&(r.size.height=r.parentData.height-s,u&&(r.size.width=r.size.height*r.aspectRatio,p=!1)),p||(r.position.left=r.prevPosition.left,r.position.top=r.prevPosition.top,r.size.width=r.prevSize.width,r.size.height=r.prevSize.height)},stop:function(){var t=e(this).resizable("instance"),i=t.options,s=t.containerOffset,a=t.containerPosition,n=t.containerElement,r=e(t.helper),o=r.offset(),h=r.outerWidth()-t.sizeDiff.width,l=r.outerHeight()-t.sizeDiff.height;t._helper&&!i.animate&&/relative/.test(n.css("position"))&&e(this).css({left:o.left-a.left-s.left,width:h,height:l}),t._helper&&!i.animate&&/static/.test(n.css("position"))&&e(this).css({left:o.left-a.left-s.left,width:h,height:l})}}),e.ui.plugin.add("resizable","alsoResize",{start:function(){var t=e(this).resizable("instance"),i=t.options;e(i.alsoResize).each(function(){var t=e(this);t.data("ui-resizable-alsoresize",{width:parseFloat(t.width()),height:parseFloat(t.height()),left:parseFloat(t.css("left")),top:parseFloat(t.css("top"))})})},resize:function(t,i){var s=e(this).resizable("instance"),a=s.options,n=s.originalSize,r=s.originalPosition,o={height:s.size.height-n.height||0,width:s.size.width-n.width||0,top:s.position.top-r.top||0,left:s.position.left-r.left||0};
e(a.alsoResize).each(function(){var t=e(this),s=e(this).data("ui-resizable-alsoresize"),a={},n=t.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(n,function(e,t){var i=(s[t]||0)+(o[t]||0);i&&i>=0&&(a[t]=i||null)}),t.css(a)})},stop:function(){e(this).removeData("ui-resizable-alsoresize")}}),e.ui.plugin.add("resizable","ghost",{start:function(){var t=e(this).resizable("instance"),i=t.size;t.ghost=t.originalElement.clone(),t.ghost.css({opacity:.25,display:"block",position:"relative",height:i.height,width:i.width,margin:0,left:0,top:0}),t._addClass(t.ghost,"ui-resizable-ghost"),e.uiBackCompat!==!1&&"string"==typeof t.options.ghost&&t.ghost.addClass(this.options.ghost),t.ghost.appendTo(t.helper)},resize:function(){var t=e(this).resizable("instance");t.ghost&&t.ghost.css({position:"relative",height:t.size.height,width:t.size.width})},stop:function(){var t=e(this).resizable("instance");t.ghost&&t.helper&&t.helper.get(0).removeChild(t.ghost.get(0))}}),e.ui.plugin.add("resizable","grid",{resize:function(){var t,i=e(this).resizable("instance"),s=i.options,a=i.size,n=i.originalSize,r=i.originalPosition,o=i.axis,h="number"==typeof s.grid?[s.grid,s.grid]:s.grid,l=h[0]||1,u=h[1]||1,c=Math.round((a.width-n.width)/l)*l,d=Math.round((a.height-n.height)/u)*u,p=n.width+c,f=n.height+d,m=s.maxWidth&&p>s.maxWidth,g=s.maxHeight&&f>s.maxHeight,v=s.minWidth&&s.minWidth>p,y=s.minHeight&&s.minHeight>f;s.grid=h,v&&(p+=l),y&&(f+=u),m&&(p-=l),g&&(f-=u),/^(se|s|e)$/.test(o)?(i.size.width=p,i.size.height=f):/^(ne)$/.test(o)?(i.size.width=p,i.size.height=f,i.position.top=r.top-d):/^(sw)$/.test(o)?(i.size.width=p,i.size.height=f,i.position.left=r.left-c):((0>=f-u||0>=p-l)&&(t=i._getPaddingPlusBorderDimensions(this)),f-u>0?(i.size.height=f,i.position.top=r.top-d):(f=u-t.height,i.size.height=f,i.position.top=r.top+n.height-f),p-l>0?(i.size.width=p,i.position.left=r.left-c):(p=l-t.width,i.size.width=p,i.position.left=r.left+n.width-p))}}),e.ui.resizable,e.widget("ui.selectable",e.ui.mouse,{version:"1.12.1",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch",selected:null,selecting:null,start:null,stop:null,unselected:null,unselecting:null},_create:function(){var t=this;this._addClass("ui-selectable"),this.dragged=!1,this.refresh=function(){t.elementPos=e(t.element[0]).offset(),t.selectees=e(t.options.filter,t.element[0]),t._addClass(t.selectees,"ui-selectee"),t.selectees.each(function(){var i=e(this),s=i.offset(),a={left:s.left-t.elementPos.left,top:s.top-t.elementPos.top};e.data(this,"selectable-item",{element:this,$element:i,left:a.left,top:a.top,right:a.left+i.outerWidth(),bottom:a.top+i.outerHeight(),startselected:!1,selected:i.hasClass("ui-selected"),selecting:i.hasClass("ui-selecting"),unselecting:i.hasClass("ui-unselecting")})})},this.refresh(),this._mouseInit(),this.helper=e("<div>"),this._addClass(this.helper,"ui-selectable-helper")},_destroy:function(){this.selectees.removeData("selectable-item"),this._mouseDestroy()},_mouseStart:function(t){var i=this,s=this.options;this.opos=[t.pageX,t.pageY],this.elementPos=e(this.element[0]).offset(),this.options.disabled||(this.selectees=e(s.filter,this.element[0]),this._trigger("start",t),e(s.appendTo).append(this.helper),this.helper.css({left:t.pageX,top:t.pageY,width:0,height:0}),s.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var s=e.data(this,"selectable-item");s.startselected=!0,t.metaKey||t.ctrlKey||(i._removeClass(s.$element,"ui-selected"),s.selected=!1,i._addClass(s.$element,"ui-unselecting"),s.unselecting=!0,i._trigger("unselecting",t,{unselecting:s.element}))}),e(t.target).parents().addBack().each(function(){var s,a=e.data(this,"selectable-item");return a?(s=!t.metaKey&&!t.ctrlKey||!a.$element.hasClass("ui-selected"),i._removeClass(a.$element,s?"ui-unselecting":"ui-selected")._addClass(a.$element,s?"ui-selecting":"ui-unselecting"),a.unselecting=!s,a.selecting=s,a.selected=s,s?i._trigger("selecting",t,{selecting:a.element}):i._trigger("unselecting",t,{unselecting:a.element}),!1):void 0}))},_mouseDrag:function(t){if(this.dragged=!0,!this.options.disabled){var i,s=this,a=this.options,n=this.opos[0],r=this.opos[1],o=t.pageX,h=t.pageY;return n>o&&(i=o,o=n,n=i),r>h&&(i=h,h=r,r=i),this.helper.css({left:n,top:r,width:o-n,height:h-r}),this.selectees.each(function(){var i=e.data(this,"selectable-item"),l=!1,u={};i&&i.element!==s.element[0]&&(u.left=i.left+s.elementPos.left,u.right=i.right+s.elementPos.left,u.top=i.top+s.elementPos.top,u.bottom=i.bottom+s.elementPos.top,"touch"===a.tolerance?l=!(u.left>o||n>u.right||u.top>h||r>u.bottom):"fit"===a.tolerance&&(l=u.left>n&&o>u.right&&u.top>r&&h>u.bottom),l?(i.selected&&(s._removeClass(i.$element,"ui-selected"),i.selected=!1),i.unselecting&&(s._removeClass(i.$element,"ui-unselecting"),i.unselecting=!1),i.selecting||(s._addClass(i.$element,"ui-selecting"),i.selecting=!0,s._trigger("selecting",t,{selecting:i.element}))):(i.selecting&&((t.metaKey||t.ctrlKey)&&i.startselected?(s._removeClass(i.$element,"ui-selecting"),i.selecting=!1,s._addClass(i.$element,"ui-selected"),i.selected=!0):(s._removeClass(i.$element,"ui-selecting"),i.selecting=!1,i.startselected&&(s._addClass(i.$element,"ui-unselecting"),i.unselecting=!0),s._trigger("unselecting",t,{unselecting:i.element}))),i.selected&&(t.metaKey||t.ctrlKey||i.startselected||(s._removeClass(i.$element,"ui-selected"),i.selected=!1,s._addClass(i.$element,"ui-unselecting"),i.unselecting=!0,s._trigger("unselecting",t,{unselecting:i.element})))))}),!1}},_mouseStop:function(t){var i=this;return this.dragged=!1,e(".ui-unselecting",this.element[0]).each(function(){var s=e.data(this,"selectable-item");i._removeClass(s.$element,"ui-unselecting"),s.unselecting=!1,s.startselected=!1,i._trigger("unselected",t,{unselected:s.element})}),e(".ui-selecting",this.element[0]).each(function(){var s=e.data(this,"selectable-item");i._removeClass(s.$element,"ui-selecting")._addClass(s.$element,"ui-selected"),s.selecting=!1,s.selected=!0,s.startselected=!0,i._trigger("selected",t,{selected:s.element})}),this._trigger("stop",t),this.helper.remove(),!1}}),e.widget("ui.sortable",e.ui.mouse,{version:"1.12.1",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function(e,t,i){return e>=t&&t+i>e},_isFloating:function(e){return/left|right/.test(e.css("float"))||/inline|table-cell/.test(e.css("display"))},_create:function(){this.containerCache={},this._addClass("ui-sortable"),this.refresh(),this.offset=this.element.offset(),this._mouseInit(),this._setHandleClassName(),this.ready=!0},_setOption:function(e,t){this._super(e,t),"handle"===e&&this._setHandleClassName()},_setHandleClassName:function(){var t=this;this._removeClass(this.element.find(".ui-sortable-handle"),"ui-sortable-handle"),e.each(this.items,function(){t._addClass(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item,"ui-sortable-handle")})},_destroy:function(){this._mouseDestroy();for(var e=this.items.length-1;e>=0;e--)this.items[e].item.removeData(this.widgetName+"-item");return this},_mouseCapture:function(t,i){var s=null,a=!1,n=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(t),e(t.target).parents().each(function(){return e.data(this,n.widgetName+"-item")===n?(s=e(this),!1):void 0}),e.data(t.target,n.widgetName+"-item")===n&&(s=e(t.target)),s?!this.options.handle||i||(e(this.options.handle,s).find("*").addBack().each(function(){this===t.target&&(a=!0)}),a)?(this.currentItem=s,this._removeCurrentsFromItems(),!0):!1:!1)},_mouseStart:function(t,i,s){var a,n,r=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(t),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,r.cursorAt&&this._adjustOffsetFromHelper(r.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),r.containment&&this._setContainment(),r.cursor&&"auto"!==r.cursor&&(n=this.document.find("body"),this.storedCursor=n.css("cursor"),n.css("cursor",r.cursor),this.storedStylesheet=e("<style>*{ cursor: "+r.cursor+" !important; }</style>").appendTo(n)),r.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",r.opacity)),r.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",r.zIndex)),this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",t,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(a=this.containers.length-1;a>=0;a--)this.containers[a]._trigger("activate",t,this._uiHash(this));return e.ui.ddmanager&&(e.ui.ddmanager.current=this),e.ui.ddmanager&&!r.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this.dragging=!0,this._addClass(this.helper,"ui-sortable-helper"),this._mouseDrag(t),!0},_mouseDrag:function(t){var i,s,a,n,r=this.options,o=!1;for(this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<r.scrollSensitivity?this.scrollParent[0].scrollTop=o=this.scrollParent[0].scrollTop+r.scrollSpeed:t.pageY-this.overflowOffset.top<r.scrollSensitivity&&(this.scrollParent[0].scrollTop=o=this.scrollParent[0].scrollTop-r.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<r.scrollSensitivity?this.scrollParent[0].scrollLeft=o=this.scrollParent[0].scrollLeft+r.scrollSpeed:t.pageX-this.overflowOffset.left<r.scrollSensitivity&&(this.scrollParent[0].scrollLeft=o=this.scrollParent[0].scrollLeft-r.scrollSpeed)):(t.pageY-this.document.scrollTop()<r.scrollSensitivity?o=this.document.scrollTop(this.document.scrollTop()-r.scrollSpeed):this.window.height()-(t.pageY-this.document.scrollTop())<r.scrollSensitivity&&(o=this.document.scrollTop(this.document.scrollTop()+r.scrollSpeed)),t.pageX-this.document.scrollLeft()<r.scrollSensitivity?o=this.document.scrollLeft(this.document.scrollLeft()-r.scrollSpeed):this.window.width()-(t.pageX-this.document.scrollLeft())<r.scrollSensitivity&&(o=this.document.scrollLeft(this.document.scrollLeft()+r.scrollSpeed))),o!==!1&&e.ui.ddmanager&&!r.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(s=this.items[i],a=s.item[0],n=this._intersectsWithPointer(s),n&&s.instance===this.currentContainer&&a!==this.currentItem[0]&&this.placeholder[1===n?"next":"prev"]()[0]!==a&&!e.contains(this.placeholder[0],a)&&("semi-dynamic"===this.options.type?!e.contains(this.element[0],a):!0)){if(this.direction=1===n?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(s))break;this._rearrange(t,s),this._trigger("change",t,this._uiHash());break}return this._contactContainers(t),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t,i){if(t){if(e.ui.ddmanager&&!this.options.dropBehaviour&&e.ui.ddmanager.drop(this,t),this.options.revert){var s=this,a=this.placeholder.offset(),n=this.options.axis,r={};n&&"x"!==n||(r.left=a.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollLeft)),n&&"y"!==n||(r.top=a.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,e(this.helper).animate(r,parseInt(this.options.revert,10)||500,function(){s._clear(t)})}else this._clear(t,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp(new e.Event("mouseup",{target:null})),"original"===this.options.helper?(this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")):this.currentItem.show();for(var t=this.containers.length-1;t>=0;t--)this.containers[t]._trigger("deactivate",null,this._uiHash(this)),this.containers[t].containerCache.over&&(this.containers[t]._trigger("out",null,this._uiHash(this)),this.containers[t].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),e.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?e(this.domPosition.prev).after(this.currentItem):e(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},e(i).each(function(){var i=(e(t.item||this).attr(t.attribute||"id")||"").match(t.expression||/(.+)[\-=_](.+)/);i&&s.push((t.key||i[1]+"[]")+"="+(t.key&&t.expression?i[1]:i[2]))}),!s.length&&t.key&&s.push(t.key+"="),s.join("&")},toArray:function(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},i.each(function(){s.push(e(t.item||this).attr(t.attribute||"id")||"")}),s},_intersectsWith:function(e){var t=this.positionAbs.left,i=t+this.helperProportions.width,s=this.positionAbs.top,a=s+this.helperProportions.height,n=e.left,r=n+e.width,o=e.top,h=o+e.height,l=this.offset.click.top,u=this.offset.click.left,c="x"===this.options.axis||s+l>o&&h>s+l,d="y"===this.options.axis||t+u>n&&r>t+u,p=c&&d;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>e[this.floating?"width":"height"]?p:t+this.helperProportions.width/2>n&&r>i-this.helperProportions.width/2&&s+this.helperProportions.height/2>o&&h>a-this.helperProportions.height/2},_intersectsWithPointer:function(e){var t,i,s="x"===this.options.axis||this._isOverAxis(this.positionAbs.top+this.offset.click.top,e.top,e.height),a="y"===this.options.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,e.left,e.width),n=s&&a;return n?(t=this._getDragVerticalDirection(),i=this._getDragHorizontalDirection(),this.floating?"right"===i||"down"===t?2:1:t&&("down"===t?2:1)):!1},_intersectsWithSides:function(e){var t=this._isOverAxis(this.positionAbs.top+this.offset.click.top,e.top+e.height/2,e.height),i=this._isOverAxis(this.positionAbs.left+this.offset.click.left,e.left+e.width/2,e.width),s=this._getDragVerticalDirection(),a=this._getDragHorizontalDirection();return this.floating&&a?"right"===a&&i||"left"===a&&!i:s&&("down"===s&&t||"up"===s&&!t)},_getDragVerticalDirection:function(){var e=this.positionAbs.top-this.lastPositionAbs.top;return 0!==e&&(e>0?"down":"up")},_getDragHorizontalDirection:function(){var e=this.positionAbs.left-this.lastPositionAbs.left;return 0!==e&&(e>0?"right":"left")},refresh:function(e){return this._refreshItems(e),this._setHandleClassName(),this.refreshPositions(),this},_connectWith:function(){var e=this.options;return e.connectWith.constructor===String?[e.connectWith]:e.connectWith},_getItemsAsjQuery:function(t){function i(){o.push(this)}var s,a,n,r,o=[],h=[],l=this._connectWith();if(l&&t)for(s=l.length-1;s>=0;s--)for(n=e(l[s],this.document[0]),a=n.length-1;a>=0;a--)r=e.data(n[a],this.widgetFullName),r&&r!==this&&!r.options.disabled&&h.push([e.isFunction(r.options.items)?r.options.items.call(r.element):e(r.options.items,r.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),r]);for(h.push([e.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):e(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),s=h.length-1;s>=0;s--)h[s][0].each(i);return e(o)},_removeCurrentsFromItems:function(){var t=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=e.grep(this.items,function(e){for(var i=0;t.length>i;i++)if(t[i]===e.item[0])return!1;return!0})},_refreshItems:function(t){this.items=[],this.containers=[this];var i,s,a,n,r,o,h,l,u=this.items,c=[[e.isFunction(this.options.items)?this.options.items.call(this.element[0],t,{item:this.currentItem}):e(this.options.items,this.element),this]],d=this._connectWith();if(d&&this.ready)for(i=d.length-1;i>=0;i--)for(a=e(d[i],this.document[0]),s=a.length-1;s>=0;s--)n=e.data(a[s],this.widgetFullName),n&&n!==this&&!n.options.disabled&&(c.push([e.isFunction(n.options.items)?n.options.items.call(n.element[0],t,{item:this.currentItem}):e(n.options.items,n.element),n]),this.containers.push(n));for(i=c.length-1;i>=0;i--)for(r=c[i][1],o=c[i][0],s=0,l=o.length;l>s;s++)h=e(o[s]),h.data(this.widgetName+"-item",r),u.push({item:h,instance:r,width:0,height:0,left:0,top:0})},refreshPositions:function(t){this.floating=this.items.length?"x"===this.options.axis||this._isFloating(this.items[0].item):!1,this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,s,a,n;for(i=this.items.length-1;i>=0;i--)s=this.items[i],s.instance!==this.currentContainer&&this.currentContainer&&s.item[0]!==this.currentItem[0]||(a=this.options.toleranceElement?e(this.options.toleranceElement,s.item):s.item,t||(s.width=a.outerWidth(),s.height=a.outerHeight()),n=a.offset(),s.left=n.left,s.top=n.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)n=this.containers[i].element.offset(),this.containers[i].containerCache.left=n.left,this.containers[i].containerCache.top=n.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(t){t=t||this;var i,s=t.options;s.placeholder&&s.placeholder.constructor!==String||(i=s.placeholder,s.placeholder={element:function(){var s=t.currentItem[0].nodeName.toLowerCase(),a=e("<"+s+">",t.document[0]);return t._addClass(a,"ui-sortable-placeholder",i||t.currentItem[0].className)._removeClass(a,"ui-sortable-helper"),"tbody"===s?t._createTrPlaceholder(t.currentItem.find("tr").eq(0),e("<tr>",t.document[0]).appendTo(a)):"tr"===s?t._createTrPlaceholder(t.currentItem,a):"img"===s&&a.attr("src",t.currentItem.attr("src")),i||a.css("visibility","hidden"),a},update:function(e,a){(!i||s.forcePlaceholderSize)&&(a.height()||a.height(t.currentItem.innerHeight()-parseInt(t.currentItem.css("paddingTop")||0,10)-parseInt(t.currentItem.css("paddingBottom")||0,10)),a.width()||a.width(t.currentItem.innerWidth()-parseInt(t.currentItem.css("paddingLeft")||0,10)-parseInt(t.currentItem.css("paddingRight")||0,10)))}}),t.placeholder=e(s.placeholder.element.call(t.element,t.currentItem)),t.currentItem.after(t.placeholder),s.placeholder.update(t,t.placeholder)},_createTrPlaceholder:function(t,i){var s=this;t.children().each(function(){e("<td>&#160;</td>",s.document[0]).attr("colspan",e(this).attr("colspan")||1).appendTo(i)})},_contactContainers:function(t){var i,s,a,n,r,o,h,l,u,c,d=null,p=null;for(i=this.containers.length-1;i>=0;i--)if(!e.contains(this.currentItem[0],this.containers[i].element[0]))if(this._intersectsWith(this.containers[i].containerCache)){if(d&&e.contains(this.containers[i].element[0],d.element[0]))continue;d=this.containers[i],p=i}else this.containers[i].containerCache.over&&(this.containers[i]._trigger("out",t,this._uiHash(this)),this.containers[i].containerCache.over=0);if(d)if(1===this.containers.length)this.containers[p].containerCache.over||(this.containers[p]._trigger("over",t,this._uiHash(this)),this.containers[p].containerCache.over=1);else{for(a=1e4,n=null,u=d.floating||this._isFloating(this.currentItem),r=u?"left":"top",o=u?"width":"height",c=u?"pageX":"pageY",s=this.items.length-1;s>=0;s--)e.contains(this.containers[p].element[0],this.items[s].item[0])&&this.items[s].item[0]!==this.currentItem[0]&&(h=this.items[s].item.offset()[r],l=!1,t[c]-h>this.items[s][o]/2&&(l=!0),a>Math.abs(t[c]-h)&&(a=Math.abs(t[c]-h),n=this.items[s],this.direction=l?"up":"down"));if(!n&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[p])return this.currentContainer.containerCache.over||(this.containers[p]._trigger("over",t,this._uiHash()),this.currentContainer.containerCache.over=1),void 0;n?this._rearrange(t,n,null,!0):this._rearrange(t,null,this.containers[p].element,!0),this._trigger("change",t,this._uiHash()),this.containers[p]._trigger("change",t,this._uiHash(this)),this.currentContainer=this.containers[p],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[p]._trigger("over",t,this._uiHash(this)),this.containers[p].containerCache.over=1}},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper)?e(i.helper.apply(this.element[0],[t,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||e("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!s[0].style.width||i.forceHelperSize)&&s.width(this.currentItem.width()),(!s[0].style.height||i.forceHelperSize)&&s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==this.document[0]&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===this.document[0].body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var e=this.currentItem.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,a=this.options;"parent"===a.containment&&(a.containment=this.helper[0].parentNode),("document"===a.containment||"window"===a.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,"document"===a.containment?this.document.width():this.window.width()-this.helperProportions.width-this.margins.left,("document"===a.containment?this.document.height()||document.body.parentNode.scrollHeight:this.window.height()||this.document[0].body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(a.containment)||(t=e(a.containment)[0],i=e(a.containment).offset(),s="hidden"!==e(t).css("overflow"),this.containment=[i.left+(parseInt(e(t).css("borderLeftWidth"),10)||0)+(parseInt(e(t).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(e(t).css("borderTopWidth"),10)||0)+(parseInt(e(t).css("paddingTop"),10)||0)-this.margins.top,i.left+(s?Math.max(t.scrollWidth,t.offsetWidth):t.offsetWidth)-(parseInt(e(t).css("borderLeftWidth"),10)||0)-(parseInt(e(t).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(s?Math.max(t.scrollHeight,t.offsetHeight):t.offsetHeight)-(parseInt(e(t).css("borderTopWidth"),10)||0)-(parseInt(e(t).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(t,i){i||(i=this.position);var s="absolute"===t?1:-1,a="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,n=/(html|body)/i.test(a[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():n?0:a.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():n?0:a.scrollLeft())*s}},_generatePosition:function(t){var i,s,a=this.options,n=t.pageX,r=t.pageY,o="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=/(html|body)/i.test(o[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(t.pageX-this.offset.click.left<this.containment[0]&&(n=this.containment[0]+this.offset.click.left),t.pageY-this.offset.click.top<this.containment[1]&&(r=this.containment[1]+this.offset.click.top),t.pageX-this.offset.click.left>this.containment[2]&&(n=this.containment[2]+this.offset.click.left),t.pageY-this.offset.click.top>this.containment[3]&&(r=this.containment[3]+this.offset.click.top)),a.grid&&(i=this.originalPageY+Math.round((r-this.originalPageY)/a.grid[1])*a.grid[1],r=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-a.grid[1]:i+a.grid[1]:i,s=this.originalPageX+Math.round((n-this.originalPageX)/a.grid[0])*a.grid[0],n=this.containment?s-this.offset.click.left>=this.containment[0]&&s-this.offset.click.left<=this.containment[2]?s:s-this.offset.click.left>=this.containment[0]?s-a.grid[0]:s+a.grid[0]:s)),{top:r-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():h?0:o.scrollTop()),left:n-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():h?0:o.scrollLeft())}},_rearrange:function(e,t,i,s){i?i[0].appendChild(this.placeholder[0]):t.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?t.item[0]:t.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var a=this.counter;this._delay(function(){a===this.counter&&this.refreshPositions(!s)})},_clear:function(e,t){function i(e,t,i){return function(s){i._trigger(e,s,t._uiHash(t))}}this.reverting=!1;var s,a=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(s in this._storedCSS)("auto"===this._storedCSS[s]||"static"===this._storedCSS[s])&&(this._storedCSS[s]="");this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!t&&a.push(function(e){this._trigger("receive",e,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||t||a.push(function(e){this._trigger("update",e,this._uiHash())}),this!==this.currentContainer&&(t||(a.push(function(e){this._trigger("remove",e,this._uiHash())}),a.push(function(e){return function(t){e._trigger("receive",t,this._uiHash(this))}}.call(this,this.currentContainer)),a.push(function(e){return function(t){e._trigger("update",t,this._uiHash(this))}}.call(this,this.currentContainer)))),s=this.containers.length-1;s>=0;s--)t||a.push(i("deactivate",this,this.containers[s])),this.containers[s].containerCache.over&&(a.push(i("out",this,this.containers[s])),this.containers[s].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,t||this._trigger("beforeStop",e,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.cancelHelperRemoval||(this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null),!t){for(s=0;a.length>s;s++)a[s].call(this,e);this._trigger("stop",e,this._uiHash())}return this.fromOutside=!1,!this.cancelHelperRemoval},_trigger:function(){e.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(t){var i=t||this;return{helper:i.helper,placeholder:i.placeholder||e([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:t?t.element:null}}}),e.widget("ui.accordion",{version:"1.12.1",options:{active:0,animate:{},classes:{"ui-accordion-header":"ui-corner-top","ui-accordion-header-collapsed":"ui-corner-all","ui-accordion-content":"ui-corner-bottom"},collapsible:!1,event:"click",header:"> li > :first-child, > :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},hideProps:{borderTopWidth:"hide",borderBottomWidth:"hide",paddingTop:"hide",paddingBottom:"hide",height:"hide"},showProps:{borderTopWidth:"show",borderBottomWidth:"show",paddingTop:"show",paddingBottom:"show",height:"show"},_create:function(){var t=this.options;this.prevShow=this.prevHide=e(),this._addClass("ui-accordion","ui-widget ui-helper-reset"),this.element.attr("role","tablist"),t.collapsible||t.active!==!1&&null!=t.active||(t.active=0),this._processPanels(),0>t.active&&(t.active+=this.headers.length),this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():e()}},_createIcons:function(){var t,i,s=this.options.icons;s&&(t=e("<span>"),this._addClass(t,"ui-accordion-header-icon","ui-icon "+s.header),t.prependTo(this.headers),i=this.active.children(".ui-accordion-header-icon"),this._removeClass(i,s.header)._addClass(i,null,s.activeHeader)._addClass(this.headers,"ui-accordion-icons"))
},_destroyIcons:function(){this._removeClass(this.headers,"ui-accordion-icons"),this.headers.children(".ui-accordion-header-icon").remove()},_destroy:function(){var e;this.element.removeAttr("role"),this.headers.removeAttr("role aria-expanded aria-selected aria-controls tabIndex").removeUniqueId(),this._destroyIcons(),e=this.headers.next().css("display","").removeAttr("role aria-hidden aria-labelledby").removeUniqueId(),"content"!==this.options.heightStyle&&e.css("height","")},_setOption:function(e,t){return"active"===e?(this._activate(t),void 0):("event"===e&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(t)),this._super(e,t),"collapsible"!==e||t||this.options.active!==!1||this._activate(0),"icons"===e&&(this._destroyIcons(),t&&this._createIcons()),void 0)},_setOptionDisabled:function(e){this._super(e),this.element.attr("aria-disabled",e),this._toggleClass(null,"ui-state-disabled",!!e),this._toggleClass(this.headers.add(this.headers.next()),null,"ui-state-disabled",!!e)},_keydown:function(t){if(!t.altKey&&!t.ctrlKey){var i=e.ui.keyCode,s=this.headers.length,a=this.headers.index(t.target),n=!1;switch(t.keyCode){case i.RIGHT:case i.DOWN:n=this.headers[(a+1)%s];break;case i.LEFT:case i.UP:n=this.headers[(a-1+s)%s];break;case i.SPACE:case i.ENTER:this._eventHandler(t);break;case i.HOME:n=this.headers[0];break;case i.END:n=this.headers[s-1]}n&&(e(t.target).attr("tabIndex",-1),e(n).attr("tabIndex",0),e(n).trigger("focus"),t.preventDefault())}},_panelKeyDown:function(t){t.keyCode===e.ui.keyCode.UP&&t.ctrlKey&&e(t.currentTarget).prev().trigger("focus")},refresh:function(){var t=this.options;this._processPanels(),t.active===!1&&t.collapsible===!0||!this.headers.length?(t.active=!1,this.active=e()):t.active===!1?this._activate(0):this.active.length&&!e.contains(this.element[0],this.active[0])?this.headers.length===this.headers.find(".ui-state-disabled").length?(t.active=!1,this.active=e()):this._activate(Math.max(0,t.active-1)):t.active=this.headers.index(this.active),this._destroyIcons(),this._refresh()},_processPanels:function(){var e=this.headers,t=this.panels;this.headers=this.element.find(this.options.header),this._addClass(this.headers,"ui-accordion-header ui-accordion-header-collapsed","ui-state-default"),this.panels=this.headers.next().filter(":not(.ui-accordion-content-active)").hide(),this._addClass(this.panels,"ui-accordion-content","ui-helper-reset ui-widget-content"),t&&(this._off(e.not(this.headers)),this._off(t.not(this.panels)))},_refresh:function(){var t,i=this.options,s=i.heightStyle,a=this.element.parent();this.active=this._findActive(i.active),this._addClass(this.active,"ui-accordion-header-active","ui-state-active")._removeClass(this.active,"ui-accordion-header-collapsed"),this._addClass(this.active.next(),"ui-accordion-content-active"),this.active.next().show(),this.headers.attr("role","tab").each(function(){var t=e(this),i=t.uniqueId().attr("id"),s=t.next(),a=s.uniqueId().attr("id");t.attr("aria-controls",a),s.attr("aria-labelledby",i)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}).next().attr({"aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}).next().attr({"aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(i.event),"fill"===s?(t=a.height(),this.element.siblings(":visible").each(function(){var i=e(this),s=i.css("position");"absolute"!==s&&"fixed"!==s&&(t-=i.outerHeight(!0))}),this.headers.each(function(){t-=e(this).outerHeight(!0)}),this.headers.next().each(function(){e(this).height(Math.max(0,t-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):"auto"===s&&(t=0,this.headers.next().each(function(){var i=e(this).is(":visible");i||e(this).show(),t=Math.max(t,e(this).css("height","").height()),i||e(this).hide()}).height(t))},_activate:function(t){var i=this._findActive(t)[0];i!==this.active[0]&&(i=i||this.active[0],this._eventHandler({target:i,currentTarget:i,preventDefault:e.noop}))},_findActive:function(t){return"number"==typeof t?this.headers.eq(t):e()},_setupEvents:function(t){var i={keydown:"_keydown"};t&&e.each(t.split(" "),function(e,t){i[t]="_eventHandler"}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,i),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers)},_eventHandler:function(t){var i,s,a=this.options,n=this.active,r=e(t.currentTarget),o=r[0]===n[0],h=o&&a.collapsible,l=h?e():r.next(),u=n.next(),c={oldHeader:n,oldPanel:u,newHeader:h?e():r,newPanel:l};t.preventDefault(),o&&!a.collapsible||this._trigger("beforeActivate",t,c)===!1||(a.active=h?!1:this.headers.index(r),this.active=o?e():r,this._toggle(c),this._removeClass(n,"ui-accordion-header-active","ui-state-active"),a.icons&&(i=n.children(".ui-accordion-header-icon"),this._removeClass(i,null,a.icons.activeHeader)._addClass(i,null,a.icons.header)),o||(this._removeClass(r,"ui-accordion-header-collapsed")._addClass(r,"ui-accordion-header-active","ui-state-active"),a.icons&&(s=r.children(".ui-accordion-header-icon"),this._removeClass(s,null,a.icons.header)._addClass(s,null,a.icons.activeHeader)),this._addClass(r.next(),"ui-accordion-content-active")))},_toggle:function(t){var i=t.newPanel,s=this.prevShow.length?this.prevShow:t.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=i,this.prevHide=s,this.options.animate?this._animate(i,s,t):(s.hide(),i.show(),this._toggleComplete(t)),s.attr({"aria-hidden":"true"}),s.prev().attr({"aria-selected":"false","aria-expanded":"false"}),i.length&&s.length?s.prev().attr({tabIndex:-1,"aria-expanded":"false"}):i.length&&this.headers.filter(function(){return 0===parseInt(e(this).attr("tabIndex"),10)}).attr("tabIndex",-1),i.attr("aria-hidden","false").prev().attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_animate:function(e,t,i){var s,a,n,r=this,o=0,h=e.css("box-sizing"),l=e.length&&(!t.length||e.index()<t.index()),u=this.options.animate||{},c=l&&u.down||u,d=function(){r._toggleComplete(i)};return"number"==typeof c&&(n=c),"string"==typeof c&&(a=c),a=a||c.easing||u.easing,n=n||c.duration||u.duration,t.length?e.length?(s=e.show().outerHeight(),t.animate(this.hideProps,{duration:n,easing:a,step:function(e,t){t.now=Math.round(e)}}),e.hide().animate(this.showProps,{duration:n,easing:a,complete:d,step:function(e,i){i.now=Math.round(e),"height"!==i.prop?"content-box"===h&&(o+=i.now):"content"!==r.options.heightStyle&&(i.now=Math.round(s-t.outerHeight()-o),o=0)}}),void 0):t.animate(this.hideProps,n,a,d):e.animate(this.showProps,n,a,d)},_toggleComplete:function(e){var t=e.oldPanel,i=t.prev();this._removeClass(t,"ui-accordion-content-active"),this._removeClass(i,"ui-accordion-header-active")._addClass(i,"ui-accordion-header-collapsed"),t.length&&(t.parent()[0].className=t.parent()[0].className),this._trigger("activate",null,e)}}),e.widget("ui.menu",{version:"1.12.1",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-caret-1-e"},items:"> *",menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().attr({role:this.options.role,tabIndex:0}),this._addClass("ui-menu","ui-widget ui-widget-content"),this._on({"mousedown .ui-menu-item":function(e){e.preventDefault()},"click .ui-menu-item":function(t){var i=e(t.target),s=e(e.ui.safeActiveElement(this.document[0]));!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.select(t),t.isPropagationStopped()||(this.mouseHandled=!0),i.has(".ui-menu").length?this.expand(t):!this.element.is(":focus")&&s.closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(t){if(!this.previousFilter){var i=e(t.target).closest(".ui-menu-item"),s=e(t.currentTarget);i[0]===s[0]&&(this._removeClass(s.siblings().children(".ui-state-active"),null,"ui-state-active"),this.focus(t,s))}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e,t){var i=this.active||this.element.find(this.options.items).eq(0);t||this.focus(e,i)},blur:function(t){this._delay(function(){var i=!e.contains(this.element[0],e.ui.safeActiveElement(this.document[0]));i&&this.collapseAll(t)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(e){this._closeOnDocumentClick(e)&&this.collapseAll(e),this.mouseHandled=!1}})},_destroy:function(){var t=this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),i=t.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(),i.children().each(function(){var t=e(this);t.data("ui-menu-submenu-caret")&&t.remove()})},_keydown:function(t){var i,s,a,n,r=!0;switch(t.keyCode){case e.ui.keyCode.PAGE_UP:this.previousPage(t);break;case e.ui.keyCode.PAGE_DOWN:this.nextPage(t);break;case e.ui.keyCode.HOME:this._move("first","first",t);break;case e.ui.keyCode.END:this._move("last","last",t);break;case e.ui.keyCode.UP:this.previous(t);break;case e.ui.keyCode.DOWN:this.next(t);break;case e.ui.keyCode.LEFT:this.collapse(t);break;case e.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(t);break;case e.ui.keyCode.ENTER:case e.ui.keyCode.SPACE:this._activate(t);break;case e.ui.keyCode.ESCAPE:this.collapse(t);break;default:r=!1,s=this.previousFilter||"",n=!1,a=t.keyCode>=96&&105>=t.keyCode?""+(t.keyCode-96):String.fromCharCode(t.keyCode),clearTimeout(this.filterTimer),a===s?n=!0:a=s+a,i=this._filterMenuItems(a),i=n&&-1!==i.index(this.active.next())?this.active.nextAll(".ui-menu-item"):i,i.length||(a=String.fromCharCode(t.keyCode),i=this._filterMenuItems(a)),i.length?(this.focus(t,i),this.previousFilter=a,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}r&&t.preventDefault()},_activate:function(e){this.active&&!this.active.is(".ui-state-disabled")&&(this.active.children("[aria-haspopup='true']").length?this.expand(e):this.select(e))},refresh:function(){var t,i,s,a,n,r=this,o=this.options.icons.submenu,h=this.element.find(this.options.menus);this._toggleClass("ui-menu-icons",null,!!this.element.find(".ui-icon").length),s=h.filter(":not(.ui-menu)").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var t=e(this),i=t.prev(),s=e("<span>").data("ui-menu-submenu-caret",!0);r._addClass(s,"ui-menu-icon","ui-icon "+o),i.attr("aria-haspopup","true").prepend(s),t.attr("aria-labelledby",i.attr("id"))}),this._addClass(s,"ui-menu","ui-widget ui-widget-content ui-front"),t=h.add(this.element),i=t.find(this.options.items),i.not(".ui-menu-item").each(function(){var t=e(this);r._isDivider(t)&&r._addClass(t,"ui-menu-divider","ui-widget-content")}),a=i.not(".ui-menu-item, .ui-menu-divider"),n=a.children().not(".ui-menu").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),this._addClass(a,"ui-menu-item")._addClass(n,"ui-menu-item-wrapper"),i.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!e.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(e,t){if("icons"===e){var i=this.element.find(".ui-menu-icon");this._removeClass(i,null,this.options.icons.submenu)._addClass(i,null,t.submenu)}this._super(e,t)},_setOptionDisabled:function(e){this._super(e),this.element.attr("aria-disabled",e+""),this._toggleClass(null,"ui-state-disabled",!!e)},focus:function(e,t){var i,s,a;this.blur(e,e&&"focus"===e.type),this._scrollIntoView(t),this.active=t.first(),s=this.active.children(".ui-menu-item-wrapper"),this._addClass(s,null,"ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),a=this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"),this._addClass(a,null,"ui-state-active"),e&&"keydown"===e.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=t.children(".ui-menu"),i.length&&e&&/^mouse/.test(e.type)&&this._startOpening(i),this.activeMenu=t.parent(),this._trigger("focus",e,{item:t})},_scrollIntoView:function(t){var i,s,a,n,r,o;this._hasScroll()&&(i=parseFloat(e.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(e.css(this.activeMenu[0],"paddingTop"))||0,a=t.offset().top-this.activeMenu.offset().top-i-s,n=this.activeMenu.scrollTop(),r=this.activeMenu.height(),o=t.outerHeight(),0>a?this.activeMenu.scrollTop(n+a):a+o>r&&this.activeMenu.scrollTop(n+a-r+o))},blur:function(e,t){t||clearTimeout(this.timer),this.active&&(this._removeClass(this.active.children(".ui-menu-item-wrapper"),null,"ui-state-active"),this._trigger("blur",e,{item:this.active}),this.active=null)},_startOpening:function(e){clearTimeout(this.timer),"true"===e.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(e)},this.delay))},_open:function(t){var i=e.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden","true"),t.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(t,i){clearTimeout(this.timer),this.timer=this._delay(function(){var s=i?this.element:e(t&&t.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(t),this._removeClass(s.find(".ui-state-active"),null,"ui-state-active"),this.activeMenu=s},this.delay)},_close:function(e){e||(e=this.active?this.active.parent():this.element),e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false")},_closeOnDocumentClick:function(t){return!e(t.target).closest(".ui-menu").length},_isDivider:function(e){return!/[^\-\u2014\u2013\s]/.test(e.text())},collapse:function(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element);t&&t.length&&(this._close(),this.focus(e,t))},expand:function(e){var t=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();t&&t.length&&(this._open(t.parent()),this._delay(function(){this.focus(e,t)}))},next:function(e){this._move("next","first",e)},previous:function(e){this._move("prev","last",e)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(e,t,i){var s;this.active&&(s="first"===e||"last"===e?this.active["first"===e?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[e+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.find(this.options.items)[t]()),this.focus(i,s)},nextPage:function(t){var i,s,a;return this.active?(this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,a=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=e(this),0>i.offset().top-s-a}),this.focus(t,i)):this.focus(t,this.activeMenu.find(this.options.items)[this.active?"last":"first"]())),void 0):(this.next(t),void 0)},previousPage:function(t){var i,s,a;return this.active?(this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,a=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=e(this),i.offset().top-s+a>0}),this.focus(t,i)):this.focus(t,this.activeMenu.find(this.options.items).first())),void 0):(this.next(t),void 0)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(t){this.active=this.active||e(t.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(t,!0),this._trigger("select",t,i)},_filterMenuItems:function(t){var i=t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),s=RegExp("^"+i,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return s.test(e.trim(e(this).children(".ui-menu-item-wrapper").text()))})}}),e.widget("ui.autocomplete",{version:"1.12.1",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var t,i,s,a=this.element[0].nodeName.toLowerCase(),n="textarea"===a,r="input"===a;this.isMultiLine=n||!r&&this._isContentEditable(this.element),this.valueMethod=this.element[n||r?"val":"text"],this.isNewMenu=!0,this._addClass("ui-autocomplete-input"),this.element.attr("autocomplete","off"),this._on(this.element,{keydown:function(a){if(this.element.prop("readOnly"))return t=!0,s=!0,i=!0,void 0;t=!1,s=!1,i=!1;var n=e.ui.keyCode;switch(a.keyCode){case n.PAGE_UP:t=!0,this._move("previousPage",a);break;case n.PAGE_DOWN:t=!0,this._move("nextPage",a);break;case n.UP:t=!0,this._keyEvent("previous",a);break;case n.DOWN:t=!0,this._keyEvent("next",a);break;case n.ENTER:this.menu.active&&(t=!0,a.preventDefault(),this.menu.select(a));break;case n.TAB:this.menu.active&&this.menu.select(a);break;case n.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(a),a.preventDefault());break;default:i=!0,this._searchTimeout(a)}},keypress:function(s){if(t)return t=!1,(!this.isMultiLine||this.menu.element.is(":visible"))&&s.preventDefault(),void 0;if(!i){var a=e.ui.keyCode;switch(s.keyCode){case a.PAGE_UP:this._move("previousPage",s);break;case a.PAGE_DOWN:this._move("nextPage",s);break;case a.UP:this._keyEvent("previous",s);break;case a.DOWN:this._keyEvent("next",s)}}},input:function(e){return s?(s=!1,e.preventDefault(),void 0):(this._searchTimeout(e),void 0)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(e){return this.cancelBlur?(delete this.cancelBlur,void 0):(clearTimeout(this.searching),this.close(e),this._change(e),void 0)}}),this._initSource(),this.menu=e("<ul>").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance"),this._addClass(this.menu.element,"ui-autocomplete","ui-front"),this._on(this.menu.element,{mousedown:function(t){t.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,this.element[0]!==e.ui.safeActiveElement(this.document[0])&&this.element.trigger("focus")})},menufocus:function(t,i){var s,a;return this.isNewMenu&&(this.isNewMenu=!1,t.originalEvent&&/^mouse/.test(t.originalEvent.type))?(this.menu.blur(),this.document.one("mousemove",function(){e(t.target).trigger(t.originalEvent)}),void 0):(a=i.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",t,{item:a})&&t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(a.value),s=i.item.attr("aria-label")||a.value,s&&e.trim(s).length&&(this.liveRegion.children().hide(),e("<div>").text(s).appendTo(this.liveRegion)),void 0)},menuselect:function(t,i){var s=i.item.data("ui-autocomplete-item"),a=this.previous;this.element[0]!==e.ui.safeActiveElement(this.document[0])&&(this.element.trigger("focus"),this.previous=a,this._delay(function(){this.previous=a,this.selectedItem=s})),!1!==this._trigger("select",t,{item:s})&&this._value(s.value),this.term=this._value(),this.close(t),this.selectedItem=s}}),this.liveRegion=e("<div>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body),this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible"),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t),"source"===e&&this._initSource(),"appendTo"===e&&this.menu.element.appendTo(this._appendTo()),"disabled"===e&&t&&this.xhr&&this.xhr.abort()},_isEventTargetInWidget:function(t){var i=this.menu.element[0];return t.target===this.element[0]||t.target===i||e.contains(i,t.target)},_closeOnClickOutside:function(e){this._isEventTargetInWidget(e)||this.close()},_appendTo:function(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t&&t[0]||(t=this.element.closest(".ui-front, dialog")),t.length||(t=this.document[0].body),t},_initSource:function(){var t,i,s=this;e.isArray(this.options.source)?(t=this.options.source,this.source=function(i,s){s(e.ui.autocomplete.filter(t,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(t,a){s.xhr&&s.xhr.abort(),s.xhr=e.ajax({url:i,data:t,dataType:"json",success:function(e){a(e)},error:function(){a([])}})}):this.source=this.options.source},_searchTimeout:function(e){clearTimeout(this.searching),this.searching=this._delay(function(){var t=this.term===this._value(),i=this.menu.element.is(":visible"),s=e.altKey||e.ctrlKey||e.metaKey||e.shiftKey;(!t||t&&!i&&!s)&&(this.selectedItem=null,this.search(null,e))},this.options.delay)},search:function(e,t){return e=null!=e?e:this._value(),this.term=this._value(),e.length<this.options.minLength?this.close(t):this._trigger("search",t)!==!1?this._search(e):void 0},_search:function(e){this.pending++,this._addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response())},_response:function(){var t=++this.requestIndex;return e.proxy(function(e){t===this.requestIndex&&this.__response(e),this.pending--,this.pending||this._removeClass("ui-autocomplete-loading")},this)},__response:function(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):this._close()},close:function(e){this.cancelSearch=!0,this._close(e)},_close:function(e){this._off(this.document,"mousedown"),this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e))},_change:function(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem})},_normalize:function(t){return t.length&&t[0].label&&t[0].value?t:e.map(t,function(t){return"string"==typeof t?{label:t,value:t}:e.extend({},t,{label:t.label||t.value,value:t.value||t.label})})},_suggest:function(t){var i=this.menu.element.empty();this._renderMenu(i,t),this.isNewMenu=!0,this.menu.refresh(),i.show(),this._resizeMenu(),i.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next(),this._on(this.document,{mousedown:"_closeOnClickOutside"})},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(t,i){var s=this;e.each(i,function(e,i){s._renderItemData(t,i)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(t,i){return e("<li>").append(e("<div>").text(i.label)).appendTo(t)},_move:function(e,t){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)?(this.isMultiLine||this._value(this.term),this.menu.blur(),void 0):(this.menu[e](t),void 0):(this.search(null,t),void 0)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){(!this.isMultiLine||this.menu.element.is(":visible"))&&(this._move(e,t),t.preventDefault())},_isContentEditable:function(e){if(!e.length)return!1;var t=e.prop("contentEditable");return"inherit"===t?this._isContentEditable(e.parent()):"true"===t}}),e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,i){var s=RegExp(e.ui.autocomplete.escapeRegex(i),"i");return e.grep(t,function(e){return s.test(e.label||e.value||e)})}}),e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(t){var i;this._superApply(arguments),this.options.disabled||this.cancelSearch||(i=t&&t.length?this.options.messages.results(t.length):this.options.messages.noResults,this.liveRegion.children().hide(),e("<div>").text(i).appendTo(this.liveRegion))}}),e.ui.autocomplete;var d=/ui-corner-([a-z]){2,6}/g;e.widget("ui.controlgroup",{version:"1.12.1",defaultElement:"<div>",options:{direction:"horizontal",disabled:null,onlyVisible:!0,items:{button:"input[type=button], input[type=submit], input[type=reset], button, a",controlgroupLabel:".ui-controlgroup-label",checkboxradio:"input[type='checkbox'], input[type='radio']",selectmenu:"select",spinner:".ui-spinner-input"}},_create:function(){this._enhance()},_enhance:function(){this.element.attr("role","toolbar"),this.refresh()},_destroy:function(){this._callChildMethod("destroy"),this.childWidgets.removeData("ui-controlgroup-data"),this.element.removeAttr("role"),this.options.items.controlgroupLabel&&this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap()},_initWidgets:function(){var t=this,i=[];e.each(this.options.items,function(s,a){var n,r={};return a?"controlgroupLabel"===s?(n=t.element.find(a),n.each(function(){var t=e(this);t.children(".ui-controlgroup-label-contents").length||t.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>")}),t._addClass(n,null,"ui-widget ui-widget-content ui-state-default"),i=i.concat(n.get()),void 0):(e.fn[s]&&(r=t["_"+s+"Options"]?t["_"+s+"Options"]("middle"):{classes:{}},t.element.find(a).each(function(){var a=e(this),n=a[s]("instance"),o=e.widget.extend({},r);if("button"!==s||!a.parent(".ui-spinner").length){n||(n=a[s]()[s]("instance")),n&&(o.classes=t._resolveClassesValues(o.classes,n)),a[s](o);var h=a[s]("widget");e.data(h[0],"ui-controlgroup-data",n?n:a[s]("instance")),i.push(h[0])}})),void 0):void 0}),this.childWidgets=e(e.unique(i)),this._addClass(this.childWidgets,"ui-controlgroup-item")},_callChildMethod:function(t){this.childWidgets.each(function(){var i=e(this),s=i.data("ui-controlgroup-data");s&&s[t]&&s[t]()})},_updateCornerClass:function(e,t){var i="ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all",s=this._buildSimpleOptions(t,"label").classes.label;this._removeClass(e,null,i),this._addClass(e,null,s)},_buildSimpleOptions:function(e,t){var i="vertical"===this.options.direction,s={classes:{}};return s.classes[t]={middle:"",first:"ui-corner-"+(i?"top":"left"),last:"ui-corner-"+(i?"bottom":"right"),only:"ui-corner-all"}[e],s},_spinnerOptions:function(e){var t=this._buildSimpleOptions(e,"ui-spinner");return t.classes["ui-spinner-up"]="",t.classes["ui-spinner-down"]="",t},_buttonOptions:function(e){return this._buildSimpleOptions(e,"ui-button")},_checkboxradioOptions:function(e){return this._buildSimpleOptions(e,"ui-checkboxradio-label")},_selectmenuOptions:function(e){var t="vertical"===this.options.direction;return{width:t?"auto":!1,classes:{middle:{"ui-selectmenu-button-open":"","ui-selectmenu-button-closed":""},first:{"ui-selectmenu-button-open":"ui-corner-"+(t?"top":"tl"),"ui-selectmenu-button-closed":"ui-corner-"+(t?"top":"left")},last:{"ui-selectmenu-button-open":t?"":"ui-corner-tr","ui-selectmenu-button-closed":"ui-corner-"+(t?"bottom":"right")},only:{"ui-selectmenu-button-open":"ui-corner-top","ui-selectmenu-button-closed":"ui-corner-all"}}[e]}},_resolveClassesValues:function(t,i){var s={};return e.each(t,function(a){var n=i.options.classes[a]||"";n=e.trim(n.replace(d,"")),s[a]=(n+" "+t[a]).replace(/\s+/g," ")}),s},_setOption:function(e,t){return"direction"===e&&this._removeClass("ui-controlgroup-"+this.options.direction),this._super(e,t),"disabled"===e?(this._callChildMethod(t?"disable":"enable"),void 0):(this.refresh(),void 0)},refresh:function(){var t,i=this;this._addClass("ui-controlgroup ui-controlgroup-"+this.options.direction),"horizontal"===this.options.direction&&this._addClass(null,"ui-helper-clearfix"),this._initWidgets(),t=this.childWidgets,this.options.onlyVisible&&(t=t.filter(":visible")),t.length&&(e.each(["first","last"],function(e,s){var a=t[s]().data("ui-controlgroup-data");if(a&&i["_"+a.widgetName+"Options"]){var n=i["_"+a.widgetName+"Options"](1===t.length?"only":s);n.classes=i._resolveClassesValues(n.classes,a),a.element[a.widgetName](n)}else i._updateCornerClass(t[s](),s)}),this._callChildMethod("refresh"))}}),e.widget("ui.checkboxradio",[e.ui.formResetMixin,{version:"1.12.1",options:{disabled:null,label:null,icon:!0,classes:{"ui-checkboxradio-label":"ui-corner-all","ui-checkboxradio-icon":"ui-corner-all"}},_getCreateOptions:function(){var t,i,s=this,a=this._super()||{};return this._readType(),i=this.element.labels(),this.label=e(i[i.length-1]),this.label.length||e.error("No label found for checkboxradio widget"),this.originalLabel="",this.label.contents().not(this.element[0]).each(function(){s.originalLabel+=3===this.nodeType?e(this).text():this.outerHTML}),this.originalLabel&&(a.label=this.originalLabel),t=this.element[0].disabled,null!=t&&(a.disabled=t),a},_create:function(){var e=this.element[0].checked;this._bindFormResetHandler(),null==this.options.disabled&&(this.options.disabled=this.element[0].disabled),this._setOption("disabled",this.options.disabled),this._addClass("ui-checkboxradio","ui-helper-hidden-accessible"),this._addClass(this.label,"ui-checkboxradio-label","ui-button ui-widget"),"radio"===this.type&&this._addClass(this.label,"ui-checkboxradio-radio-label"),this.options.label&&this.options.label!==this.originalLabel?this._updateLabel():this.originalLabel&&(this.options.label=this.originalLabel),this._enhance(),e&&(this._addClass(this.label,"ui-checkboxradio-checked","ui-state-active"),this.icon&&this._addClass(this.icon,null,"ui-state-hover")),this._on({change:"_toggleClasses",focus:function(){this._addClass(this.label,null,"ui-state-focus ui-visual-focus")},blur:function(){this._removeClass(this.label,null,"ui-state-focus ui-visual-focus")}})},_readType:function(){var t=this.element[0].nodeName.toLowerCase();this.type=this.element[0].type,"input"===t&&/radio|checkbox/.test(this.type)||e.error("Can't create checkboxradio on element.nodeName="+t+" and element.type="+this.type)},_enhance:function(){this._updateIcon(this.element[0].checked)},widget:function(){return this.label},_getRadioGroup:function(){var t,i=this.element[0].name,s="input[name='"+e.ui.escapeSelector(i)+"']";return i?(t=this.form.length?e(this.form[0].elements).filter(s):e(s).filter(function(){return 0===e(this).form().length}),t.not(this.element)):e([])},_toggleClasses:function(){var t=this.element[0].checked;this._toggleClass(this.label,"ui-checkboxradio-checked","ui-state-active",t),this.options.icon&&"checkbox"===this.type&&this._toggleClass(this.icon,null,"ui-icon-check ui-state-checked",t)._toggleClass(this.icon,null,"ui-icon-blank",!t),"radio"===this.type&&this._getRadioGroup().each(function(){var t=e(this).checkboxradio("instance");t&&t._removeClass(t.label,"ui-checkboxradio-checked","ui-state-active")})},_destroy:function(){this._unbindFormResetHandler(),this.icon&&(this.icon.remove(),this.iconSpace.remove())},_setOption:function(e,t){return"label"!==e||t?(this._super(e,t),"disabled"===e?(this._toggleClass(this.label,null,"ui-state-disabled",t),this.element[0].disabled=t,void 0):(this.refresh(),void 0)):void 0},_updateIcon:function(t){var i="ui-icon ui-icon-background ";this.options.icon?(this.icon||(this.icon=e("<span>"),this.iconSpace=e("<span> </span>"),this._addClass(this.iconSpace,"ui-checkboxradio-icon-space")),"checkbox"===this.type?(i+=t?"ui-icon-check ui-state-checked":"ui-icon-blank",this._removeClass(this.icon,null,t?"ui-icon-blank":"ui-icon-check")):i+="ui-icon-blank",this._addClass(this.icon,"ui-checkboxradio-icon",i),t||this._removeClass(this.icon,null,"ui-icon-check ui-state-checked"),this.icon.prependTo(this.label).after(this.iconSpace)):void 0!==this.icon&&(this.icon.remove(),this.iconSpace.remove(),delete this.icon)
},_updateLabel:function(){var e=this.label.contents().not(this.element[0]);this.icon&&(e=e.not(this.icon[0])),this.iconSpace&&(e=e.not(this.iconSpace[0])),e.remove(),this.label.append(this.options.label)},refresh:function(){var e=this.element[0].checked,t=this.element[0].disabled;this._updateIcon(e),this._toggleClass(this.label,"ui-checkboxradio-checked","ui-state-active",e),null!==this.options.label&&this._updateLabel(),t!==this.options.disabled&&this._setOptions({disabled:t})}}]),e.ui.checkboxradio,e.widget("ui.button",{version:"1.12.1",defaultElement:"<button>",options:{classes:{"ui-button":"ui-corner-all"},disabled:null,icon:null,iconPosition:"beginning",label:null,showLabel:!0},_getCreateOptions:function(){var e,t=this._super()||{};return this.isInput=this.element.is("input"),e=this.element[0].disabled,null!=e&&(t.disabled=e),this.originalLabel=this.isInput?this.element.val():this.element.html(),this.originalLabel&&(t.label=this.originalLabel),t},_create:function(){!this.option.showLabel&!this.options.icon&&(this.options.showLabel=!0),null==this.options.disabled&&(this.options.disabled=this.element[0].disabled||!1),this.hasTitle=!!this.element.attr("title"),this.options.label&&this.options.label!==this.originalLabel&&(this.isInput?this.element.val(this.options.label):this.element.html(this.options.label)),this._addClass("ui-button","ui-widget"),this._setOption("disabled",this.options.disabled),this._enhance(),this.element.is("a")&&this._on({keyup:function(t){t.keyCode===e.ui.keyCode.SPACE&&(t.preventDefault(),this.element[0].click?this.element[0].click():this.element.trigger("click"))}})},_enhance:function(){this.element.is("button")||this.element.attr("role","button"),this.options.icon&&(this._updateIcon("icon",this.options.icon),this._updateTooltip())},_updateTooltip:function(){this.title=this.element.attr("title"),this.options.showLabel||this.title||this.element.attr("title",this.options.label)},_updateIcon:function(t,i){var s="iconPosition"!==t,a=s?this.options.iconPosition:i,n="top"===a||"bottom"===a;this.icon?s&&this._removeClass(this.icon,null,this.options.icon):(this.icon=e("<span>"),this._addClass(this.icon,"ui-button-icon","ui-icon"),this.options.showLabel||this._addClass("ui-button-icon-only")),s&&this._addClass(this.icon,null,i),this._attachIcon(a),n?(this._addClass(this.icon,null,"ui-widget-icon-block"),this.iconSpace&&this.iconSpace.remove()):(this.iconSpace||(this.iconSpace=e("<span> </span>"),this._addClass(this.iconSpace,"ui-button-icon-space")),this._removeClass(this.icon,null,"ui-wiget-icon-block"),this._attachIconSpace(a))},_destroy:function(){this.element.removeAttr("role"),this.icon&&this.icon.remove(),this.iconSpace&&this.iconSpace.remove(),this.hasTitle||this.element.removeAttr("title")},_attachIconSpace:function(e){this.icon[/^(?:end|bottom)/.test(e)?"before":"after"](this.iconSpace)},_attachIcon:function(e){this.element[/^(?:end|bottom)/.test(e)?"append":"prepend"](this.icon)},_setOptions:function(e){var t=void 0===e.showLabel?this.options.showLabel:e.showLabel,i=void 0===e.icon?this.options.icon:e.icon;t||i||(e.showLabel=!0),this._super(e)},_setOption:function(e,t){"icon"===e&&(t?this._updateIcon(e,t):this.icon&&(this.icon.remove(),this.iconSpace&&this.iconSpace.remove())),"iconPosition"===e&&this._updateIcon(e,t),"showLabel"===e&&(this._toggleClass("ui-button-icon-only",null,!t),this._updateTooltip()),"label"===e&&(this.isInput?this.element.val(t):(this.element.html(t),this.icon&&(this._attachIcon(this.options.iconPosition),this._attachIconSpace(this.options.iconPosition)))),this._super(e,t),"disabled"===e&&(this._toggleClass(null,"ui-state-disabled",t),this.element[0].disabled=t,t&&this.element.blur())},refresh:function(){var e=this.element.is("input, button")?this.element[0].disabled:this.element.hasClass("ui-button-disabled");e!==this.options.disabled&&this._setOptions({disabled:e}),this._updateTooltip()}}),e.uiBackCompat!==!1&&(e.widget("ui.button",e.ui.button,{options:{text:!0,icons:{primary:null,secondary:null}},_create:function(){this.options.showLabel&&!this.options.text&&(this.options.showLabel=this.options.text),!this.options.showLabel&&this.options.text&&(this.options.text=this.options.showLabel),this.options.icon||!this.options.icons.primary&&!this.options.icons.secondary?this.options.icon&&(this.options.icons.primary=this.options.icon):this.options.icons.primary?this.options.icon=this.options.icons.primary:(this.options.icon=this.options.icons.secondary,this.options.iconPosition="end"),this._super()},_setOption:function(e,t){return"text"===e?(this._super("showLabel",t),void 0):("showLabel"===e&&(this.options.text=t),"icon"===e&&(this.options.icons.primary=t),"icons"===e&&(t.primary?(this._super("icon",t.primary),this._super("iconPosition","beginning")):t.secondary&&(this._super("icon",t.secondary),this._super("iconPosition","end"))),this._superApply(arguments),void 0)}}),e.fn.button=function(t){return function(){return!this.length||this.length&&"INPUT"!==this[0].tagName||this.length&&"INPUT"===this[0].tagName&&"checkbox"!==this.attr("type")&&"radio"!==this.attr("type")?t.apply(this,arguments):(e.ui.checkboxradio||e.error("Checkboxradio widget missing"),0===arguments.length?this.checkboxradio({icon:!1}):this.checkboxradio.apply(this,arguments))}}(e.fn.button),e.fn.buttonset=function(){return e.ui.controlgroup||e.error("Controlgroup widget missing"),"option"===arguments[0]&&"items"===arguments[1]&&arguments[2]?this.controlgroup.apply(this,[arguments[0],"items.button",arguments[2]]):"option"===arguments[0]&&"items"===arguments[1]?this.controlgroup.apply(this,[arguments[0],"items.button"]):("object"==typeof arguments[0]&&arguments[0].items&&(arguments[0].items={button:arguments[0].items}),this.controlgroup.apply(this,arguments))}),e.ui.button,e.extend(e.ui,{datepicker:{version:"1.12.1"}});var p;e.extend(s.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(e){return r(this._defaults,e||{}),this},_attachDatepicker:function(t,i){var s,a,n;s=t.nodeName.toLowerCase(),a="div"===s||"span"===s,t.id||(this.uuid+=1,t.id="dp"+this.uuid),n=this._newInst(e(t),a),n.settings=e.extend({},i||{}),"input"===s?this._connectDatepicker(t,n):a&&this._inlineDatepicker(t,n)},_newInst:function(t,i){var s=t[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");return{id:s,input:t,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:i,dpDiv:i?a(e("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},_connectDatepicker:function(t,i){var s=e(t);i.append=e([]),i.trigger=e([]),s.hasClass(this.markerClassName)||(this._attachments(s,i),s.addClass(this.markerClassName).on("keydown",this._doKeyDown).on("keypress",this._doKeyPress).on("keyup",this._doKeyUp),this._autoSize(i),e.data(t,"datepicker",i),i.settings.disabled&&this._disableDatepicker(t))},_attachments:function(t,i){var s,a,n,r=this._get(i,"appendText"),o=this._get(i,"isRTL");i.append&&i.append.remove(),r&&(i.append=e("<span class='"+this._appendClass+"'>"+r+"</span>"),t[o?"before":"after"](i.append)),t.off("focus",this._showDatepicker),i.trigger&&i.trigger.remove(),s=this._get(i,"showOn"),("focus"===s||"both"===s)&&t.on("focus",this._showDatepicker),("button"===s||"both"===s)&&(a=this._get(i,"buttonText"),n=this._get(i,"buttonImage"),i.trigger=e(this._get(i,"buttonImageOnly")?e("<img/>").addClass(this._triggerClass).attr({src:n,alt:a,title:a}):e("<button type='button'></button>").addClass(this._triggerClass).html(n?e("<img/>").attr({src:n,alt:a,title:a}):a)),t[o?"before":"after"](i.trigger),i.trigger.on("click",function(){return e.datepicker._datepickerShowing&&e.datepicker._lastInput===t[0]?e.datepicker._hideDatepicker():e.datepicker._datepickerShowing&&e.datepicker._lastInput!==t[0]?(e.datepicker._hideDatepicker(),e.datepicker._showDatepicker(t[0])):e.datepicker._showDatepicker(t[0]),!1}))},_autoSize:function(e){if(this._get(e,"autoSize")&&!e.inline){var t,i,s,a,n=new Date(2009,11,20),r=this._get(e,"dateFormat");r.match(/[DM]/)&&(t=function(e){for(i=0,s=0,a=0;e.length>a;a++)e[a].length>i&&(i=e[a].length,s=a);return s},n.setMonth(t(this._get(e,r.match(/MM/)?"monthNames":"monthNamesShort"))),n.setDate(t(this._get(e,r.match(/DD/)?"dayNames":"dayNamesShort"))+20-n.getDay())),e.input.attr("size",this._formatDate(e,n).length)}},_inlineDatepicker:function(t,i){var s=e(t);s.hasClass(this.markerClassName)||(s.addClass(this.markerClassName).append(i.dpDiv),e.data(t,"datepicker",i),this._setDate(i,this._getDefaultDate(i),!0),this._updateDatepicker(i),this._updateAlternate(i),i.settings.disabled&&this._disableDatepicker(t),i.dpDiv.css("display","block"))},_dialogDatepicker:function(t,i,s,a,n){var o,h,l,u,c,d=this._dialogInst;return d||(this.uuid+=1,o="dp"+this.uuid,this._dialogInput=e("<input type='text' id='"+o+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.on("keydown",this._doKeyDown),e("body").append(this._dialogInput),d=this._dialogInst=this._newInst(this._dialogInput,!1),d.settings={},e.data(this._dialogInput[0],"datepicker",d)),r(d.settings,a||{}),i=i&&i.constructor===Date?this._formatDate(d,i):i,this._dialogInput.val(i),this._pos=n?n.length?n:[n.pageX,n.pageY]:null,this._pos||(h=document.documentElement.clientWidth,l=document.documentElement.clientHeight,u=document.documentElement.scrollLeft||document.body.scrollLeft,c=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[h/2-100+u,l/2-150+c]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),d.settings.onSelect=s,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),e.blockUI&&e.blockUI(this.dpDiv),e.data(this._dialogInput[0],"datepicker",d),this},_destroyDatepicker:function(t){var i,s=e(t),a=e.data(t,"datepicker");s.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),e.removeData(t,"datepicker"),"input"===i?(a.append.remove(),a.trigger.remove(),s.removeClass(this.markerClassName).off("focus",this._showDatepicker).off("keydown",this._doKeyDown).off("keypress",this._doKeyPress).off("keyup",this._doKeyUp)):("div"===i||"span"===i)&&s.removeClass(this.markerClassName).empty(),p===a&&(p=null))},_enableDatepicker:function(t){var i,s,a=e(t),n=e.data(t,"datepicker");a.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),"input"===i?(t.disabled=!1,n.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""})):("div"===i||"span"===i)&&(s=a.children("."+this._inlineClass),s.children().removeClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e}))},_disableDatepicker:function(t){var i,s,a=e(t),n=e.data(t,"datepicker");a.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),"input"===i?(t.disabled=!0,n.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"})):("div"===i||"span"===i)&&(s=a.children("."+this._inlineClass),s.children().addClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e}),this._disabledInputs[this._disabledInputs.length]=t)},_isDisabledDatepicker:function(e){if(!e)return!1;for(var t=0;this._disabledInputs.length>t;t++)if(this._disabledInputs[t]===e)return!0;return!1},_getInst:function(t){try{return e.data(t,"datepicker")}catch(i){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(t,i,s){var a,n,o,h,l=this._getInst(t);return 2===arguments.length&&"string"==typeof i?"defaults"===i?e.extend({},e.datepicker._defaults):l?"all"===i?e.extend({},l.settings):this._get(l,i):null:(a=i||{},"string"==typeof i&&(a={},a[i]=s),l&&(this._curInst===l&&this._hideDatepicker(),n=this._getDateDatepicker(t,!0),o=this._getMinMaxDate(l,"min"),h=this._getMinMaxDate(l,"max"),r(l.settings,a),null!==o&&void 0!==a.dateFormat&&void 0===a.minDate&&(l.settings.minDate=this._formatDate(l,o)),null!==h&&void 0!==a.dateFormat&&void 0===a.maxDate&&(l.settings.maxDate=this._formatDate(l,h)),"disabled"in a&&(a.disabled?this._disableDatepicker(t):this._enableDatepicker(t)),this._attachments(e(t),l),this._autoSize(l),this._setDate(l,n),this._updateAlternate(l),this._updateDatepicker(l)),void 0)},_changeDatepicker:function(e,t,i){this._optionDatepicker(e,t,i)},_refreshDatepicker:function(e){var t=this._getInst(e);t&&this._updateDatepicker(t)},_setDateDatepicker:function(e,t){var i=this._getInst(e);i&&(this._setDate(i,t),this._updateDatepicker(i),this._updateAlternate(i))},_getDateDatepicker:function(e,t){var i=this._getInst(e);return i&&!i.inline&&this._setDateFromField(i,t),i?this._getDate(i):null},_doKeyDown:function(t){var i,s,a,n=e.datepicker._getInst(t.target),r=!0,o=n.dpDiv.is(".ui-datepicker-rtl");if(n._keyEvent=!0,e.datepicker._datepickerShowing)switch(t.keyCode){case 9:e.datepicker._hideDatepicker(),r=!1;break;case 13:return a=e("td."+e.datepicker._dayOverClass+":not(."+e.datepicker._currentClass+")",n.dpDiv),a[0]&&e.datepicker._selectDay(t.target,n.selectedMonth,n.selectedYear,a[0]),i=e.datepicker._get(n,"onSelect"),i?(s=e.datepicker._formatDate(n),i.apply(n.input?n.input[0]:null,[s,n])):e.datepicker._hideDatepicker(),!1;case 27:e.datepicker._hideDatepicker();break;case 33:e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(n,"stepBigMonths"):-e.datepicker._get(n,"stepMonths"),"M");break;case 34:e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(n,"stepBigMonths"):+e.datepicker._get(n,"stepMonths"),"M");break;case 35:(t.ctrlKey||t.metaKey)&&e.datepicker._clearDate(t.target),r=t.ctrlKey||t.metaKey;break;case 36:(t.ctrlKey||t.metaKey)&&e.datepicker._gotoToday(t.target),r=t.ctrlKey||t.metaKey;break;case 37:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,o?1:-1,"D"),r=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(n,"stepBigMonths"):-e.datepicker._get(n,"stepMonths"),"M");break;case 38:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,-7,"D"),r=t.ctrlKey||t.metaKey;break;case 39:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,o?-1:1,"D"),r=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(n,"stepBigMonths"):+e.datepicker._get(n,"stepMonths"),"M");break;case 40:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,7,"D"),r=t.ctrlKey||t.metaKey;break;default:r=!1}else 36===t.keyCode&&t.ctrlKey?e.datepicker._showDatepicker(this):r=!1;r&&(t.preventDefault(),t.stopPropagation())},_doKeyPress:function(t){var i,s,a=e.datepicker._getInst(t.target);return e.datepicker._get(a,"constrainInput")?(i=e.datepicker._possibleChars(e.datepicker._get(a,"dateFormat")),s=String.fromCharCode(null==t.charCode?t.keyCode:t.charCode),t.ctrlKey||t.metaKey||" ">s||!i||i.indexOf(s)>-1):void 0},_doKeyUp:function(t){var i,s=e.datepicker._getInst(t.target);if(s.input.val()!==s.lastVal)try{i=e.datepicker.parseDate(e.datepicker._get(s,"dateFormat"),s.input?s.input.val():null,e.datepicker._getFormatConfig(s)),i&&(e.datepicker._setDateFromField(s),e.datepicker._updateAlternate(s),e.datepicker._updateDatepicker(s))}catch(a){}return!0},_showDatepicker:function(t){if(t=t.target||t,"input"!==t.nodeName.toLowerCase()&&(t=e("input",t.parentNode)[0]),!e.datepicker._isDisabledDatepicker(t)&&e.datepicker._lastInput!==t){var s,a,n,o,h,l,u;s=e.datepicker._getInst(t),e.datepicker._curInst&&e.datepicker._curInst!==s&&(e.datepicker._curInst.dpDiv.stop(!0,!0),s&&e.datepicker._datepickerShowing&&e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])),a=e.datepicker._get(s,"beforeShow"),n=a?a.apply(t,[t,s]):{},n!==!1&&(r(s.settings,n),s.lastVal=null,e.datepicker._lastInput=t,e.datepicker._setDateFromField(s),e.datepicker._inDialog&&(t.value=""),e.datepicker._pos||(e.datepicker._pos=e.datepicker._findPos(t),e.datepicker._pos[1]+=t.offsetHeight),o=!1,e(t).parents().each(function(){return o|="fixed"===e(this).css("position"),!o}),h={left:e.datepicker._pos[0],top:e.datepicker._pos[1]},e.datepicker._pos=null,s.dpDiv.empty(),s.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),e.datepicker._updateDatepicker(s),h=e.datepicker._checkOffset(s,h,o),s.dpDiv.css({position:e.datepicker._inDialog&&e.blockUI?"static":o?"fixed":"absolute",display:"none",left:h.left+"px",top:h.top+"px"}),s.inline||(l=e.datepicker._get(s,"showAnim"),u=e.datepicker._get(s,"duration"),s.dpDiv.css("z-index",i(e(t))+1),e.datepicker._datepickerShowing=!0,e.effects&&e.effects.effect[l]?s.dpDiv.show(l,e.datepicker._get(s,"showOptions"),u):s.dpDiv[l||"show"](l?u:null),e.datepicker._shouldFocusInput(s)&&s.input.trigger("focus"),e.datepicker._curInst=s))}},_updateDatepicker:function(t){this.maxRows=4,p=t,t.dpDiv.empty().append(this._generateHTML(t)),this._attachHandlers(t);var i,s=this._getNumberOfMonths(t),a=s[1],r=17,o=t.dpDiv.find("."+this._dayOverClass+" a");o.length>0&&n.apply(o.get(0)),t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),a>1&&t.dpDiv.addClass("ui-datepicker-multi-"+a).css("width",r*a+"em"),t.dpDiv[(1!==s[0]||1!==s[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),t.dpDiv[(this._get(t,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),t===e.datepicker._curInst&&e.datepicker._datepickerShowing&&e.datepicker._shouldFocusInput(t)&&t.input.trigger("focus"),t.yearshtml&&(i=t.yearshtml,setTimeout(function(){i===t.yearshtml&&t.yearshtml&&t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml),i=t.yearshtml=null},0))},_shouldFocusInput:function(e){return e.input&&e.input.is(":visible")&&!e.input.is(":disabled")&&!e.input.is(":focus")},_checkOffset:function(t,i,s){var a=t.dpDiv.outerWidth(),n=t.dpDiv.outerHeight(),r=t.input?t.input.outerWidth():0,o=t.input?t.input.outerHeight():0,h=document.documentElement.clientWidth+(s?0:e(document).scrollLeft()),l=document.documentElement.clientHeight+(s?0:e(document).scrollTop());return i.left-=this._get(t,"isRTL")?a-r:0,i.left-=s&&i.left===t.input.offset().left?e(document).scrollLeft():0,i.top-=s&&i.top===t.input.offset().top+o?e(document).scrollTop():0,i.left-=Math.min(i.left,i.left+a>h&&h>a?Math.abs(i.left+a-h):0),i.top-=Math.min(i.top,i.top+n>l&&l>n?Math.abs(n+o):0),i},_findPos:function(t){for(var i,s=this._getInst(t),a=this._get(s,"isRTL");t&&("hidden"===t.type||1!==t.nodeType||e.expr.filters.hidden(t));)t=t[a?"previousSibling":"nextSibling"];return i=e(t).offset(),[i.left,i.top]},_hideDatepicker:function(t){var i,s,a,n,r=this._curInst;!r||t&&r!==e.data(t,"datepicker")||this._datepickerShowing&&(i=this._get(r,"showAnim"),s=this._get(r,"duration"),a=function(){e.datepicker._tidyDialog(r)},e.effects&&(e.effects.effect[i]||e.effects[i])?r.dpDiv.hide(i,e.datepicker._get(r,"showOptions"),s,a):r.dpDiv["slideDown"===i?"slideUp":"fadeIn"===i?"fadeOut":"hide"](i?s:null,a),i||a(),this._datepickerShowing=!1,n=this._get(r,"onClose"),n&&n.apply(r.input?r.input[0]:null,[r.input?r.input.val():"",r]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),e.blockUI&&(e.unblockUI(),e("body").append(this.dpDiv))),this._inDialog=!1)},_tidyDialog:function(e){e.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar")},_checkExternalClick:function(t){if(e.datepicker._curInst){var i=e(t.target),s=e.datepicker._getInst(i[0]);(i[0].id!==e.datepicker._mainDivId&&0===i.parents("#"+e.datepicker._mainDivId).length&&!i.hasClass(e.datepicker.markerClassName)&&!i.closest("."+e.datepicker._triggerClass).length&&e.datepicker._datepickerShowing&&(!e.datepicker._inDialog||!e.blockUI)||i.hasClass(e.datepicker.markerClassName)&&e.datepicker._curInst!==s)&&e.datepicker._hideDatepicker()}},_adjustDate:function(t,i,s){var a=e(t),n=this._getInst(a[0]);this._isDisabledDatepicker(a[0])||(this._adjustInstDate(n,i+("M"===s?this._get(n,"showCurrentAtPos"):0),s),this._updateDatepicker(n))},_gotoToday:function(t){var i,s=e(t),a=this._getInst(s[0]);this._get(a,"gotoCurrent")&&a.currentDay?(a.selectedDay=a.currentDay,a.drawMonth=a.selectedMonth=a.currentMonth,a.drawYear=a.selectedYear=a.currentYear):(i=new Date,a.selectedDay=i.getDate(),a.drawMonth=a.selectedMonth=i.getMonth(),a.drawYear=a.selectedYear=i.getFullYear()),this._notifyChange(a),this._adjustDate(s)},_selectMonthYear:function(t,i,s){var a=e(t),n=this._getInst(a[0]);n["selected"+("M"===s?"Month":"Year")]=n["draw"+("M"===s?"Month":"Year")]=parseInt(i.options[i.selectedIndex].value,10),this._notifyChange(n),this._adjustDate(a)},_selectDay:function(t,i,s,a){var n,r=e(t);e(a).hasClass(this._unselectableClass)||this._isDisabledDatepicker(r[0])||(n=this._getInst(r[0]),n.selectedDay=n.currentDay=e("a",a).html(),n.selectedMonth=n.currentMonth=i,n.selectedYear=n.currentYear=s,this._selectDate(t,this._formatDate(n,n.currentDay,n.currentMonth,n.currentYear)))},_clearDate:function(t){var i=e(t);this._selectDate(i,"")},_selectDate:function(t,i){var s,a=e(t),n=this._getInst(a[0]);i=null!=i?i:this._formatDate(n),n.input&&n.input.val(i),this._updateAlternate(n),s=this._get(n,"onSelect"),s?s.apply(n.input?n.input[0]:null,[i,n]):n.input&&n.input.trigger("change"),n.inline?this._updateDatepicker(n):(this._hideDatepicker(),this._lastInput=n.input[0],"object"!=typeof n.input[0]&&n.input.trigger("focus"),this._lastInput=null)},_updateAlternate:function(t){var i,s,a,n=this._get(t,"altField");n&&(i=this._get(t,"altFormat")||this._get(t,"dateFormat"),s=this._getDate(t),a=this.formatDate(i,s,this._getFormatConfig(t)),e(n).val(a))},noWeekends:function(e){var t=e.getDay();return[t>0&&6>t,""]},iso8601Week:function(e){var t,i=new Date(e.getTime());return i.setDate(i.getDate()+4-(i.getDay()||7)),t=i.getTime(),i.setMonth(0),i.setDate(1),Math.floor(Math.round((t-i)/864e5)/7)+1},parseDate:function(t,i,s){if(null==t||null==i)throw"Invalid arguments";if(i="object"==typeof i?""+i:i+"",""===i)return null;var a,n,r,o,h=0,l=(s?s.shortYearCutoff:null)||this._defaults.shortYearCutoff,u="string"!=typeof l?l:(new Date).getFullYear()%100+parseInt(l,10),c=(s?s.dayNamesShort:null)||this._defaults.dayNamesShort,d=(s?s.dayNames:null)||this._defaults.dayNames,p=(s?s.monthNamesShort:null)||this._defaults.monthNamesShort,f=(s?s.monthNames:null)||this._defaults.monthNames,m=-1,g=-1,v=-1,y=-1,_=!1,b=function(e){var i=t.length>a+1&&t.charAt(a+1)===e;return i&&a++,i},x=function(e){var t=b(e),s="@"===e?14:"!"===e?20:"y"===e&&t?4:"o"===e?3:2,a="y"===e?s:1,n=RegExp("^\\d{"+a+","+s+"}"),r=i.substring(h).match(n);if(!r)throw"Missing number at position "+h;return h+=r[0].length,parseInt(r[0],10)},k=function(t,s,a){var n=-1,r=e.map(b(t)?a:s,function(e,t){return[[t,e]]}).sort(function(e,t){return-(e[1].length-t[1].length)});if(e.each(r,function(e,t){var s=t[1];return i.substr(h,s.length).toLowerCase()===s.toLowerCase()?(n=t[0],h+=s.length,!1):void 0}),-1!==n)return n+1;throw"Unknown name at position "+h},w=function(){if(i.charAt(h)!==t.charAt(a))throw"Unexpected literal at position "+h;h++};for(a=0;t.length>a;a++)if(_)"'"!==t.charAt(a)||b("'")?w():_=!1;else switch(t.charAt(a)){case"d":v=x("d");break;case"D":k("D",c,d);break;case"o":y=x("o");break;case"m":g=x("m");break;case"M":g=k("M",p,f);break;case"y":m=x("y");break;case"@":o=new Date(x("@")),m=o.getFullYear(),g=o.getMonth()+1,v=o.getDate();break;case"!":o=new Date((x("!")-this._ticksTo1970)/1e4),m=o.getFullYear(),g=o.getMonth()+1,v=o.getDate();break;case"'":b("'")?w():_=!0;break;default:w()}if(i.length>h&&(r=i.substr(h),!/^\s+/.test(r)))throw"Extra/unparsed characters found in date: "+r;if(-1===m?m=(new Date).getFullYear():100>m&&(m+=(new Date).getFullYear()-(new Date).getFullYear()%100+(u>=m?0:-100)),y>-1)for(g=1,v=y;;){if(n=this._getDaysInMonth(m,g-1),n>=v)break;g++,v-=n}if(o=this._daylightSavingAdjust(new Date(m,g-1,v)),o.getFullYear()!==m||o.getMonth()+1!==g||o.getDate()!==v)throw"Invalid date";return o},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:1e7*60*60*24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925)),formatDate:function(e,t,i){if(!t)return"";var s,a=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,n=(i?i.dayNames:null)||this._defaults.dayNames,r=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,o=(i?i.monthNames:null)||this._defaults.monthNames,h=function(t){var i=e.length>s+1&&e.charAt(s+1)===t;return i&&s++,i},l=function(e,t,i){var s=""+t;if(h(e))for(;i>s.length;)s="0"+s;return s},u=function(e,t,i,s){return h(e)?s[t]:i[t]},c="",d=!1;if(t)for(s=0;e.length>s;s++)if(d)"'"!==e.charAt(s)||h("'")?c+=e.charAt(s):d=!1;else switch(e.charAt(s)){case"d":c+=l("d",t.getDate(),2);break;case"D":c+=u("D",t.getDay(),a,n);break;case"o":c+=l("o",Math.round((new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime()-new Date(t.getFullYear(),0,0).getTime())/864e5),3);break;case"m":c+=l("m",t.getMonth()+1,2);break;case"M":c+=u("M",t.getMonth(),r,o);break;case"y":c+=h("y")?t.getFullYear():(10>t.getFullYear()%100?"0":"")+t.getFullYear()%100;break;case"@":c+=t.getTime();break;case"!":c+=1e4*t.getTime()+this._ticksTo1970;break;case"'":h("'")?c+="'":d=!0;break;default:c+=e.charAt(s)}return c},_possibleChars:function(e){var t,i="",s=!1,a=function(i){var s=e.length>t+1&&e.charAt(t+1)===i;return s&&t++,s};for(t=0;e.length>t;t++)if(s)"'"!==e.charAt(t)||a("'")?i+=e.charAt(t):s=!1;else switch(e.charAt(t)){case"d":case"m":case"y":case"@":i+="0123456789";break;case"D":case"M":return null;case"'":a("'")?i+="'":s=!0;break;default:i+=e.charAt(t)}return i},_get:function(e,t){return void 0!==e.settings[t]?e.settings[t]:this._defaults[t]},_setDateFromField:function(e,t){if(e.input.val()!==e.lastVal){var i=this._get(e,"dateFormat"),s=e.lastVal=e.input?e.input.val():null,a=this._getDefaultDate(e),n=a,r=this._getFormatConfig(e);try{n=this.parseDate(i,s,r)||a}catch(o){s=t?"":s}e.selectedDay=n.getDate(),e.drawMonth=e.selectedMonth=n.getMonth(),e.drawYear=e.selectedYear=n.getFullYear(),e.currentDay=s?n.getDate():0,e.currentMonth=s?n.getMonth():0,e.currentYear=s?n.getFullYear():0,this._adjustInstDate(e)}},_getDefaultDate:function(e){return this._restrictMinMax(e,this._determineDate(e,this._get(e,"defaultDate"),new Date))},_determineDate:function(t,i,s){var a=function(e){var t=new Date;return t.setDate(t.getDate()+e),t},n=function(i){try{return e.datepicker.parseDate(e.datepicker._get(t,"dateFormat"),i,e.datepicker._getFormatConfig(t))}catch(s){}for(var a=(i.toLowerCase().match(/^c/)?e.datepicker._getDate(t):null)||new Date,n=a.getFullYear(),r=a.getMonth(),o=a.getDate(),h=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,l=h.exec(i);l;){switch(l[2]||"d"){case"d":case"D":o+=parseInt(l[1],10);break;case"w":case"W":o+=7*parseInt(l[1],10);break;case"m":case"M":r+=parseInt(l[1],10),o=Math.min(o,e.datepicker._getDaysInMonth(n,r));break;case"y":case"Y":n+=parseInt(l[1],10),o=Math.min(o,e.datepicker._getDaysInMonth(n,r))}l=h.exec(i)}return new Date(n,r,o)},r=null==i||""===i?s:"string"==typeof i?n(i):"number"==typeof i?isNaN(i)?s:a(i):new Date(i.getTime());return r=r&&"Invalid Date"==""+r?s:r,r&&(r.setHours(0),r.setMinutes(0),r.setSeconds(0),r.setMilliseconds(0)),this._daylightSavingAdjust(r)},_daylightSavingAdjust:function(e){return e?(e.setHours(e.getHours()>12?e.getHours()+2:0),e):null},_setDate:function(e,t,i){var s=!t,a=e.selectedMonth,n=e.selectedYear,r=this._restrictMinMax(e,this._determineDate(e,t,new Date));e.selectedDay=e.currentDay=r.getDate(),e.drawMonth=e.selectedMonth=e.currentMonth=r.getMonth(),e.drawYear=e.selectedYear=e.currentYear=r.getFullYear(),a===e.selectedMonth&&n===e.selectedYear||i||this._notifyChange(e),this._adjustInstDate(e),e.input&&e.input.val(s?"":this._formatDate(e))},_getDate:function(e){var t=!e.currentYear||e.input&&""===e.input.val()?null:this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return t},_attachHandlers:function(t){var i=this._get(t,"stepMonths"),s="#"+t.id.replace(/\\\\/g,"\\");t.dpDiv.find("[data-handler]").map(function(){var t={prev:function(){e.datepicker._adjustDate(s,-i,"M")},next:function(){e.datepicker._adjustDate(s,+i,"M")},hide:function(){e.datepicker._hideDatepicker()},today:function(){e.datepicker._gotoToday(s)},selectDay:function(){return e.datepicker._selectDay(s,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return e.datepicker._selectMonthYear(s,this,"M"),!1},selectYear:function(){return e.datepicker._selectMonthYear(s,this,"Y"),!1}};e(this).on(this.getAttribute("data-event"),t[this.getAttribute("data-handler")])})},_generateHTML:function(e){var t,i,s,a,n,r,o,h,l,u,c,d,p,f,m,g,v,y,_,b,x,k,w,D,T,S,M,N,C,A,P,I,H,z,F,j,E,O,L,W=new Date,R=this._daylightSavingAdjust(new Date(W.getFullYear(),W.getMonth(),W.getDate())),Y=this._get(e,"isRTL"),J=this._get(e,"showButtonPanel"),B=this._get(e,"hideIfNoPrevNext"),Q=this._get(e,"navigationAsDateFormat"),K=this._getNumberOfMonths(e),V=this._get(e,"showCurrentAtPos"),q=this._get(e,"stepMonths"),U=1!==K[0]||1!==K[1],$=this._daylightSavingAdjust(e.currentDay?new Date(e.currentYear,e.currentMonth,e.currentDay):new Date(9999,9,9)),G=this._getMinMaxDate(e,"min"),X=this._getMinMaxDate(e,"max"),Z=e.drawMonth-V,et=e.drawYear;if(0>Z&&(Z+=12,et--),X)for(t=this._daylightSavingAdjust(new Date(X.getFullYear(),X.getMonth()-K[0]*K[1]+1,X.getDate())),t=G&&G>t?G:t;this._daylightSavingAdjust(new Date(et,Z,1))>t;)Z--,0>Z&&(Z=11,et--);for(e.drawMonth=Z,e.drawYear=et,i=this._get(e,"prevText"),i=Q?this.formatDate(i,this._daylightSavingAdjust(new Date(et,Z-q,1)),this._getFormatConfig(e)):i,s=this._canAdjustMonth(e,-1,et,Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>":B?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>",a=this._get(e,"nextText"),a=Q?this.formatDate(a,this._daylightSavingAdjust(new Date(et,Z+q,1)),this._getFormatConfig(e)):a,n=this._canAdjustMonth(e,1,et,Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+a+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+a+"</span></a>":B?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+a+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+a+"</span></a>",r=this._get(e,"currentText"),o=this._get(e,"gotoCurrent")&&e.currentDay?$:R,r=Q?this.formatDate(r,o,this._getFormatConfig(e)):r,h=e.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(e,"closeText")+"</button>",l=J?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(Y?h:"")+(this._isInRange(e,o)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+r+"</button>":"")+(Y?"":h)+"</div>":"",u=parseInt(this._get(e,"firstDay"),10),u=isNaN(u)?0:u,c=this._get(e,"showWeek"),d=this._get(e,"dayNames"),p=this._get(e,"dayNamesMin"),f=this._get(e,"monthNames"),m=this._get(e,"monthNamesShort"),g=this._get(e,"beforeShowDay"),v=this._get(e,"showOtherMonths"),y=this._get(e,"selectOtherMonths"),_=this._getDefaultDate(e),b="",k=0;K[0]>k;k++){for(w="",this.maxRows=4,D=0;K[1]>D;D++){if(T=this._daylightSavingAdjust(new Date(et,Z,e.selectedDay)),S=" ui-corner-all",M="",U){if(M+="<div class='ui-datepicker-group",K[1]>1)switch(D){case 0:M+=" ui-datepicker-group-first",S=" ui-corner-"+(Y?"right":"left");
break;case K[1]-1:M+=" ui-datepicker-group-last",S=" ui-corner-"+(Y?"left":"right");break;default:M+=" ui-datepicker-group-middle",S=""}M+="'>"}for(M+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+S+"'>"+(/all|left/.test(S)&&0===k?Y?n:s:"")+(/all|right/.test(S)&&0===k?Y?s:n:"")+this._generateMonthYearHeader(e,Z,et,G,X,k>0||D>0,f,m)+"</div><table class='ui-datepicker-calendar'><thead>"+"<tr>",N=c?"<th class='ui-datepicker-week-col'>"+this._get(e,"weekHeader")+"</th>":"",x=0;7>x;x++)C=(x+u)%7,N+="<th scope='col'"+((x+u+6)%7>=5?" class='ui-datepicker-week-end'":"")+">"+"<span title='"+d[C]+"'>"+p[C]+"</span></th>";for(M+=N+"</tr></thead><tbody>",A=this._getDaysInMonth(et,Z),et===e.selectedYear&&Z===e.selectedMonth&&(e.selectedDay=Math.min(e.selectedDay,A)),P=(this._getFirstDayOfMonth(et,Z)-u+7)%7,I=Math.ceil((P+A)/7),H=U?this.maxRows>I?this.maxRows:I:I,this.maxRows=H,z=this._daylightSavingAdjust(new Date(et,Z,1-P)),F=0;H>F;F++){for(M+="<tr>",j=c?"<td class='ui-datepicker-week-col'>"+this._get(e,"calculateWeek")(z)+"</td>":"",x=0;7>x;x++)E=g?g.apply(e.input?e.input[0]:null,[z]):[!0,""],O=z.getMonth()!==Z,L=O&&!y||!E[0]||G&&G>z||X&&z>X,j+="<td class='"+((x+u+6)%7>=5?" ui-datepicker-week-end":"")+(O?" ui-datepicker-other-month":"")+(z.getTime()===T.getTime()&&Z===e.selectedMonth&&e._keyEvent||_.getTime()===z.getTime()&&_.getTime()===T.getTime()?" "+this._dayOverClass:"")+(L?" "+this._unselectableClass+" ui-state-disabled":"")+(O&&!v?"":" "+E[1]+(z.getTime()===$.getTime()?" "+this._currentClass:"")+(z.getTime()===R.getTime()?" ui-datepicker-today":""))+"'"+(O&&!v||!E[2]?"":" title='"+E[2].replace(/'/g,"&#39;")+"'")+(L?"":" data-handler='selectDay' data-event='click' data-month='"+z.getMonth()+"' data-year='"+z.getFullYear()+"'")+">"+(O&&!v?"&#xa0;":L?"<span class='ui-state-default'>"+z.getDate()+"</span>":"<a class='ui-state-default"+(z.getTime()===R.getTime()?" ui-state-highlight":"")+(z.getTime()===$.getTime()?" ui-state-active":"")+(O?" ui-priority-secondary":"")+"' href='#'>"+z.getDate()+"</a>")+"</td>",z.setDate(z.getDate()+1),z=this._daylightSavingAdjust(z);M+=j+"</tr>"}Z++,Z>11&&(Z=0,et++),M+="</tbody></table>"+(U?"</div>"+(K[0]>0&&D===K[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),w+=M}b+=w}return b+=l,e._keyEvent=!1,b},_generateMonthYearHeader:function(e,t,i,s,a,n,r,o){var h,l,u,c,d,p,f,m,g=this._get(e,"changeMonth"),v=this._get(e,"changeYear"),y=this._get(e,"showMonthAfterYear"),_="<div class='ui-datepicker-title'>",b="";if(n||!g)b+="<span class='ui-datepicker-month'>"+r[t]+"</span>";else{for(h=s&&s.getFullYear()===i,l=a&&a.getFullYear()===i,b+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",u=0;12>u;u++)(!h||u>=s.getMonth())&&(!l||a.getMonth()>=u)&&(b+="<option value='"+u+"'"+(u===t?" selected='selected'":"")+">"+o[u]+"</option>");b+="</select>"}if(y||(_+=b+(!n&&g&&v?"":"&#xa0;")),!e.yearshtml)if(e.yearshtml="",n||!v)_+="<span class='ui-datepicker-year'>"+i+"</span>";else{for(c=this._get(e,"yearRange").split(":"),d=(new Date).getFullYear(),p=function(e){var t=e.match(/c[+\-].*/)?i+parseInt(e.substring(1),10):e.match(/[+\-].*/)?d+parseInt(e,10):parseInt(e,10);return isNaN(t)?d:t},f=p(c[0]),m=Math.max(f,p(c[1]||"")),f=s?Math.max(f,s.getFullYear()):f,m=a?Math.min(m,a.getFullYear()):m,e.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";m>=f;f++)e.yearshtml+="<option value='"+f+"'"+(f===i?" selected='selected'":"")+">"+f+"</option>";e.yearshtml+="</select>",_+=e.yearshtml,e.yearshtml=null}return _+=this._get(e,"yearSuffix"),y&&(_+=(!n&&g&&v?"":"&#xa0;")+b),_+="</div>"},_adjustInstDate:function(e,t,i){var s=e.selectedYear+("Y"===i?t:0),a=e.selectedMonth+("M"===i?t:0),n=Math.min(e.selectedDay,this._getDaysInMonth(s,a))+("D"===i?t:0),r=this._restrictMinMax(e,this._daylightSavingAdjust(new Date(s,a,n)));e.selectedDay=r.getDate(),e.drawMonth=e.selectedMonth=r.getMonth(),e.drawYear=e.selectedYear=r.getFullYear(),("M"===i||"Y"===i)&&this._notifyChange(e)},_restrictMinMax:function(e,t){var i=this._getMinMaxDate(e,"min"),s=this._getMinMaxDate(e,"max"),a=i&&i>t?i:t;return s&&a>s?s:a},_notifyChange:function(e){var t=this._get(e,"onChangeMonthYear");t&&t.apply(e.input?e.input[0]:null,[e.selectedYear,e.selectedMonth+1,e])},_getNumberOfMonths:function(e){var t=this._get(e,"numberOfMonths");return null==t?[1,1]:"number"==typeof t?[1,t]:t},_getMinMaxDate:function(e,t){return this._determineDate(e,this._get(e,t+"Date"),null)},_getDaysInMonth:function(e,t){return 32-this._daylightSavingAdjust(new Date(e,t,32)).getDate()},_getFirstDayOfMonth:function(e,t){return new Date(e,t,1).getDay()},_canAdjustMonth:function(e,t,i,s){var a=this._getNumberOfMonths(e),n=this._daylightSavingAdjust(new Date(i,s+(0>t?t:a[0]*a[1]),1));return 0>t&&n.setDate(this._getDaysInMonth(n.getFullYear(),n.getMonth())),this._isInRange(e,n)},_isInRange:function(e,t){var i,s,a=this._getMinMaxDate(e,"min"),n=this._getMinMaxDate(e,"max"),r=null,o=null,h=this._get(e,"yearRange");return h&&(i=h.split(":"),s=(new Date).getFullYear(),r=parseInt(i[0],10),o=parseInt(i[1],10),i[0].match(/[+\-].*/)&&(r+=s),i[1].match(/[+\-].*/)&&(o+=s)),(!a||t.getTime()>=a.getTime())&&(!n||t.getTime()<=n.getTime())&&(!r||t.getFullYear()>=r)&&(!o||o>=t.getFullYear())},_getFormatConfig:function(e){var t=this._get(e,"shortYearCutoff");return t="string"!=typeof t?t:(new Date).getFullYear()%100+parseInt(t,10),{shortYearCutoff:t,dayNamesShort:this._get(e,"dayNamesShort"),dayNames:this._get(e,"dayNames"),monthNamesShort:this._get(e,"monthNamesShort"),monthNames:this._get(e,"monthNames")}},_formatDate:function(e,t,i,s){t||(e.currentDay=e.selectedDay,e.currentMonth=e.selectedMonth,e.currentYear=e.selectedYear);var a=t?"object"==typeof t?t:this._daylightSavingAdjust(new Date(s,i,t)):this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return this.formatDate(this._get(e,"dateFormat"),a,this._getFormatConfig(e))}}),e.fn.datepicker=function(t){if(!this.length)return this;e.datepicker.initialized||(e(document).on("mousedown",e.datepicker._checkExternalClick),e.datepicker.initialized=!0),0===e("#"+e.datepicker._mainDivId).length&&e("body").append(e.datepicker.dpDiv);var i=Array.prototype.slice.call(arguments,1);return"string"!=typeof t||"isDisabled"!==t&&"getDate"!==t&&"widget"!==t?"option"===t&&2===arguments.length&&"string"==typeof arguments[1]?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(i)):this.each(function(){"string"==typeof t?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this].concat(i)):e.datepicker._attachDatepicker(this,t)}):e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(i))},e.datepicker=new s,e.datepicker.initialized=!1,e.datepicker.uuid=(new Date).getTime(),e.datepicker.version="1.12.1",e.datepicker,e.widget("ui.dialog",{version:"1.12.1",options:{appendTo:"body",autoOpen:!0,buttons:[],classes:{"ui-dialog":"ui-corner-all","ui-dialog-titlebar":"ui-corner-all"},closeOnEscape:!0,closeText:"Close",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(t){var i=e(this).css(t).offset().top;0>i&&e(this).css("top",t.top-i)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},sizeRelatedOptions:{buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},resizableRelatedOptions:{maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),null==this.options.title&&null!=this.originalTitle&&(this.options.title=this.originalTitle),this.options.disabled&&(this.options.disabled=!1),this._createWrapper(),this.element.show().removeAttr("title").appendTo(this.uiDialog),this._addClass("ui-dialog-content","ui-widget-content"),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&e.fn.draggable&&this._makeDraggable(),this.options.resizable&&e.fn.resizable&&this._makeResizable(),this._isOpen=!1,this._trackFocus()},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var t=this.options.appendTo;return t&&(t.jquery||t.nodeType)?e(t):this.document.find(t||"body").eq(0)},_destroy:function(){var e,t=this.originalPosition;this._untrackInstance(),this._destroyOverlay(),this.element.removeUniqueId().css(this.originalCss).detach(),this.uiDialog.remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),e=t.parent.children().eq(t.index),e.length&&e[0]!==this.element[0]?e.before(this.element):t.parent.append(this.element)},widget:function(){return this.uiDialog},disable:e.noop,enable:e.noop,close:function(t){var i=this;this._isOpen&&this._trigger("beforeClose",t)!==!1&&(this._isOpen=!1,this._focusedElement=null,this._destroyOverlay(),this._untrackInstance(),this.opener.filter(":focusable").trigger("focus").length||e.ui.safeBlur(e.ui.safeActiveElement(this.document[0])),this._hide(this.uiDialog,this.options.hide,function(){i._trigger("close",t)}))},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(t,i){var s=!1,a=this.uiDialog.siblings(".ui-front:visible").map(function(){return+e(this).css("z-index")}).get(),n=Math.max.apply(null,a);return n>=+this.uiDialog.css("z-index")&&(this.uiDialog.css("z-index",n+1),s=!0),s&&!i&&this._trigger("focus",t),s},open:function(){var t=this;return this._isOpen?(this._moveToTop()&&this._focusTabbable(),void 0):(this._isOpen=!0,this.opener=e(e.ui.safeActiveElement(this.document[0])),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this.overlay&&this.overlay.css("z-index",this.uiDialog.css("z-index")-1),this._show(this.uiDialog,this.options.show,function(){t._focusTabbable(),t._trigger("focus")}),this._makeFocusTarget(),this._trigger("open"),void 0)},_focusTabbable:function(){var e=this._focusedElement;e||(e=this.element.find("[autofocus]")),e.length||(e=this.element.find(":tabbable")),e.length||(e=this.uiDialogButtonPane.find(":tabbable")),e.length||(e=this.uiDialogTitlebarClose.filter(":tabbable")),e.length||(e=this.uiDialog),e.eq(0).trigger("focus")},_keepFocus:function(t){function i(){var t=e.ui.safeActiveElement(this.document[0]),i=this.uiDialog[0]===t||e.contains(this.uiDialog[0],t);i||this._focusTabbable()}t.preventDefault(),i.call(this),this._delay(i)},_createWrapper:function(){this.uiDialog=e("<div>").hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._addClass(this.uiDialog,"ui-dialog","ui-widget ui-widget-content ui-front"),this._on(this.uiDialog,{keydown:function(t){if(this.options.closeOnEscape&&!t.isDefaultPrevented()&&t.keyCode&&t.keyCode===e.ui.keyCode.ESCAPE)return t.preventDefault(),this.close(t),void 0;if(t.keyCode===e.ui.keyCode.TAB&&!t.isDefaultPrevented()){var i=this.uiDialog.find(":tabbable"),s=i.filter(":first"),a=i.filter(":last");t.target!==a[0]&&t.target!==this.uiDialog[0]||t.shiftKey?t.target!==s[0]&&t.target!==this.uiDialog[0]||!t.shiftKey||(this._delay(function(){a.trigger("focus")}),t.preventDefault()):(this._delay(function(){s.trigger("focus")}),t.preventDefault())}},mousedown:function(e){this._moveToTop(e)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var t;this.uiDialogTitlebar=e("<div>"),this._addClass(this.uiDialogTitlebar,"ui-dialog-titlebar","ui-widget-header ui-helper-clearfix"),this._on(this.uiDialogTitlebar,{mousedown:function(t){e(t.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.trigger("focus")}}),this.uiDialogTitlebarClose=e("<button type='button'></button>").button({label:e("<a>").text(this.options.closeText).html(),icon:"ui-icon-closethick",showLabel:!1}).appendTo(this.uiDialogTitlebar),this._addClass(this.uiDialogTitlebarClose,"ui-dialog-titlebar-close"),this._on(this.uiDialogTitlebarClose,{click:function(e){e.preventDefault(),this.close(e)}}),t=e("<span>").uniqueId().prependTo(this.uiDialogTitlebar),this._addClass(t,"ui-dialog-title"),this._title(t),this.uiDialogTitlebar.prependTo(this.uiDialog),this.uiDialog.attr({"aria-labelledby":t.attr("id")})},_title:function(e){this.options.title?e.text(this.options.title):e.html("&#160;")},_createButtonPane:function(){this.uiDialogButtonPane=e("<div>"),this._addClass(this.uiDialogButtonPane,"ui-dialog-buttonpane","ui-widget-content ui-helper-clearfix"),this.uiButtonSet=e("<div>").appendTo(this.uiDialogButtonPane),this._addClass(this.uiButtonSet,"ui-dialog-buttonset"),this._createButtons()},_createButtons:function(){var t=this,i=this.options.buttons;return this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),e.isEmptyObject(i)||e.isArray(i)&&!i.length?(this._removeClass(this.uiDialog,"ui-dialog-buttons"),void 0):(e.each(i,function(i,s){var a,n;s=e.isFunction(s)?{click:s,text:i}:s,s=e.extend({type:"button"},s),a=s.click,n={icon:s.icon,iconPosition:s.iconPosition,showLabel:s.showLabel,icons:s.icons,text:s.text},delete s.click,delete s.icon,delete s.iconPosition,delete s.showLabel,delete s.icons,"boolean"==typeof s.text&&delete s.text,e("<button></button>",s).button(n).appendTo(t.uiButtonSet).on("click",function(){a.apply(t.element[0],arguments)})}),this._addClass(this.uiDialog,"ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog),void 0)},_makeDraggable:function(){function t(e){return{position:e.position,offset:e.offset}}var i=this,s=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(s,a){i._addClass(e(this),"ui-dialog-dragging"),i._blockFrames(),i._trigger("dragStart",s,t(a))},drag:function(e,s){i._trigger("drag",e,t(s))},stop:function(a,n){var r=n.offset.left-i.document.scrollLeft(),o=n.offset.top-i.document.scrollTop();s.position={my:"left top",at:"left"+(r>=0?"+":"")+r+" "+"top"+(o>=0?"+":"")+o,of:i.window},i._removeClass(e(this),"ui-dialog-dragging"),i._unblockFrames(),i._trigger("dragStop",a,t(n))}})},_makeResizable:function(){function t(e){return{originalPosition:e.originalPosition,originalSize:e.originalSize,position:e.position,size:e.size}}var i=this,s=this.options,a=s.resizable,n=this.uiDialog.css("position"),r="string"==typeof a?a:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:s.maxWidth,maxHeight:s.maxHeight,minWidth:s.minWidth,minHeight:this._minHeight(),handles:r,start:function(s,a){i._addClass(e(this),"ui-dialog-resizing"),i._blockFrames(),i._trigger("resizeStart",s,t(a))},resize:function(e,s){i._trigger("resize",e,t(s))},stop:function(a,n){var r=i.uiDialog.offset(),o=r.left-i.document.scrollLeft(),h=r.top-i.document.scrollTop();s.height=i.uiDialog.height(),s.width=i.uiDialog.width(),s.position={my:"left top",at:"left"+(o>=0?"+":"")+o+" "+"top"+(h>=0?"+":"")+h,of:i.window},i._removeClass(e(this),"ui-dialog-resizing"),i._unblockFrames(),i._trigger("resizeStop",a,t(n))}}).css("position",n)},_trackFocus:function(){this._on(this.widget(),{focusin:function(t){this._makeFocusTarget(),this._focusedElement=e(t.target)}})},_makeFocusTarget:function(){this._untrackInstance(),this._trackingInstances().unshift(this)},_untrackInstance:function(){var t=this._trackingInstances(),i=e.inArray(this,t);-1!==i&&t.splice(i,1)},_trackingInstances:function(){var e=this.document.data("ui-dialog-instances");return e||(e=[],this.document.data("ui-dialog-instances",e)),e},_minHeight:function(){var e=this.options;return"auto"===e.height?e.minHeight:Math.min(e.minHeight,e.height)},_position:function(){var e=this.uiDialog.is(":visible");e||this.uiDialog.show(),this.uiDialog.position(this.options.position),e||this.uiDialog.hide()},_setOptions:function(t){var i=this,s=!1,a={};e.each(t,function(e,t){i._setOption(e,t),e in i.sizeRelatedOptions&&(s=!0),e in i.resizableRelatedOptions&&(a[e]=t)}),s&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",a)},_setOption:function(t,i){var s,a,n=this.uiDialog;"disabled"!==t&&(this._super(t,i),"appendTo"===t&&this.uiDialog.appendTo(this._appendTo()),"buttons"===t&&this._createButtons(),"closeText"===t&&this.uiDialogTitlebarClose.button({label:e("<a>").text(""+this.options.closeText).html()}),"draggable"===t&&(s=n.is(":data(ui-draggable)"),s&&!i&&n.draggable("destroy"),!s&&i&&this._makeDraggable()),"position"===t&&this._position(),"resizable"===t&&(a=n.is(":data(ui-resizable)"),a&&!i&&n.resizable("destroy"),a&&"string"==typeof i&&n.resizable("option","handles",i),a||i===!1||this._makeResizable()),"title"===t&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var e,t,i,s=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),s.minWidth>s.width&&(s.width=s.minWidth),e=this.uiDialog.css({height:"auto",width:s.width}).outerHeight(),t=Math.max(0,s.minHeight-e),i="number"==typeof s.maxHeight?Math.max(0,s.maxHeight-e):"none","auto"===s.height?this.element.css({minHeight:t,maxHeight:i,height:"auto"}):this.element.height(Math.max(0,s.height-e)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var t=e(this);return e("<div>").css({position:"absolute",width:t.outerWidth(),height:t.outerHeight()}).appendTo(t.parent()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(t){return e(t.target).closest(".ui-dialog").length?!0:!!e(t.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){var t=!0;this._delay(function(){t=!1}),this.document.data("ui-dialog-overlays")||this._on(this.document,{focusin:function(e){t||this._allowInteraction(e)||(e.preventDefault(),this._trackingInstances()[0]._focusTabbable())}}),this.overlay=e("<div>").appendTo(this._appendTo()),this._addClass(this.overlay,null,"ui-widget-overlay ui-front"),this._on(this.overlay,{mousedown:"_keepFocus"}),this.document.data("ui-dialog-overlays",(this.document.data("ui-dialog-overlays")||0)+1)}},_destroyOverlay:function(){if(this.options.modal&&this.overlay){var e=this.document.data("ui-dialog-overlays")-1;e?this.document.data("ui-dialog-overlays",e):(this._off(this.document,"focusin"),this.document.removeData("ui-dialog-overlays")),this.overlay.remove(),this.overlay=null}}}),e.uiBackCompat!==!1&&e.widget("ui.dialog",e.ui.dialog,{options:{dialogClass:""},_createWrapper:function(){this._super(),this.uiDialog.addClass(this.options.dialogClass)},_setOption:function(e,t){"dialogClass"===e&&this.uiDialog.removeClass(this.options.dialogClass).addClass(t),this._superApply(arguments)}}),e.ui.dialog,e.widget("ui.progressbar",{version:"1.12.1",options:{classes:{"ui-progressbar":"ui-corner-all","ui-progressbar-value":"ui-corner-left","ui-progressbar-complete":"ui-corner-right"},max:100,value:0,change:null,complete:null},min:0,_create:function(){this.oldValue=this.options.value=this._constrainedValue(),this.element.attr({role:"progressbar","aria-valuemin":this.min}),this._addClass("ui-progressbar","ui-widget ui-widget-content"),this.valueDiv=e("<div>").appendTo(this.element),this._addClass(this.valueDiv,"ui-progressbar-value","ui-widget-header"),this._refreshValue()},_destroy:function(){this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow"),this.valueDiv.remove()},value:function(e){return void 0===e?this.options.value:(this.options.value=this._constrainedValue(e),this._refreshValue(),void 0)},_constrainedValue:function(e){return void 0===e&&(e=this.options.value),this.indeterminate=e===!1,"number"!=typeof e&&(e=0),this.indeterminate?!1:Math.min(this.options.max,Math.max(this.min,e))},_setOptions:function(e){var t=e.value;delete e.value,this._super(e),this.options.value=this._constrainedValue(t),this._refreshValue()},_setOption:function(e,t){"max"===e&&(t=Math.max(this.min,t)),this._super(e,t)},_setOptionDisabled:function(e){this._super(e),this.element.attr("aria-disabled",e),this._toggleClass(null,"ui-state-disabled",!!e)},_percentage:function(){return this.indeterminate?100:100*(this.options.value-this.min)/(this.options.max-this.min)},_refreshValue:function(){var t=this.options.value,i=this._percentage();this.valueDiv.toggle(this.indeterminate||t>this.min).width(i.toFixed(0)+"%"),this._toggleClass(this.valueDiv,"ui-progressbar-complete",null,t===this.options.max)._toggleClass("ui-progressbar-indeterminate",null,this.indeterminate),this.indeterminate?(this.element.removeAttr("aria-valuenow"),this.overlayDiv||(this.overlayDiv=e("<div>").appendTo(this.valueDiv),this._addClass(this.overlayDiv,"ui-progressbar-overlay"))):(this.element.attr({"aria-valuemax":this.options.max,"aria-valuenow":t}),this.overlayDiv&&(this.overlayDiv.remove(),this.overlayDiv=null)),this.oldValue!==t&&(this.oldValue=t,this._trigger("change")),t===this.options.max&&this._trigger("complete")}}),e.widget("ui.selectmenu",[e.ui.formResetMixin,{version:"1.12.1",defaultElement:"<select>",options:{appendTo:null,classes:{"ui-selectmenu-button-open":"ui-corner-top","ui-selectmenu-button-closed":"ui-corner-all"},disabled:null,icons:{button:"ui-icon-triangle-1-s"},position:{my:"left top",at:"left bottom",collision:"none"},width:!1,change:null,close:null,focus:null,open:null,select:null},_create:function(){var t=this.element.uniqueId().attr("id");this.ids={element:t,button:t+"-button",menu:t+"-menu"},this._drawButton(),this._drawMenu(),this._bindFormResetHandler(),this._rendered=!1,this.menuItems=e()},_drawButton:function(){var t,i=this,s=this._parseOption(this.element.find("option:selected"),this.element[0].selectedIndex);this.labels=this.element.labels().attr("for",this.ids.button),this._on(this.labels,{click:function(e){this.button.focus(),e.preventDefault()}}),this.element.hide(),this.button=e("<span>",{tabindex:this.options.disabled?-1:0,id:this.ids.button,role:"combobox","aria-expanded":"false","aria-autocomplete":"list","aria-owns":this.ids.menu,"aria-haspopup":"true",title:this.element.attr("title")}).insertAfter(this.element),this._addClass(this.button,"ui-selectmenu-button ui-selectmenu-button-closed","ui-button ui-widget"),t=e("<span>").appendTo(this.button),this._addClass(t,"ui-selectmenu-icon","ui-icon "+this.options.icons.button),this.buttonItem=this._renderButtonItem(s).appendTo(this.button),this.options.width!==!1&&this._resizeButton(),this._on(this.button,this._buttonEvents),this.button.one("focusin",function(){i._rendered||i._refreshMenu()})},_drawMenu:function(){var t=this;this.menu=e("<ul>",{"aria-hidden":"true","aria-labelledby":this.ids.button,id:this.ids.menu}),this.menuWrap=e("<div>").append(this.menu),this._addClass(this.menuWrap,"ui-selectmenu-menu","ui-front"),this.menuWrap.appendTo(this._appendTo()),this.menuInstance=this.menu.menu({classes:{"ui-menu":"ui-corner-bottom"},role:"listbox",select:function(e,i){e.preventDefault(),t._setSelection(),t._select(i.item.data("ui-selectmenu-item"),e)},focus:function(e,i){var s=i.item.data("ui-selectmenu-item");null!=t.focusIndex&&s.index!==t.focusIndex&&(t._trigger("focus",e,{item:s}),t.isOpen||t._select(s,e)),t.focusIndex=s.index,t.button.attr("aria-activedescendant",t.menuItems.eq(s.index).attr("id"))}}).menu("instance"),this.menuInstance._off(this.menu,"mouseleave"),this.menuInstance._closeOnDocumentClick=function(){return!1},this.menuInstance._isDivider=function(){return!1}},refresh:function(){this._refreshMenu(),this.buttonItem.replaceWith(this.buttonItem=this._renderButtonItem(this._getSelectedItem().data("ui-selectmenu-item")||{})),null===this.options.width&&this._resizeButton()},_refreshMenu:function(){var e,t=this.element.find("option");this.menu.empty(),this._parseOptions(t),this._renderMenu(this.menu,this.items),this.menuInstance.refresh(),this.menuItems=this.menu.find("li").not(".ui-selectmenu-optgroup").find(".ui-menu-item-wrapper"),this._rendered=!0,t.length&&(e=this._getSelectedItem(),this.menuInstance.focus(null,e),this._setAria(e.data("ui-selectmenu-item")),this._setOption("disabled",this.element.prop("disabled")))},open:function(e){this.options.disabled||(this._rendered?(this._removeClass(this.menu.find(".ui-state-active"),null,"ui-state-active"),this.menuInstance.focus(null,this._getSelectedItem())):this._refreshMenu(),this.menuItems.length&&(this.isOpen=!0,this._toggleAttr(),this._resizeMenu(),this._position(),this._on(this.document,this._documentClick),this._trigger("open",e)))},_position:function(){this.menuWrap.position(e.extend({of:this.button},this.options.position))},close:function(e){this.isOpen&&(this.isOpen=!1,this._toggleAttr(),this.range=null,this._off(this.document),this._trigger("close",e))},widget:function(){return this.button},menuWidget:function(){return this.menu},_renderButtonItem:function(t){var i=e("<span>");return this._setText(i,t.label),this._addClass(i,"ui-selectmenu-text"),i},_renderMenu:function(t,i){var s=this,a="";e.each(i,function(i,n){var r;n.optgroup!==a&&(r=e("<li>",{text:n.optgroup}),s._addClass(r,"ui-selectmenu-optgroup","ui-menu-divider"+(n.element.parent("optgroup").prop("disabled")?" ui-state-disabled":"")),r.appendTo(t),a=n.optgroup),s._renderItemData(t,n)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-selectmenu-item",t)},_renderItem:function(t,i){var s=e("<li>"),a=e("<div>",{title:i.element.attr("title")});return i.disabled&&this._addClass(s,null,"ui-state-disabled"),this._setText(a,i.label),s.append(a).appendTo(t)},_setText:function(e,t){t?e.text(t):e.html("&#160;")},_move:function(e,t){var i,s,a=".ui-menu-item";this.isOpen?i=this.menuItems.eq(this.focusIndex).parent("li"):(i=this.menuItems.eq(this.element[0].selectedIndex).parent("li"),a+=":not(.ui-state-disabled)"),s="first"===e||"last"===e?i["first"===e?"prevAll":"nextAll"](a).eq(-1):i[e+"All"](a).eq(0),s.length&&this.menuInstance.focus(t,s)},_getSelectedItem:function(){return this.menuItems.eq(this.element[0].selectedIndex).parent("li")},_toggle:function(e){this[this.isOpen?"close":"open"](e)},_setSelection:function(){var e;this.range&&(window.getSelection?(e=window.getSelection(),e.removeAllRanges(),e.addRange(this.range)):this.range.select(),this.button.focus())},_documentClick:{mousedown:function(t){this.isOpen&&(e(t.target).closest(".ui-selectmenu-menu, #"+e.ui.escapeSelector(this.ids.button)).length||this.close(t))}},_buttonEvents:{mousedown:function(){var e;window.getSelection?(e=window.getSelection(),e.rangeCount&&(this.range=e.getRangeAt(0))):this.range=document.selection.createRange()},click:function(e){this._setSelection(),this._toggle(e)},keydown:function(t){var i=!0;switch(t.keyCode){case e.ui.keyCode.TAB:case e.ui.keyCode.ESCAPE:this.close(t),i=!1;break;case e.ui.keyCode.ENTER:this.isOpen&&this._selectFocusedItem(t);break;case e.ui.keyCode.UP:t.altKey?this._toggle(t):this._move("prev",t);break;case e.ui.keyCode.DOWN:t.altKey?this._toggle(t):this._move("next",t);break;case e.ui.keyCode.SPACE:this.isOpen?this._selectFocusedItem(t):this._toggle(t);break;case e.ui.keyCode.LEFT:this._move("prev",t);break;case e.ui.keyCode.RIGHT:this._move("next",t);break;case e.ui.keyCode.HOME:case e.ui.keyCode.PAGE_UP:this._move("first",t);break;case e.ui.keyCode.END:case e.ui.keyCode.PAGE_DOWN:this._move("last",t);break;default:this.menu.trigger(t),i=!1}i&&t.preventDefault()}},_selectFocusedItem:function(e){var t=this.menuItems.eq(this.focusIndex).parent("li");t.hasClass("ui-state-disabled")||this._select(t.data("ui-selectmenu-item"),e)},_select:function(e,t){var i=this.element[0].selectedIndex;this.element[0].selectedIndex=e.index,this.buttonItem.replaceWith(this.buttonItem=this._renderButtonItem(e)),this._setAria(e),this._trigger("select",t,{item:e}),e.index!==i&&this._trigger("change",t,{item:e}),this.close(t)},_setAria:function(e){var t=this.menuItems.eq(e.index).attr("id");this.button.attr({"aria-labelledby":t,"aria-activedescendant":t}),this.menu.attr("aria-activedescendant",t)},_setOption:function(e,t){if("icons"===e){var i=this.button.find("span.ui-icon");this._removeClass(i,null,this.options.icons.button)._addClass(i,null,t.button)}this._super(e,t),"appendTo"===e&&this.menuWrap.appendTo(this._appendTo()),"width"===e&&this._resizeButton()},_setOptionDisabled:function(e){this._super(e),this.menuInstance.option("disabled",e),this.button.attr("aria-disabled",e),this._toggleClass(this.button,null,"ui-state-disabled",e),this.element.prop("disabled",e),e?(this.button.attr("tabindex",-1),this.close()):this.button.attr("tabindex",0)},_appendTo:function(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t&&t[0]||(t=this.element.closest(".ui-front, dialog")),t.length||(t=this.document[0].body),t},_toggleAttr:function(){this.button.attr("aria-expanded",this.isOpen),this._removeClass(this.button,"ui-selectmenu-button-"+(this.isOpen?"closed":"open"))._addClass(this.button,"ui-selectmenu-button-"+(this.isOpen?"open":"closed"))._toggleClass(this.menuWrap,"ui-selectmenu-open",null,this.isOpen),this.menu.attr("aria-hidden",!this.isOpen)},_resizeButton:function(){var e=this.options.width;return e===!1?(this.button.css("width",""),void 0):(null===e&&(e=this.element.show().outerWidth(),this.element.hide()),this.button.outerWidth(e),void 0)},_resizeMenu:function(){this.menu.outerWidth(Math.max(this.button.outerWidth(),this.menu.width("").outerWidth()+1))},_getCreateOptions:function(){var e=this._super();return e.disabled=this.element.prop("disabled"),e},_parseOptions:function(t){var i=this,s=[];t.each(function(t,a){s.push(i._parseOption(e(a),t))}),this.items=s},_parseOption:function(e,t){var i=e.parent("optgroup");return{element:e,index:t,value:e.val(),label:e.text(),optgroup:i.attr("label")||"",disabled:i.prop("disabled")||e.prop("disabled")}},_destroy:function(){this._unbindFormResetHandler(),this.menuWrap.remove(),this.button.remove(),this.element.show(),this.element.removeUniqueId(),this.labels.attr("for",this.ids.element)}}]),e.widget("ui.slider",e.ui.mouse,{version:"1.12.1",widgetEventPrefix:"slide",options:{animate:!1,classes:{"ui-slider":"ui-corner-all","ui-slider-handle":"ui-corner-all","ui-slider-range":"ui-corner-all ui-widget-header"},distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},numPages:5,_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this._calculateNewMax(),this._addClass("ui-slider ui-slider-"+this.orientation,"ui-widget ui-widget-content"),this._refresh(),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var t,i,s=this.options,a=this.element.find(".ui-slider-handle"),n="<span tabindex='0'></span>",r=[];for(i=s.values&&s.values.length||1,a.length>i&&(a.slice(i).remove(),a=a.slice(0,i)),t=a.length;i>t;t++)r.push(n);this.handles=a.add(e(r.join("")).appendTo(this.element)),this._addClass(this.handles,"ui-slider-handle","ui-state-default"),this.handle=this.handles.eq(0),this.handles.each(function(t){e(this).data("ui-slider-handle-index",t).attr("tabIndex",0)})},_createRange:function(){var t=this.options;t.range?(t.range===!0&&(t.values?t.values.length&&2!==t.values.length?t.values=[t.values[0],t.values[0]]:e.isArray(t.values)&&(t.values=t.values.slice(0)):t.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?(this._removeClass(this.range,"ui-slider-range-min ui-slider-range-max"),this.range.css({left:"",bottom:""})):(this.range=e("<div>").appendTo(this.element),this._addClass(this.range,"ui-slider-range")),("min"===t.range||"max"===t.range)&&this._addClass(this.range,"ui-slider-range-"+t.range)):(this.range&&this.range.remove(),this.range=null)
},_setupEvents:function(){this._off(this.handles),this._on(this.handles,this._handleEvents),this._hoverable(this.handles),this._focusable(this.handles)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this._mouseDestroy()},_mouseCapture:function(t){var i,s,a,n,r,o,h,l,u=this,c=this.options;return c.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:t.pageX,y:t.pageY},s=this._normValueFromMouse(i),a=this._valueMax()-this._valueMin()+1,this.handles.each(function(t){var i=Math.abs(s-u.values(t));(a>i||a===i&&(t===u._lastChangedValue||u.values(t)===c.min))&&(a=i,n=e(this),r=t)}),o=this._start(t,r),o===!1?!1:(this._mouseSliding=!0,this._handleIndex=r,this._addClass(n,null,"ui-state-active"),n.trigger("focus"),h=n.offset(),l=!e(t.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:t.pageX-h.left-n.width()/2,top:t.pageY-h.top-n.height()/2-(parseInt(n.css("borderTopWidth"),10)||0)-(parseInt(n.css("borderBottomWidth"),10)||0)+(parseInt(n.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(t,r,s),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(e){var t={x:e.pageX,y:e.pageY},i=this._normValueFromMouse(t);return this._slide(e,this._handleIndex,i),!1},_mouseStop:function(e){return this._removeClass(this.handles,null,"ui-state-active"),this._mouseSliding=!1,this._stop(e,this._handleIndex),this._change(e,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(e){var t,i,s,a,n;return"horizontal"===this.orientation?(t=this.elementSize.width,i=e.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(t=this.elementSize.height,i=e.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),s=i/t,s>1&&(s=1),0>s&&(s=0),"vertical"===this.orientation&&(s=1-s),a=this._valueMax()-this._valueMin(),n=this._valueMin()+s*a,this._trimAlignValue(n)},_uiHash:function(e,t,i){var s={handle:this.handles[e],handleIndex:e,value:void 0!==t?t:this.value()};return this._hasMultipleValues()&&(s.value=void 0!==t?t:this.values(e),s.values=i||this.values()),s},_hasMultipleValues:function(){return this.options.values&&this.options.values.length},_start:function(e,t){return this._trigger("start",e,this._uiHash(t))},_slide:function(e,t,i){var s,a,n=this.value(),r=this.values();this._hasMultipleValues()&&(a=this.values(t?0:1),n=this.values(t),2===this.options.values.length&&this.options.range===!0&&(i=0===t?Math.min(a,i):Math.max(a,i)),r[t]=i),i!==n&&(s=this._trigger("slide",e,this._uiHash(t,i,r)),s!==!1&&(this._hasMultipleValues()?this.values(t,i):this.value(i)))},_stop:function(e,t){this._trigger("stop",e,this._uiHash(t))},_change:function(e,t){this._keySliding||this._mouseSliding||(this._lastChangedValue=t,this._trigger("change",e,this._uiHash(t)))},value:function(e){return arguments.length?(this.options.value=this._trimAlignValue(e),this._refreshValue(),this._change(null,0),void 0):this._value()},values:function(t,i){var s,a,n;if(arguments.length>1)return this.options.values[t]=this._trimAlignValue(i),this._refreshValue(),this._change(null,t),void 0;if(!arguments.length)return this._values();if(!e.isArray(arguments[0]))return this._hasMultipleValues()?this._values(t):this.value();for(s=this.options.values,a=arguments[0],n=0;s.length>n;n+=1)s[n]=this._trimAlignValue(a[n]),this._change(null,n);this._refreshValue()},_setOption:function(t,i){var s,a=0;switch("range"===t&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),e.isArray(this.options.values)&&(a=this.options.values.length),this._super(t,i),t){case"orientation":this._detectOrientation(),this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-"+this.orientation),this._refreshValue(),this.options.range&&this._refreshRange(i),this.handles.css("horizontal"===i?"bottom":"left","");break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),s=a-1;s>=0;s--)this._change(null,s);this._animateOff=!1;break;case"step":case"min":case"max":this._animateOff=!0,this._calculateNewMax(),this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_setOptionDisabled:function(e){this._super(e),this._toggleClass(null,"ui-state-disabled",!!e)},_value:function(){var e=this.options.value;return e=this._trimAlignValue(e)},_values:function(e){var t,i,s;if(arguments.length)return t=this.options.values[e],t=this._trimAlignValue(t);if(this._hasMultipleValues()){for(i=this.options.values.slice(),s=0;i.length>s;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},_trimAlignValue:function(e){if(this._valueMin()>=e)return this._valueMin();if(e>=this._valueMax())return this._valueMax();var t=this.options.step>0?this.options.step:1,i=(e-this._valueMin())%t,s=e-i;return 2*Math.abs(i)>=t&&(s+=i>0?t:-t),parseFloat(s.toFixed(5))},_calculateNewMax:function(){var e=this.options.max,t=this._valueMin(),i=this.options.step,s=Math.round((e-t)/i)*i;e=s+t,e>this.options.max&&(e-=i),this.max=parseFloat(e.toFixed(this._precision()))},_precision:function(){var e=this._precisionOf(this.options.step);return null!==this.options.min&&(e=Math.max(e,this._precisionOf(this.options.min))),e},_precisionOf:function(e){var t=""+e,i=t.indexOf(".");return-1===i?0:t.length-i-1},_valueMin:function(){return this.options.min},_valueMax:function(){return this.max},_refreshRange:function(e){"vertical"===e&&this.range.css({width:"",left:""}),"horizontal"===e&&this.range.css({height:"",bottom:""})},_refreshValue:function(){var t,i,s,a,n,r=this.options.range,o=this.options,h=this,l=this._animateOff?!1:o.animate,u={};this._hasMultipleValues()?this.handles.each(function(s){i=100*((h.values(s)-h._valueMin())/(h._valueMax()-h._valueMin())),u["horizontal"===h.orientation?"left":"bottom"]=i+"%",e(this).stop(1,1)[l?"animate":"css"](u,o.animate),h.options.range===!0&&("horizontal"===h.orientation?(0===s&&h.range.stop(1,1)[l?"animate":"css"]({left:i+"%"},o.animate),1===s&&h.range[l?"animate":"css"]({width:i-t+"%"},{queue:!1,duration:o.animate})):(0===s&&h.range.stop(1,1)[l?"animate":"css"]({bottom:i+"%"},o.animate),1===s&&h.range[l?"animate":"css"]({height:i-t+"%"},{queue:!1,duration:o.animate}))),t=i}):(s=this.value(),a=this._valueMin(),n=this._valueMax(),i=n!==a?100*((s-a)/(n-a)):0,u["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[l?"animate":"css"](u,o.animate),"min"===r&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:i+"%"},o.animate),"max"===r&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:100-i+"%"},o.animate),"min"===r&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:i+"%"},o.animate),"max"===r&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:100-i+"%"},o.animate))},_handleEvents:{keydown:function(t){var i,s,a,n,r=e(t.target).data("ui-slider-handle-index");switch(t.keyCode){case e.ui.keyCode.HOME:case e.ui.keyCode.END:case e.ui.keyCode.PAGE_UP:case e.ui.keyCode.PAGE_DOWN:case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(t.preventDefault(),!this._keySliding&&(this._keySliding=!0,this._addClass(e(t.target),null,"ui-state-active"),i=this._start(t,r),i===!1))return}switch(n=this.options.step,s=a=this._hasMultipleValues()?this.values(r):this.value(),t.keyCode){case e.ui.keyCode.HOME:a=this._valueMin();break;case e.ui.keyCode.END:a=this._valueMax();break;case e.ui.keyCode.PAGE_UP:a=this._trimAlignValue(s+(this._valueMax()-this._valueMin())/this.numPages);break;case e.ui.keyCode.PAGE_DOWN:a=this._trimAlignValue(s-(this._valueMax()-this._valueMin())/this.numPages);break;case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:if(s===this._valueMax())return;a=this._trimAlignValue(s+n);break;case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(s===this._valueMin())return;a=this._trimAlignValue(s-n)}this._slide(t,r,a)},keyup:function(t){var i=e(t.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(t,i),this._change(t,i),this._removeClass(e(t.target),null,"ui-state-active"))}}}),e.widget("ui.spinner",{version:"1.12.1",defaultElement:"<input>",widgetEventPrefix:"spin",options:{classes:{"ui-spinner":"ui-corner-all","ui-spinner-down":"ui-corner-br","ui-spinner-up":"ui-corner-tr"},culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),""!==this.value()&&this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var t=this._super(),i=this.element;return e.each(["min","max","step"],function(e,s){var a=i.attr(s);null!=a&&a.length&&(t[s]=a)}),t},_events:{keydown:function(e){this._start(e)&&this._keydown(e)&&e.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(e){return this.cancelBlur?(delete this.cancelBlur,void 0):(this._stop(),this._refresh(),this.previous!==this.element.val()&&this._trigger("change",e),void 0)},mousewheel:function(e,t){if(t){if(!this.spinning&&!this._start(e))return!1;this._spin((t>0?1:-1)*this.options.step,e),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(e)},100),e.preventDefault()}},"mousedown .ui-spinner-button":function(t){function i(){var t=this.element[0]===e.ui.safeActiveElement(this.document[0]);t||(this.element.trigger("focus"),this.previous=s,this._delay(function(){this.previous=s}))}var s;s=this.element[0]===e.ui.safeActiveElement(this.document[0])?this.previous:this.element.val(),t.preventDefault(),i.call(this),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,i.call(this)}),this._start(t)!==!1&&this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(t){return e(t.currentTarget).hasClass("ui-state-active")?this._start(t)===!1?!1:(this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t),void 0):void 0},"mouseleave .ui-spinner-button":"_stop"},_enhance:function(){this.uiSpinner=this.element.attr("autocomplete","off").wrap("<span>").parent().append("<a></a><a></a>")},_draw:function(){this._enhance(),this._addClass(this.uiSpinner,"ui-spinner","ui-widget ui-widget-content"),this._addClass("ui-spinner-input"),this.element.attr("role","spinbutton"),this.buttons=this.uiSpinner.children("a").attr("tabIndex",-1).attr("aria-hidden",!0).button({classes:{"ui-button":""}}),this._removeClass(this.buttons,"ui-corner-all"),this._addClass(this.buttons.first(),"ui-spinner-button ui-spinner-up"),this._addClass(this.buttons.last(),"ui-spinner-button ui-spinner-down"),this.buttons.first().button({icon:this.options.icons.up,showLabel:!1}),this.buttons.last().button({icon:this.options.icons.down,showLabel:!1}),this.buttons.height()>Math.ceil(.5*this.uiSpinner.height())&&this.uiSpinner.height()>0&&this.uiSpinner.height(this.uiSpinner.height())},_keydown:function(t){var i=this.options,s=e.ui.keyCode;switch(t.keyCode){case s.UP:return this._repeat(null,1,t),!0;case s.DOWN:return this._repeat(null,-1,t),!0;case s.PAGE_UP:return this._repeat(null,i.page,t),!0;case s.PAGE_DOWN:return this._repeat(null,-i.page,t),!0}return!1},_start:function(e){return this.spinning||this._trigger("start",e)!==!1?(this.counter||(this.counter=1),this.spinning=!0,!0):!1},_repeat:function(e,t,i){e=e||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,t,i)},e),this._spin(t*this.options.step,i)},_spin:function(e,t){var i=this.value()||0;this.counter||(this.counter=1),i=this._adjustValue(i+e*this._increment(this.counter)),this.spinning&&this._trigger("spin",t,{value:i})===!1||(this._value(i),this.counter++)},_increment:function(t){var i=this.options.incremental;return i?e.isFunction(i)?i(t):Math.floor(t*t*t/5e4-t*t/500+17*t/200+1):1},_precision:function(){var e=this._precisionOf(this.options.step);return null!==this.options.min&&(e=Math.max(e,this._precisionOf(this.options.min))),e},_precisionOf:function(e){var t=""+e,i=t.indexOf(".");return-1===i?0:t.length-i-1},_adjustValue:function(e){var t,i,s=this.options;return t=null!==s.min?s.min:0,i=e-t,i=Math.round(i/s.step)*s.step,e=t+i,e=parseFloat(e.toFixed(this._precision())),null!==s.max&&e>s.max?s.max:null!==s.min&&s.min>e?s.min:e},_stop:function(e){this.spinning&&(clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",e))},_setOption:function(e,t){var i,s,a;return"culture"===e||"numberFormat"===e?(i=this._parse(this.element.val()),this.options[e]=t,this.element.val(this._format(i)),void 0):(("max"===e||"min"===e||"step"===e)&&"string"==typeof t&&(t=this._parse(t)),"icons"===e&&(s=this.buttons.first().find(".ui-icon"),this._removeClass(s,null,this.options.icons.up),this._addClass(s,null,t.up),a=this.buttons.last().find(".ui-icon"),this._removeClass(a,null,this.options.icons.down),this._addClass(a,null,t.down)),this._super(e,t),void 0)},_setOptionDisabled:function(e){this._super(e),this._toggleClass(this.uiSpinner,null,"ui-state-disabled",!!e),this.element.prop("disabled",!!e),this.buttons.button(e?"disable":"enable")},_setOptions:o(function(e){this._super(e)}),_parse:function(e){return"string"==typeof e&&""!==e&&(e=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(e,10,this.options.culture):+e),""===e||isNaN(e)?null:e},_format:function(e){return""===e?"":window.Globalize&&this.options.numberFormat?Globalize.format(e,this.options.numberFormat,this.options.culture):e},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})},isValid:function(){var e=this.value();return null===e?!1:e===this._adjustValue(e)},_value:function(e,t){var i;""!==e&&(i=this._parse(e),null!==i&&(t||(i=this._adjustValue(i)),e=this._format(i))),this.element.val(e),this._refresh()},_destroy:function(){this.element.prop("disabled",!1).removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:o(function(e){this._stepUp(e)}),_stepUp:function(e){this._start()&&(this._spin((e||1)*this.options.step),this._stop())},stepDown:o(function(e){this._stepDown(e)}),_stepDown:function(e){this._start()&&(this._spin((e||1)*-this.options.step),this._stop())},pageUp:o(function(e){this._stepUp((e||1)*this.options.page)}),pageDown:o(function(e){this._stepDown((e||1)*this.options.page)}),value:function(e){return arguments.length?(o(this._value).call(this,e),void 0):this._parse(this.element.val())},widget:function(){return this.uiSpinner}}),e.uiBackCompat!==!1&&e.widget("ui.spinner",e.ui.spinner,{_enhance:function(){this.uiSpinner=this.element.attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml())},_uiSpinnerHtml:function(){return"<span>"},_buttonHtml:function(){return"<a></a><a></a>"}}),e.ui.spinner,e.widget("ui.tabs",{version:"1.12.1",delay:300,options:{active:null,classes:{"ui-tabs":"ui-corner-all","ui-tabs-nav":"ui-corner-all","ui-tabs-panel":"ui-corner-bottom","ui-tabs-tab":"ui-corner-top"},collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_isLocal:function(){var e=/#.*$/;return function(t){var i,s;i=t.href.replace(e,""),s=location.href.replace(e,"");try{i=decodeURIComponent(i)}catch(a){}try{s=decodeURIComponent(s)}catch(a){}return t.hash.length>1&&i===s}}(),_create:function(){var t=this,i=this.options;this.running=!1,this._addClass("ui-tabs","ui-widget ui-widget-content"),this._toggleClass("ui-tabs-collapsible",null,i.collapsible),this._processTabs(),i.active=this._initialActive(),e.isArray(i.disabled)&&(i.disabled=e.unique(i.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"),function(e){return t.tabs.index(e)}))).sort()),this.active=this.options.active!==!1&&this.anchors.length?this._findActive(i.active):e(),this._refresh(),this.active.length&&this.load(i.active)},_initialActive:function(){var t=this.options.active,i=this.options.collapsible,s=location.hash.substring(1);return null===t&&(s&&this.tabs.each(function(i,a){return e(a).attr("aria-controls")===s?(t=i,!1):void 0}),null===t&&(t=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),(null===t||-1===t)&&(t=this.tabs.length?0:!1)),t!==!1&&(t=this.tabs.index(this.tabs.eq(t)),-1===t&&(t=i?!1:0)),!i&&t===!1&&this.anchors.length&&(t=0),t},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):e()}},_tabKeydown:function(t){var i=e(e.ui.safeActiveElement(this.document[0])).closest("li"),s=this.tabs.index(i),a=!0;if(!this._handlePageNav(t)){switch(t.keyCode){case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:s++;break;case e.ui.keyCode.UP:case e.ui.keyCode.LEFT:a=!1,s--;break;case e.ui.keyCode.END:s=this.anchors.length-1;break;case e.ui.keyCode.HOME:s=0;break;case e.ui.keyCode.SPACE:return t.preventDefault(),clearTimeout(this.activating),this._activate(s),void 0;case e.ui.keyCode.ENTER:return t.preventDefault(),clearTimeout(this.activating),this._activate(s===this.options.active?!1:s),void 0;default:return}t.preventDefault(),clearTimeout(this.activating),s=this._focusNextTab(s,a),t.ctrlKey||t.metaKey||(i.attr("aria-selected","false"),this.tabs.eq(s).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",s)},this.delay))}},_panelKeydown:function(t){this._handlePageNav(t)||t.ctrlKey&&t.keyCode===e.ui.keyCode.UP&&(t.preventDefault(),this.active.trigger("focus"))},_handlePageNav:function(t){return t.altKey&&t.keyCode===e.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):t.altKey&&t.keyCode===e.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):void 0},_findNextTab:function(t,i){function s(){return t>a&&(t=0),0>t&&(t=a),t}for(var a=this.tabs.length-1;-1!==e.inArray(s(),this.options.disabled);)t=i?t+1:t-1;return t},_focusNextTab:function(e,t){return e=this._findNextTab(e,t),this.tabs.eq(e).trigger("focus"),e},_setOption:function(e,t){return"active"===e?(this._activate(t),void 0):(this._super(e,t),"collapsible"===e&&(this._toggleClass("ui-tabs-collapsible",null,t),t||this.options.active!==!1||this._activate(0)),"event"===e&&this._setupEvents(t),"heightStyle"===e&&this._setupHeightStyle(t),void 0)},_sanitizeSelector:function(e){return e?e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var t=this.options,i=this.tablist.children(":has(a[href])");t.disabled=e.map(i.filter(".ui-state-disabled"),function(e){return i.index(e)}),this._processTabs(),t.active!==!1&&this.anchors.length?this.active.length&&!e.contains(this.tablist[0],this.active[0])?this.tabs.length===t.disabled.length?(t.active=!1,this.active=e()):this._activate(this._findNextTab(Math.max(0,t.active-1),!1)):t.active=this.tabs.index(this.active):(t.active=!1,this.active=e()),this._refresh()},_refresh:function(){this._setOptionDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"}),this.active.length?(this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}),this._addClass(this.active,"ui-tabs-active","ui-state-active"),this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var t=this,i=this.tabs,s=this.anchors,a=this.panels;this.tablist=this._getList().attr("role","tablist"),this._addClass(this.tablist,"ui-tabs-nav","ui-helper-reset ui-helper-clearfix ui-widget-header"),this.tablist.on("mousedown"+this.eventNamespace,"> li",function(t){e(this).is(".ui-state-disabled")&&t.preventDefault()}).on("focus"+this.eventNamespace,".ui-tabs-anchor",function(){e(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this.tabs=this.tablist.find("> li:has(a[href])").attr({role:"tab",tabIndex:-1}),this._addClass(this.tabs,"ui-tabs-tab","ui-state-default"),this.anchors=this.tabs.map(function(){return e("a",this)[0]}).attr({role:"presentation",tabIndex:-1}),this._addClass(this.anchors,"ui-tabs-anchor"),this.panels=e(),this.anchors.each(function(i,s){var a,n,r,o=e(s).uniqueId().attr("id"),h=e(s).closest("li"),l=h.attr("aria-controls");t._isLocal(s)?(a=s.hash,r=a.substring(1),n=t.element.find(t._sanitizeSelector(a))):(r=h.attr("aria-controls")||e({}).uniqueId()[0].id,a="#"+r,n=t.element.find(a),n.length||(n=t._createPanel(r),n.insertAfter(t.panels[i-1]||t.tablist)),n.attr("aria-live","polite")),n.length&&(t.panels=t.panels.add(n)),l&&h.data("ui-tabs-aria-controls",l),h.attr({"aria-controls":r,"aria-labelledby":o}),n.attr("aria-labelledby",o)}),this.panels.attr("role","tabpanel"),this._addClass(this.panels,"ui-tabs-panel","ui-widget-content"),i&&(this._off(i.not(this.tabs)),this._off(s.not(this.anchors)),this._off(a.not(this.panels)))},_getList:function(){return this.tablist||this.element.find("ol, ul").eq(0)},_createPanel:function(t){return e("<div>").attr("id",t).data("ui-tabs-destroy",!0)},_setOptionDisabled:function(t){var i,s,a;for(e.isArray(t)&&(t.length?t.length===this.anchors.length&&(t=!0):t=!1),a=0;s=this.tabs[a];a++)i=e(s),t===!0||-1!==e.inArray(a,t)?(i.attr("aria-disabled","true"),this._addClass(i,null,"ui-state-disabled")):(i.removeAttr("aria-disabled"),this._removeClass(i,null,"ui-state-disabled"));this.options.disabled=t,this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,t===!0)},_setupEvents:function(t){var i={};t&&e.each(t.split(" "),function(e,t){i[t]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(!0,this.anchors,{click:function(e){e.preventDefault()}}),this._on(this.anchors,i),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(t){var i,s=this.element.parent();"fill"===t?(i=s.height(),i-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var t=e(this),s=t.css("position");"absolute"!==s&&"fixed"!==s&&(i-=t.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){i-=e(this).outerHeight(!0)}),this.panels.each(function(){e(this).height(Math.max(0,i-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):"auto"===t&&(i=0,this.panels.each(function(){i=Math.max(i,e(this).height("").height())}).height(i))},_eventHandler:function(t){var i=this.options,s=this.active,a=e(t.currentTarget),n=a.closest("li"),r=n[0]===s[0],o=r&&i.collapsible,h=o?e():this._getPanelForTab(n),l=s.length?this._getPanelForTab(s):e(),u={oldTab:s,oldPanel:l,newTab:o?e():n,newPanel:h};t.preventDefault(),n.hasClass("ui-state-disabled")||n.hasClass("ui-tabs-loading")||this.running||r&&!i.collapsible||this._trigger("beforeActivate",t,u)===!1||(i.active=o?!1:this.tabs.index(n),this.active=r?e():n,this.xhr&&this.xhr.abort(),l.length||h.length||e.error("jQuery UI Tabs: Mismatching fragment identifier."),h.length&&this.load(this.tabs.index(n),t),this._toggle(t,u))},_toggle:function(t,i){function s(){n.running=!1,n._trigger("activate",t,i)}function a(){n._addClass(i.newTab.closest("li"),"ui-tabs-active","ui-state-active"),r.length&&n.options.show?n._show(r,n.options.show,s):(r.show(),s())}var n=this,r=i.newPanel,o=i.oldPanel;this.running=!0,o.length&&this.options.hide?this._hide(o,this.options.hide,function(){n._removeClass(i.oldTab.closest("li"),"ui-tabs-active","ui-state-active"),a()}):(this._removeClass(i.oldTab.closest("li"),"ui-tabs-active","ui-state-active"),o.hide(),a()),o.attr("aria-hidden","true"),i.oldTab.attr({"aria-selected":"false","aria-expanded":"false"}),r.length&&o.length?i.oldTab.attr("tabIndex",-1):r.length&&this.tabs.filter(function(){return 0===e(this).attr("tabIndex")}).attr("tabIndex",-1),r.attr("aria-hidden","false"),i.newTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_activate:function(t){var i,s=this._findActive(t);s[0]!==this.active[0]&&(s.length||(s=this.active),i=s.find(".ui-tabs-anchor")[0],this._eventHandler({target:i,currentTarget:i,preventDefault:e.noop}))},_findActive:function(t){return t===!1?e():this.tabs.eq(t)},_getIndex:function(t){return"string"==typeof t&&(t=this.anchors.index(this.anchors.filter("[href$='"+e.ui.escapeSelector(t)+"']"))),t},_destroy:function(){this.xhr&&this.xhr.abort(),this.tablist.removeAttr("role").off(this.eventNamespace),this.anchors.removeAttr("role tabIndex").removeUniqueId(),this.tabs.add(this.panels).each(function(){e.data(this,"ui-tabs-destroy")?e(this).remove():e(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded")}),this.tabs.each(function(){var t=e(this),i=t.data("ui-tabs-aria-controls");i?t.attr("aria-controls",i).removeData("ui-tabs-aria-controls"):t.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(t){var i=this.options.disabled;i!==!1&&(void 0===t?i=!1:(t=this._getIndex(t),i=e.isArray(i)?e.map(i,function(e){return e!==t?e:null}):e.map(this.tabs,function(e,i){return i!==t?i:null})),this._setOptionDisabled(i))},disable:function(t){var i=this.options.disabled;if(i!==!0){if(void 0===t)i=!0;else{if(t=this._getIndex(t),-1!==e.inArray(t,i))return;i=e.isArray(i)?e.merge([t],i).sort():[t]}this._setOptionDisabled(i)}},load:function(t,i){t=this._getIndex(t);var s=this,a=this.tabs.eq(t),n=a.find(".ui-tabs-anchor"),r=this._getPanelForTab(a),o={tab:a,panel:r},h=function(e,t){"abort"===t&&s.panels.stop(!1,!0),s._removeClass(a,"ui-tabs-loading"),r.removeAttr("aria-busy"),e===s.xhr&&delete s.xhr};this._isLocal(n[0])||(this.xhr=e.ajax(this._ajaxSettings(n,i,o)),this.xhr&&"canceled"!==this.xhr.statusText&&(this._addClass(a,"ui-tabs-loading"),r.attr("aria-busy","true"),this.xhr.done(function(e,t,a){setTimeout(function(){r.html(e),s._trigger("load",i,o),h(a,t)},1)}).fail(function(e,t){setTimeout(function(){h(e,t)},1)})))},_ajaxSettings:function(t,i,s){var a=this;return{url:t.attr("href").replace(/#.*$/,""),beforeSend:function(t,n){return a._trigger("beforeLoad",i,e.extend({jqXHR:t,ajaxSettings:n},s))}}},_getPanelForTab:function(t){var i=e(t).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+i))}}),e.uiBackCompat!==!1&&e.widget("ui.tabs",e.ui.tabs,{_processTabs:function(){this._superApply(arguments),this._addClass(this.tabs,"ui-tab")}}),e.ui.tabs,e.widget("ui.tooltip",{version:"1.12.1",options:{classes:{"ui-tooltip":"ui-corner-all ui-widget-shadow"},content:function(){var t=e(this).attr("title")||"";return e("<a>").text(t).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,track:!1,close:null,open:null},_addDescribedBy:function(t,i){var s=(t.attr("aria-describedby")||"").split(/\s+/);s.push(i),t.data("ui-tooltip-id",i).attr("aria-describedby",e.trim(s.join(" ")))},_removeDescribedBy:function(t){var i=t.data("ui-tooltip-id"),s=(t.attr("aria-describedby")||"").split(/\s+/),a=e.inArray(i,s);-1!==a&&s.splice(a,1),t.removeData("ui-tooltip-id"),s=e.trim(s.join(" ")),s?t.attr("aria-describedby",s):t.removeAttr("aria-describedby")},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.liveRegion=e("<div>").attr({role:"log","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body),this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible"),this.disabledTitles=e([])},_setOption:function(t,i){var s=this;this._super(t,i),"content"===t&&e.each(this.tooltips,function(e,t){s._updateContent(t.element)})},_setOptionDisabled:function(e){this[e?"_disable":"_enable"]()},_disable:function(){var t=this;e.each(this.tooltips,function(i,s){var a=e.Event("blur");a.target=a.currentTarget=s.element[0],t.close(a,!0)}),this.disabledTitles=this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function(){var t=e(this);return t.is("[title]")?t.data("ui-tooltip-title",t.attr("title")).removeAttr("title"):void 0}))},_enable:function(){this.disabledTitles.each(function(){var t=e(this);t.data("ui-tooltip-title")&&t.attr("title",t.data("ui-tooltip-title"))}),this.disabledTitles=e([])},open:function(t){var i=this,s=e(t?t.target:this.element).closest(this.options.items);s.length&&!s.data("ui-tooltip-id")&&(s.attr("title")&&s.data("ui-tooltip-title",s.attr("title")),s.data("ui-tooltip-open",!0),t&&"mouseover"===t.type&&s.parents().each(function(){var t,s=e(this);s.data("ui-tooltip-open")&&(t=e.Event("blur"),t.target=t.currentTarget=this,i.close(t,!0)),s.attr("title")&&(s.uniqueId(),i.parents[this.id]={element:this,title:s.attr("title")},s.attr("title",""))}),this._registerCloseHandlers(t,s),this._updateContent(s,t))},_updateContent:function(e,t){var i,s=this.options.content,a=this,n=t?t.type:null;return"string"==typeof s||s.nodeType||s.jquery?this._open(t,e,s):(i=s.call(e[0],function(i){a._delay(function(){e.data("ui-tooltip-open")&&(t&&(t.type=n),this._open(t,e,i))})}),i&&this._open(t,e,i),void 0)},_open:function(t,i,s){function a(e){l.of=e,r.is(":hidden")||r.position(l)}var n,r,o,h,l=e.extend({},this.options.position);if(s){if(n=this._find(i))return n.tooltip.find(".ui-tooltip-content").html(s),void 0;i.is("[title]")&&(t&&"mouseover"===t.type?i.attr("title",""):i.removeAttr("title")),n=this._tooltip(i),r=n.tooltip,this._addDescribedBy(i,r.attr("id")),r.find(".ui-tooltip-content").html(s),this.liveRegion.children().hide(),h=e("<div>").html(r.find(".ui-tooltip-content").html()),h.removeAttr("name").find("[name]").removeAttr("name"),h.removeAttr("id").find("[id]").removeAttr("id"),h.appendTo(this.liveRegion),this.options.track&&t&&/^mouse/.test(t.type)?(this._on(this.document,{mousemove:a}),a(t)):r.position(e.extend({of:i},this.options.position)),r.hide(),this._show(r,this.options.show),this.options.track&&this.options.show&&this.options.show.delay&&(o=this.delayedShow=setInterval(function(){r.is(":visible")&&(a(l.of),clearInterval(o))},e.fx.interval)),this._trigger("open",t,{tooltip:r})}},_registerCloseHandlers:function(t,i){var s={keyup:function(t){if(t.keyCode===e.ui.keyCode.ESCAPE){var s=e.Event(t);s.currentTarget=i[0],this.close(s,!0)}}};i[0]!==this.element[0]&&(s.remove=function(){this._removeTooltip(this._find(i).tooltip)}),t&&"mouseover"!==t.type||(s.mouseleave="close"),t&&"focusin"!==t.type||(s.focusout="close"),this._on(!0,i,s)},close:function(t){var i,s=this,a=e(t?t.currentTarget:this.element),n=this._find(a);return n?(i=n.tooltip,n.closing||(clearInterval(this.delayedShow),a.data("ui-tooltip-title")&&!a.attr("title")&&a.attr("title",a.data("ui-tooltip-title")),this._removeDescribedBy(a),n.hiding=!0,i.stop(!0),this._hide(i,this.options.hide,function(){s._removeTooltip(e(this))}),a.removeData("ui-tooltip-open"),this._off(a,"mouseleave focusout keyup"),a[0]!==this.element[0]&&this._off(a,"remove"),this._off(this.document,"mousemove"),t&&"mouseleave"===t.type&&e.each(this.parents,function(t,i){e(i.element).attr("title",i.title),delete s.parents[t]
}),n.closing=!0,this._trigger("close",t,{tooltip:i}),n.hiding||(n.closing=!1)),void 0):(a.removeData("ui-tooltip-open"),void 0)},_tooltip:function(t){var i=e("<div>").attr("role","tooltip"),s=e("<div>").appendTo(i),a=i.uniqueId().attr("id");return this._addClass(s,"ui-tooltip-content"),this._addClass(i,"ui-tooltip","ui-widget ui-widget-content"),i.appendTo(this._appendTo(t)),this.tooltips[a]={element:t,tooltip:i}},_find:function(e){var t=e.data("ui-tooltip-id");return t?this.tooltips[t]:null},_removeTooltip:function(e){e.remove(),delete this.tooltips[e.attr("id")]},_appendTo:function(e){var t=e.closest(".ui-front, dialog");return t.length||(t=this.document[0].body),t},_destroy:function(){var t=this;e.each(this.tooltips,function(i,s){var a=e.Event("blur"),n=s.element;a.target=a.currentTarget=n[0],t.close(a,!0),e("#"+i).remove(),n.data("ui-tooltip-title")&&(n.attr("title")||n.attr("title",n.data("ui-tooltip-title")),n.removeData("ui-tooltip-title"))}),this.liveRegion.remove()}}),e.uiBackCompat!==!1&&e.widget("ui.tooltip",e.ui.tooltip,{options:{tooltipClass:null},_tooltip:function(){var e=this._superApply(arguments);return this.options.tooltipClass&&e.tooltip.addClass(this.options.tooltipClass),e}}),e.ui.tooltip;var f="ui-effects-",m="ui-effects-style",g="ui-effects-animated",v=e;e.effects={effect:{}},function(e,t){function i(e,t,i){var s=c[t.type]||{};return null==e?i||!t.def?null:t.def:(e=s.floor?~~e:parseFloat(e),isNaN(e)?t.def:s.mod?(e+s.mod)%s.mod:0>e?0:e>s.max?s.max:e)}function s(i){var s=l(),a=s._rgba=[];return i=i.toLowerCase(),f(h,function(e,n){var r,o=n.re.exec(i),h=o&&n.parse(o),l=n.space||"rgba";return h?(r=s[l](h),s[u[l].cache]=r[u[l].cache],a=s._rgba=r._rgba,!1):t}),a.length?("0,0,0,0"===a.join()&&e.extend(a,n.transparent),s):n[i]}function a(e,t,i){return i=(i+1)%1,1>6*i?e+6*(t-e)*i:1>2*i?t:2>3*i?e+6*(t-e)*(2/3-i):e}var n,r="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",o=/^([\-+])=\s*(\d+\.?\d*)/,h=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1],e[2],e[3],e[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[2.55*e[1],2.55*e[2],2.55*e[3],e[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(e){return[e[1],e[2]/100,e[3]/100,e[4]]}}],l=e.Color=function(t,i,s,a){return new e.Color.fn.parse(t,i,s,a)},u={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},c={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},d=l.support={},p=e("<p>")[0],f=e.each;p.style.cssText="background-color:rgba(1,1,1,.5)",d.rgba=p.style.backgroundColor.indexOf("rgba")>-1,f(u,function(e,t){t.cache="_"+e,t.props.alpha={idx:3,type:"percent",def:1}}),l.fn=e.extend(l.prototype,{parse:function(a,r,o,h){if(a===t)return this._rgba=[null,null,null,null],this;(a.jquery||a.nodeType)&&(a=e(a).css(r),r=t);var c=this,d=e.type(a),p=this._rgba=[];return r!==t&&(a=[a,r,o,h],d="array"),"string"===d?this.parse(s(a)||n._default):"array"===d?(f(u.rgba.props,function(e,t){p[t.idx]=i(a[t.idx],t)}),this):"object"===d?(a instanceof l?f(u,function(e,t){a[t.cache]&&(c[t.cache]=a[t.cache].slice())}):f(u,function(t,s){var n=s.cache;f(s.props,function(e,t){if(!c[n]&&s.to){if("alpha"===e||null==a[e])return;c[n]=s.to(c._rgba)}c[n][t.idx]=i(a[e],t,!0)}),c[n]&&0>e.inArray(null,c[n].slice(0,3))&&(c[n][3]=1,s.from&&(c._rgba=s.from(c[n])))}),this):t},is:function(e){var i=l(e),s=!0,a=this;return f(u,function(e,n){var r,o=i[n.cache];return o&&(r=a[n.cache]||n.to&&n.to(a._rgba)||[],f(n.props,function(e,i){return null!=o[i.idx]?s=o[i.idx]===r[i.idx]:t})),s}),s},_space:function(){var e=[],t=this;return f(u,function(i,s){t[s.cache]&&e.push(i)}),e.pop()},transition:function(e,t){var s=l(e),a=s._space(),n=u[a],r=0===this.alpha()?l("transparent"):this,o=r[n.cache]||n.to(r._rgba),h=o.slice();return s=s[n.cache],f(n.props,function(e,a){var n=a.idx,r=o[n],l=s[n],u=c[a.type]||{};null!==l&&(null===r?h[n]=l:(u.mod&&(l-r>u.mod/2?r+=u.mod:r-l>u.mod/2&&(r-=u.mod)),h[n]=i((l-r)*t+r,a)))}),this[a](h)},blend:function(t){if(1===this._rgba[3])return this;var i=this._rgba.slice(),s=i.pop(),a=l(t)._rgba;return l(e.map(i,function(e,t){return(1-s)*a[t]+s*e}))},toRgbaString:function(){var t="rgba(",i=e.map(this._rgba,function(e,t){return null==e?t>2?1:0:e});return 1===i[3]&&(i.pop(),t="rgb("),t+i.join()+")"},toHslaString:function(){var t="hsla(",i=e.map(this.hsla(),function(e,t){return null==e&&(e=t>2?1:0),t&&3>t&&(e=Math.round(100*e)+"%"),e});return 1===i[3]&&(i.pop(),t="hsl("),t+i.join()+")"},toHexString:function(t){var i=this._rgba.slice(),s=i.pop();return t&&i.push(~~(255*s)),"#"+e.map(i,function(e){return e=(e||0).toString(16),1===e.length?"0"+e:e}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),l.fn.parse.prototype=l.fn,u.hsla.to=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t,i,s=e[0]/255,a=e[1]/255,n=e[2]/255,r=e[3],o=Math.max(s,a,n),h=Math.min(s,a,n),l=o-h,u=o+h,c=.5*u;return t=h===o?0:s===o?60*(a-n)/l+360:a===o?60*(n-s)/l+120:60*(s-a)/l+240,i=0===l?0:.5>=c?l/u:l/(2-u),[Math.round(t)%360,i,c,null==r?1:r]},u.hsla.from=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t=e[0]/360,i=e[1],s=e[2],n=e[3],r=.5>=s?s*(1+i):s+i-s*i,o=2*s-r;return[Math.round(255*a(o,r,t+1/3)),Math.round(255*a(o,r,t)),Math.round(255*a(o,r,t-1/3)),n]},f(u,function(s,a){var n=a.props,r=a.cache,h=a.to,u=a.from;l.fn[s]=function(s){if(h&&!this[r]&&(this[r]=h(this._rgba)),s===t)return this[r].slice();var a,o=e.type(s),c="array"===o||"object"===o?s:arguments,d=this[r].slice();return f(n,function(e,t){var s=c["object"===o?e:t.idx];null==s&&(s=d[t.idx]),d[t.idx]=i(s,t)}),u?(a=l(u(d)),a[r]=d,a):l(d)},f(n,function(t,i){l.fn[t]||(l.fn[t]=function(a){var n,r=e.type(a),h="alpha"===t?this._hsla?"hsla":"rgba":s,l=this[h](),u=l[i.idx];return"undefined"===r?u:("function"===r&&(a=a.call(this,u),r=e.type(a)),null==a&&i.empty?this:("string"===r&&(n=o.exec(a),n&&(a=u+parseFloat(n[2])*("+"===n[1]?1:-1))),l[i.idx]=a,this[h](l)))})})}),l.hook=function(t){var i=t.split(" ");f(i,function(t,i){e.cssHooks[i]={set:function(t,a){var n,r,o="";if("transparent"!==a&&("string"!==e.type(a)||(n=s(a)))){if(a=l(n||a),!d.rgba&&1!==a._rgba[3]){for(r="backgroundColor"===i?t.parentNode:t;(""===o||"transparent"===o)&&r&&r.style;)try{o=e.css(r,"backgroundColor"),r=r.parentNode}catch(h){}a=a.blend(o&&"transparent"!==o?o:"_default")}a=a.toRgbaString()}try{t.style[i]=a}catch(h){}}},e.fx.step[i]=function(t){t.colorInit||(t.start=l(t.elem,i),t.end=l(t.end),t.colorInit=!0),e.cssHooks[i].set(t.elem,t.start.transition(t.end,t.pos))}})},l.hook(r),e.cssHooks.borderColor={expand:function(e){var t={};return f(["Top","Right","Bottom","Left"],function(i,s){t["border"+s+"Color"]=e}),t}},n=e.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(v),function(){function t(t){var i,s,a=t.ownerDocument.defaultView?t.ownerDocument.defaultView.getComputedStyle(t,null):t.currentStyle,n={};if(a&&a.length&&a[0]&&a[a[0]])for(s=a.length;s--;)i=a[s],"string"==typeof a[i]&&(n[e.camelCase(i)]=a[i]);else for(i in a)"string"==typeof a[i]&&(n[i]=a[i]);return n}function i(t,i){var s,n,r={};for(s in i)n=i[s],t[s]!==n&&(a[s]||(e.fx.step[s]||!isNaN(parseFloat(n)))&&(r[s]=n));return r}var s=["add","remove","toggle"],a={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};e.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(t,i){e.fx.step[i]=function(e){("none"!==e.end&&!e.setAttr||1===e.pos&&!e.setAttr)&&(v.style(e.elem,i,e.end),e.setAttr=!0)}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e.effects.animateClass=function(a,n,r,o){var h=e.speed(n,r,o);return this.queue(function(){var n,r=e(this),o=r.attr("class")||"",l=h.children?r.find("*").addBack():r;l=l.map(function(){var i=e(this);return{el:i,start:t(this)}}),n=function(){e.each(s,function(e,t){a[t]&&r[t+"Class"](a[t])})},n(),l=l.map(function(){return this.end=t(this.el[0]),this.diff=i(this.start,this.end),this}),r.attr("class",o),l=l.map(function(){var t=this,i=e.Deferred(),s=e.extend({},h,{queue:!1,complete:function(){i.resolve(t)}});return this.el.animate(this.diff,s),i.promise()}),e.when.apply(e,l.get()).done(function(){n(),e.each(arguments,function(){var t=this.el;e.each(this.diff,function(e){t.css(e,"")})}),h.complete.call(r[0])})})},e.fn.extend({addClass:function(t){return function(i,s,a,n){return s?e.effects.animateClass.call(this,{add:i},s,a,n):t.apply(this,arguments)}}(e.fn.addClass),removeClass:function(t){return function(i,s,a,n){return arguments.length>1?e.effects.animateClass.call(this,{remove:i},s,a,n):t.apply(this,arguments)}}(e.fn.removeClass),toggleClass:function(t){return function(i,s,a,n,r){return"boolean"==typeof s||void 0===s?a?e.effects.animateClass.call(this,s?{add:i}:{remove:i},a,n,r):t.apply(this,arguments):e.effects.animateClass.call(this,{toggle:i},s,a,n)}}(e.fn.toggleClass),switchClass:function(t,i,s,a,n){return e.effects.animateClass.call(this,{add:i,remove:t},s,a,n)}})}(),function(){function t(t,i,s,a){return e.isPlainObject(t)&&(i=t,t=t.effect),t={effect:t},null==i&&(i={}),e.isFunction(i)&&(a=i,s=null,i={}),("number"==typeof i||e.fx.speeds[i])&&(a=s,s=i,i={}),e.isFunction(s)&&(a=s,s=null),i&&e.extend(t,i),s=s||i.duration,t.duration=e.fx.off?0:"number"==typeof s?s:s in e.fx.speeds?e.fx.speeds[s]:e.fx.speeds._default,t.complete=a||i.complete,t}function i(t){return!t||"number"==typeof t||e.fx.speeds[t]?!0:"string"!=typeof t||e.effects.effect[t]?e.isFunction(t)?!0:"object"!=typeof t||t.effect?!1:!0:!0}function s(e,t){var i=t.outerWidth(),s=t.outerHeight(),a=/^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,n=a.exec(e)||["",0,i,s,0];return{top:parseFloat(n[1])||0,right:"auto"===n[2]?i:parseFloat(n[2]),bottom:"auto"===n[3]?s:parseFloat(n[3]),left:parseFloat(n[4])||0}}e.expr&&e.expr.filters&&e.expr.filters.animated&&(e.expr.filters.animated=function(t){return function(i){return!!e(i).data(g)||t(i)}}(e.expr.filters.animated)),e.uiBackCompat!==!1&&e.extend(e.effects,{save:function(e,t){for(var i=0,s=t.length;s>i;i++)null!==t[i]&&e.data(f+t[i],e[0].style[t[i]])},restore:function(e,t){for(var i,s=0,a=t.length;a>s;s++)null!==t[s]&&(i=e.data(f+t[s]),e.css(t[s],i))},setMode:function(e,t){return"toggle"===t&&(t=e.is(":hidden")?"show":"hide"),t},createWrapper:function(t){if(t.parent().is(".ui-effects-wrapper"))return t.parent();var i={width:t.outerWidth(!0),height:t.outerHeight(!0),"float":t.css("float")},s=e("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),a={width:t.width(),height:t.height()},n=document.activeElement;try{n.id}catch(r){n=document.body}return t.wrap(s),(t[0]===n||e.contains(t[0],n))&&e(n).trigger("focus"),s=t.parent(),"static"===t.css("position")?(s.css({position:"relative"}),t.css({position:"relative"})):(e.extend(i,{position:t.css("position"),zIndex:t.css("z-index")}),e.each(["top","left","bottom","right"],function(e,s){i[s]=t.css(s),isNaN(parseInt(i[s],10))&&(i[s]="auto")}),t.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),t.css(a),s.css(i).show()},removeWrapper:function(t){var i=document.activeElement;return t.parent().is(".ui-effects-wrapper")&&(t.parent().replaceWith(t),(t[0]===i||e.contains(t[0],i))&&e(i).trigger("focus")),t}}),e.extend(e.effects,{version:"1.12.1",define:function(t,i,s){return s||(s=i,i="effect"),e.effects.effect[t]=s,e.effects.effect[t].mode=i,s},scaledDimensions:function(e,t,i){if(0===t)return{height:0,width:0,outerHeight:0,outerWidth:0};var s="horizontal"!==i?(t||100)/100:1,a="vertical"!==i?(t||100)/100:1;return{height:e.height()*a,width:e.width()*s,outerHeight:e.outerHeight()*a,outerWidth:e.outerWidth()*s}},clipToBox:function(e){return{width:e.clip.right-e.clip.left,height:e.clip.bottom-e.clip.top,left:e.clip.left,top:e.clip.top}},unshift:function(e,t,i){var s=e.queue();t>1&&s.splice.apply(s,[1,0].concat(s.splice(t,i))),e.dequeue()},saveStyle:function(e){e.data(m,e[0].style.cssText)},restoreStyle:function(e){e[0].style.cssText=e.data(m)||"",e.removeData(m)},mode:function(e,t){var i=e.is(":hidden");return"toggle"===t&&(t=i?"show":"hide"),(i?"hide"===t:"show"===t)&&(t="none"),t},getBaseline:function(e,t){var i,s;switch(e[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=e[0]/t.height}switch(e[1]){case"left":s=0;break;case"center":s=.5;break;case"right":s=1;break;default:s=e[1]/t.width}return{x:s,y:i}},createPlaceholder:function(t){var i,s=t.css("position"),a=t.position();return t.css({marginTop:t.css("marginTop"),marginBottom:t.css("marginBottom"),marginLeft:t.css("marginLeft"),marginRight:t.css("marginRight")}).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()),/^(static|relative)/.test(s)&&(s="absolute",i=e("<"+t[0].nodeName+">").insertAfter(t).css({display:/^(inline|ruby)/.test(t.css("display"))?"inline-block":"block",visibility:"hidden",marginTop:t.css("marginTop"),marginBottom:t.css("marginBottom"),marginLeft:t.css("marginLeft"),marginRight:t.css("marginRight"),"float":t.css("float")}).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).addClass("ui-effects-placeholder"),t.data(f+"placeholder",i)),t.css({position:s,left:a.left,top:a.top}),i},removePlaceholder:function(e){var t=f+"placeholder",i=e.data(t);i&&(i.remove(),e.removeData(t))},cleanUp:function(t){e.effects.restoreStyle(t),e.effects.removePlaceholder(t)},setTransition:function(t,i,s,a){return a=a||{},e.each(i,function(e,i){var n=t.cssUnit(i);n[0]>0&&(a[i]=n[0]*s+n[1])}),a}}),e.fn.extend({effect:function(){function i(t){function i(){o.removeData(g),e.effects.cleanUp(o),"hide"===s.mode&&o.hide(),r()}function r(){e.isFunction(h)&&h.call(o[0]),e.isFunction(t)&&t()}var o=e(this);s.mode=u.shift(),e.uiBackCompat===!1||n?"none"===s.mode?(o[l](),r()):a.call(o[0],s,i):(o.is(":hidden")?"hide"===l:"show"===l)?(o[l](),r()):a.call(o[0],s,r)}var s=t.apply(this,arguments),a=e.effects.effect[s.effect],n=a.mode,r=s.queue,o=r||"fx",h=s.complete,l=s.mode,u=[],c=function(t){var i=e(this),s=e.effects.mode(i,l)||n;i.data(g,!0),u.push(s),n&&("show"===s||s===n&&"hide"===s)&&i.show(),n&&"none"===s||e.effects.saveStyle(i),e.isFunction(t)&&t()};return e.fx.off||!a?l?this[l](s.duration,h):this.each(function(){h&&h.call(this)}):r===!1?this.each(c).each(i):this.queue(o,c).queue(o,i)},show:function(e){return function(s){if(i(s))return e.apply(this,arguments);var a=t.apply(this,arguments);return a.mode="show",this.effect.call(this,a)}}(e.fn.show),hide:function(e){return function(s){if(i(s))return e.apply(this,arguments);var a=t.apply(this,arguments);return a.mode="hide",this.effect.call(this,a)}}(e.fn.hide),toggle:function(e){return function(s){if(i(s)||"boolean"==typeof s)return e.apply(this,arguments);var a=t.apply(this,arguments);return a.mode="toggle",this.effect.call(this,a)}}(e.fn.toggle),cssUnit:function(t){var i=this.css(t),s=[];return e.each(["em","px","%","pt"],function(e,t){i.indexOf(t)>0&&(s=[parseFloat(i),t])}),s},cssClip:function(e){return e?this.css("clip","rect("+e.top+"px "+e.right+"px "+e.bottom+"px "+e.left+"px)"):s(this.css("clip"),this)},transfer:function(t,i){var s=e(this),a=e(t.to),n="fixed"===a.css("position"),r=e("body"),o=n?r.scrollTop():0,h=n?r.scrollLeft():0,l=a.offset(),u={top:l.top-o,left:l.left-h,height:a.innerHeight(),width:a.innerWidth()},c=s.offset(),d=e("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(t.className).css({top:c.top-o,left:c.left-h,height:s.innerHeight(),width:s.innerWidth(),position:n?"fixed":"absolute"}).animate(u,t.duration,t.easing,function(){d.remove(),e.isFunction(i)&&i()})}}),e.fx.step.clip=function(t){t.clipInit||(t.start=e(t.elem).cssClip(),"string"==typeof t.end&&(t.end=s(t.end,t.elem)),t.clipInit=!0),e(t.elem).cssClip({top:t.pos*(t.end.top-t.start.top)+t.start.top,right:t.pos*(t.end.right-t.start.right)+t.start.right,bottom:t.pos*(t.end.bottom-t.start.bottom)+t.start.bottom,left:t.pos*(t.end.left-t.start.left)+t.start.left})}}(),function(){var t={};e.each(["Quad","Cubic","Quart","Quint","Expo"],function(e,i){t[i]=function(t){return Math.pow(t,e+2)}}),e.extend(t,{Sine:function(e){return 1-Math.cos(e*Math.PI/2)},Circ:function(e){return 1-Math.sqrt(1-e*e)},Elastic:function(e){return 0===e||1===e?e:-Math.pow(2,8*(e-1))*Math.sin((80*(e-1)-7.5)*Math.PI/15)},Back:function(e){return e*e*(3*e-2)},Bounce:function(e){for(var t,i=4;((t=Math.pow(2,--i))-1)/11>e;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*t-2)/22-e,2)}}),e.each(t,function(t,i){e.easing["easeIn"+t]=i,e.easing["easeOut"+t]=function(e){return 1-i(1-e)},e.easing["easeInOut"+t]=function(e){return.5>e?i(2*e)/2:1-i(-2*e+2)/2}})}();var y=e.effects;e.effects.define("blind","hide",function(t,i){var s={up:["bottom","top"],vertical:["bottom","top"],down:["top","bottom"],left:["right","left"],horizontal:["right","left"],right:["left","right"]},a=e(this),n=t.direction||"up",r=a.cssClip(),o={clip:e.extend({},r)},h=e.effects.createPlaceholder(a);o.clip[s[n][0]]=o.clip[s[n][1]],"show"===t.mode&&(a.cssClip(o.clip),h&&h.css(e.effects.clipToBox(o)),o.clip=r),h&&h.animate(e.effects.clipToBox(o),t.duration,t.easing),a.animate(o,{queue:!1,duration:t.duration,easing:t.easing,complete:i})}),e.effects.define("bounce",function(t,i){var s,a,n,r=e(this),o=t.mode,h="hide"===o,l="show"===o,u=t.direction||"up",c=t.distance,d=t.times||5,p=2*d+(l||h?1:0),f=t.duration/p,m=t.easing,g="up"===u||"down"===u?"top":"left",v="up"===u||"left"===u,y=0,_=r.queue().length;for(e.effects.createPlaceholder(r),n=r.css(g),c||(c=r["top"===g?"outerHeight":"outerWidth"]()/3),l&&(a={opacity:1},a[g]=n,r.css("opacity",0).css(g,v?2*-c:2*c).animate(a,f,m)),h&&(c/=Math.pow(2,d-1)),a={},a[g]=n;d>y;y++)s={},s[g]=(v?"-=":"+=")+c,r.animate(s,f,m).animate(a,f,m),c=h?2*c:c/2;h&&(s={opacity:0},s[g]=(v?"-=":"+=")+c,r.animate(s,f,m)),r.queue(i),e.effects.unshift(r,_,p+1)}),e.effects.define("clip","hide",function(t,i){var s,a={},n=e(this),r=t.direction||"vertical",o="both"===r,h=o||"horizontal"===r,l=o||"vertical"===r;s=n.cssClip(),a.clip={top:l?(s.bottom-s.top)/2:s.top,right:h?(s.right-s.left)/2:s.right,bottom:l?(s.bottom-s.top)/2:s.bottom,left:h?(s.right-s.left)/2:s.left},e.effects.createPlaceholder(n),"show"===t.mode&&(n.cssClip(a.clip),a.clip=s),n.animate(a,{queue:!1,duration:t.duration,easing:t.easing,complete:i})}),e.effects.define("drop","hide",function(t,i){var s,a=e(this),n=t.mode,r="show"===n,o=t.direction||"left",h="up"===o||"down"===o?"top":"left",l="up"===o||"left"===o?"-=":"+=",u="+="===l?"-=":"+=",c={opacity:0};e.effects.createPlaceholder(a),s=t.distance||a["top"===h?"outerHeight":"outerWidth"](!0)/2,c[h]=l+s,r&&(a.css(c),c[h]=u+s,c.opacity=1),a.animate(c,{queue:!1,duration:t.duration,easing:t.easing,complete:i})}),e.effects.define("explode","hide",function(t,i){function s(){_.push(this),_.length===c*d&&a()}function a(){p.css({visibility:"visible"}),e(_).remove(),i()}var n,r,o,h,l,u,c=t.pieces?Math.round(Math.sqrt(t.pieces)):3,d=c,p=e(this),f=t.mode,m="show"===f,g=p.show().css("visibility","hidden").offset(),v=Math.ceil(p.outerWidth()/d),y=Math.ceil(p.outerHeight()/c),_=[];for(n=0;c>n;n++)for(h=g.top+n*y,u=n-(c-1)/2,r=0;d>r;r++)o=g.left+r*v,l=r-(d-1)/2,p.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-r*v,top:-n*y}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:v,height:y,left:o+(m?l*v:0),top:h+(m?u*y:0),opacity:m?0:1}).animate({left:o+(m?0:l*v),top:h+(m?0:u*y),opacity:m?1:0},t.duration||500,t.easing,s)}),e.effects.define("fade","toggle",function(t,i){var s="show"===t.mode;e(this).css("opacity",s?0:1).animate({opacity:s?1:0},{queue:!1,duration:t.duration,easing:t.easing,complete:i})}),e.effects.define("fold","hide",function(t,i){var s=e(this),a=t.mode,n="show"===a,r="hide"===a,o=t.size||15,h=/([0-9]+)%/.exec(o),l=!!t.horizFirst,u=l?["right","bottom"]:["bottom","right"],c=t.duration/2,d=e.effects.createPlaceholder(s),p=s.cssClip(),f={clip:e.extend({},p)},m={clip:e.extend({},p)},g=[p[u[0]],p[u[1]]],v=s.queue().length;h&&(o=parseInt(h[1],10)/100*g[r?0:1]),f.clip[u[0]]=o,m.clip[u[0]]=o,m.clip[u[1]]=0,n&&(s.cssClip(m.clip),d&&d.css(e.effects.clipToBox(m)),m.clip=p),s.queue(function(i){d&&d.animate(e.effects.clipToBox(f),c,t.easing).animate(e.effects.clipToBox(m),c,t.easing),i()}).animate(f,c,t.easing).animate(m,c,t.easing).queue(i),e.effects.unshift(s,v,4)}),e.effects.define("highlight","show",function(t,i){var s=e(this),a={backgroundColor:s.css("backgroundColor")};"hide"===t.mode&&(a.opacity=0),e.effects.saveStyle(s),s.css({backgroundImage:"none",backgroundColor:t.color||"#ffff99"}).animate(a,{queue:!1,duration:t.duration,easing:t.easing,complete:i})}),e.effects.define("size",function(t,i){var s,a,n,r=e(this),o=["fontSize"],h=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],l=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],u=t.mode,c="effect"!==u,d=t.scale||"both",p=t.origin||["middle","center"],f=r.css("position"),m=r.position(),g=e.effects.scaledDimensions(r),v=t.from||g,y=t.to||e.effects.scaledDimensions(r,0);e.effects.createPlaceholder(r),"show"===u&&(n=v,v=y,y=n),a={from:{y:v.height/g.height,x:v.width/g.width},to:{y:y.height/g.height,x:y.width/g.width}},("box"===d||"both"===d)&&(a.from.y!==a.to.y&&(v=e.effects.setTransition(r,h,a.from.y,v),y=e.effects.setTransition(r,h,a.to.y,y)),a.from.x!==a.to.x&&(v=e.effects.setTransition(r,l,a.from.x,v),y=e.effects.setTransition(r,l,a.to.x,y))),("content"===d||"both"===d)&&a.from.y!==a.to.y&&(v=e.effects.setTransition(r,o,a.from.y,v),y=e.effects.setTransition(r,o,a.to.y,y)),p&&(s=e.effects.getBaseline(p,g),v.top=(g.outerHeight-v.outerHeight)*s.y+m.top,v.left=(g.outerWidth-v.outerWidth)*s.x+m.left,y.top=(g.outerHeight-y.outerHeight)*s.y+m.top,y.left=(g.outerWidth-y.outerWidth)*s.x+m.left),r.css(v),("content"===d||"both"===d)&&(h=h.concat(["marginTop","marginBottom"]).concat(o),l=l.concat(["marginLeft","marginRight"]),r.find("*[width]").each(function(){var i=e(this),s=e.effects.scaledDimensions(i),n={height:s.height*a.from.y,width:s.width*a.from.x,outerHeight:s.outerHeight*a.from.y,outerWidth:s.outerWidth*a.from.x},r={height:s.height*a.to.y,width:s.width*a.to.x,outerHeight:s.height*a.to.y,outerWidth:s.width*a.to.x};a.from.y!==a.to.y&&(n=e.effects.setTransition(i,h,a.from.y,n),r=e.effects.setTransition(i,h,a.to.y,r)),a.from.x!==a.to.x&&(n=e.effects.setTransition(i,l,a.from.x,n),r=e.effects.setTransition(i,l,a.to.x,r)),c&&e.effects.saveStyle(i),i.css(n),i.animate(r,t.duration,t.easing,function(){c&&e.effects.restoreStyle(i)})})),r.animate(y,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){var t=r.offset();0===y.opacity&&r.css("opacity",v.opacity),c||(r.css("position","static"===f?"relative":f).offset(t),e.effects.saveStyle(r)),i()}})}),e.effects.define("scale",function(t,i){var s=e(this),a=t.mode,n=parseInt(t.percent,10)||(0===parseInt(t.percent,10)?0:"effect"!==a?0:100),r=e.extend(!0,{from:e.effects.scaledDimensions(s),to:e.effects.scaledDimensions(s,n,t.direction||"both"),origin:t.origin||["middle","center"]},t);t.fade&&(r.from.opacity=1,r.to.opacity=0),e.effects.effect.size.call(this,r,i)}),e.effects.define("puff","hide",function(t,i){var s=e.extend(!0,{},t,{fade:!0,percent:parseInt(t.percent,10)||150});e.effects.effect.scale.call(this,s,i)}),e.effects.define("pulsate","show",function(t,i){var s=e(this),a=t.mode,n="show"===a,r="hide"===a,o=n||r,h=2*(t.times||5)+(o?1:0),l=t.duration/h,u=0,c=1,d=s.queue().length;for((n||!s.is(":visible"))&&(s.css("opacity",0).show(),u=1);h>c;c++)s.animate({opacity:u},l,t.easing),u=1-u;s.animate({opacity:u},l,t.easing),s.queue(i),e.effects.unshift(s,d,h+1)}),e.effects.define("shake",function(t,i){var s=1,a=e(this),n=t.direction||"left",r=t.distance||20,o=t.times||3,h=2*o+1,l=Math.round(t.duration/h),u="up"===n||"down"===n?"top":"left",c="up"===n||"left"===n,d={},p={},f={},m=a.queue().length;for(e.effects.createPlaceholder(a),d[u]=(c?"-=":"+=")+r,p[u]=(c?"+=":"-=")+2*r,f[u]=(c?"-=":"+=")+2*r,a.animate(d,l,t.easing);o>s;s++)a.animate(p,l,t.easing).animate(f,l,t.easing);a.animate(p,l,t.easing).animate(d,l/2,t.easing).queue(i),e.effects.unshift(a,m,h+1)}),e.effects.define("slide","show",function(t,i){var s,a,n=e(this),r={up:["bottom","top"],down:["top","bottom"],left:["right","left"],right:["left","right"]},o=t.mode,h=t.direction||"left",l="up"===h||"down"===h?"top":"left",u="up"===h||"left"===h,c=t.distance||n["top"===l?"outerHeight":"outerWidth"](!0),d={};e.effects.createPlaceholder(n),s=n.cssClip(),a=n.position()[l],d[l]=(u?-1:1)*c+a,d.clip=n.cssClip(),d.clip[r[h][1]]=d.clip[r[h][0]],"show"===o&&(n.cssClip(d.clip),n.css(l,d[l]),d.clip=s,d[l]=a),n.animate(d,{queue:!1,duration:t.duration,easing:t.easing,complete:i})});var y;e.uiBackCompat!==!1&&(y=e.effects.define("transfer",function(t,i){e(this).transfer(t,i)}))});
/*

SMINT V1.0 by Robert McCracken
SMINT V2.0 by robert McCracken with some awesome help from Ryan Clarke (@clarkieryan) and mcpacosy ‏(@mcpacosy)
SMINT V3.0 by robert McCracken with some awesome help from Ryan Clarke (@clarkieryan) and mcpacosy ‏(@mcpacosy)

SMINT is my first dabble into jQuery plugins!

http://www.outyear.co.uk/smint/

If you like Smint, or have suggestions on how it could be improved, send me a tweet @rabmyself

*/


(function(){


	$.fn.smint = function( options ) {

		var settings = $.extend({
			'scrollSpeed'  : 500,
			'mySelector'     : 'div'
		}, options);

		// adding a class to users div
		$(this).addClass('smint');


				
		
		//Set the variables needed
		var optionLocs = new Array(),
			lastScrollTop = 0,
			menuHeight = $(".smint").height(),
			smint = $('.smint'),
        	smintA = $('.smint a'),
        	myOffset = smint.height();

      



		if ( settings.scrollSpeed ) {
				var scrollSpeed = settings.scrollSpeed
			}

		if ( settings.mySelector ) {
				var mySelector = settings.mySelector
		};



		return smintA.each( function(index) {
            
			var id = $(this).attr('href').split('#')[1];

			if (!$(this).hasClass("extLink")) {
				$(this).attr('id', id);
			}

			
			//Fill the menu
			optionLocs.push(Array(
				$(mySelector+"."+id).position().top-menuHeight, 
				$(mySelector+"."+id).height()+$(mySelector+"."+id).position().top, id)
			);

			///////////////////////////////////

			// get initial top offset for the menu 
			var stickyTop = smint.offset().top;	

			// check position and make sticky if needed
			var stickyMenu = function(direction){

				// current distance top
				var scrollTop = $(window).scrollTop()+myOffset; 

				// if we scroll more than the navigation, change its position to fixed and add class 'fxd', otherwise change it back to absolute and remove the class
				if (scrollTop > stickyTop+myOffset) { 
					smint.css({ 'position': 'fixed', 'top':0,'left':0 }).addClass('fxd');

					// add padding to the body to make up for the loss in heigt when the menu goes to a fixed position.
					// When an item is fixed, its removed from the flow so its height doesnt impact the other items on the page
					$('body').css('padding-top', menuHeight );	
				} else {
					smint.css( 'position', 'relative').removeClass('fxd'); 
					//remove the padding we added.
					$('body').css('padding-top', '0' );	
				}   

				// Check if the position is inside then change the menu
				// Courtesy of Ryan Clarke (@clarkieryan)
				if(optionLocs[index][0] <= scrollTop && scrollTop <= optionLocs[index][1]){	
					if(direction == "up"){
						$("#"+id).addClass("active");
						$("#"+optionLocs[index+1][2]).removeClass("active");
					} else if(index > 0) {
						$("#"+id).addClass("active");
						$("#"+optionLocs[index-1][2]).removeClass("active");
					} else if(direction == undefined){
						$("#"+id).addClass("active");
					}
					$.each(optionLocs, function(i){
						if(id != optionLocs[i][2]){
							
							$("#"+optionLocs[i][2]).removeClass("active");
						}
					});
				}
			};

			// run functions
			stickyMenu();

			// run function every time you scroll
			$(window).scroll(function() {
				//Get the direction of scroll
				var st = $(this).scrollTop()+myOffset;
				if (st > lastScrollTop) {
				    direction = "down";
				} else if (st < lastScrollTop ){
				    direction = "up";
				}
				lastScrollTop = st;
				stickyMenu(direction);

				// Check if at bottom of page, if so, add class to last <a> as sometimes the last div
				// isnt long enough to scroll to the top of the page and trigger the active state.

				if($(window).scrollTop() + $(window).height() == $(document).height()) {
	       			smintA.removeClass('active')
	       			$(".smint a:not('.extLink'):last").addClass('active')
	       			
   				} else {
   					smintA.last().removeClass('active')
   				}
			});

			///////////////////////////////////////
        
        	$(this).on('click', function(e){
				// gets the height of the users div. This is used for off-setting the scroll so the menu doesnt overlap any content in the div they jst scrolled to
				var myOffset = smint.height();   

        		// stops hrefs making the page jump when clicked
				e.preventDefault();
				
				// get the hash of the button you just clicked
				var hash = $(this).attr('href').split('#')[1];

				

				var goTo =  $(mySelector+'.'+ hash).offset().top-myOffset;
				
				// Scroll the page to the desired position!
				$("html, body").stop().animate({ scrollTop: goTo }, scrollSpeed);
				
				// if the link has the '.extLink' class it will be ignored 
		 		// Courtesy of mcpacosy ‏(@mcpacosy)
				if ($(this).hasClass("extLink"))
                {
                    return false;
                }

			});	


			//This lets yo use links in body text to scroll. Just add the class 'intLink' to your button and it will scroll

			$('.intLink').on('click', function(e){
				var myOffset = smint.height();   

				e.preventDefault();
				
				var hash = $(this).attr('href').split('#')[1];

				if (smint.hasClass('fxd')) {
					var goTo =  $(mySelector+'.'+ hash).position().top-myOffset;
				} else {
					var goTo =  $(mySelector+'.'+ hash).position().top-myOffset*2;
				}
				
				$("html, body").stop().animate({ scrollTop: goTo }, scrollSpeed);

				if ($(this).hasClass("extLink"))
                {
                    return false;
                }

			});	
		});

	};

	$.fn.smint.defaults = { 'scrollSpeed': 500, 'mySelector': 'div'};
})(jQuery);
/**
 * overhang.min.js
 * Paul Krishnamurthy 2016
 */

$.fn.overhang=function(arguments){function f(c,d){b.slideUp(e.speed,function(){c&&e.callback(null!==d?a.data(d):"")})}var a=$(this),b=$("<div class='overhang'></div>");$(".overhang").remove();var c={success:["#2ECC71","#27AE60"],error:["#E74C3C","#C0392B"],warn:["#E67E22","#D35400"],info:["#3498DB","#2980B9"],prompt:["#9B59B6","#8E44AD"],confirm:["#1ABC9C","#16A085"],blank:["#34495E","#2C3E50"]},d={type:"success",message:"This is an overhang.js message!",textColor:"#FFFFFF",yesMessage:"Yes",noMessage:"No",yesColor:"#2ECC71",noColor:"#E74C3C",duration:1.5,speed:500,closeConfirm:!1,upper:!1,easing:"easeOutBounce",html:!1,callback:function(){}},e=$.extend(d,arguments),g=["success","error","warn","info","prompt","confirm"];$.inArray(e.type,g)===-1&&(e.type="blank",console.log("You have entered invalid type name for an overhang message.")),arguments.custom?(e.primary=arguments.primary,e.accent=arguments.accent):(e.primary=c[e.type][0]||"#ECF0F1",e.accent=c[e.type][1]||"#BDC3C7"),"prompt"!==e.type&&"confirm"!==e.type||(e.primary=arguments.primary||c[e.type][0],e.accent=arguments.accent||c[e.type][1],e.closeConfirm=!0),b.css("background-color",e.primary),b.css("border-bottom","6px solid "+e.accent);var h=$("<span class='overhang-message'></span>");h.css("color",e.textColor),e.html?h.html(e.message):h.text(e.upper?e.message.toUpperCase():e.message),b.append(h);var i=$("<input class='overhang-prompt-field' />"),j=$("<button class='overhang-yes-option'>"+e.yesMessage+"</button>"),k=$("<button class='overhang-no-option'>"+e.noMessage+"</button>");if(j.css("background-color",e.yesColor),k.css("background-color",e.noColor),e.closeConfirm){var l=$("<span class='overhang-close'></span>");l.css("color",e.accent),"confirm"!==e.type&&b.append(l)}"prompt"===e.type?(b.append(i),a.data("overhangPrompt",null),i.keydown(function(b){13==b.keyCode&&(a.data("overhangPrompt",i.val()),f(!0,"overhangPrompt"))})):"confirm"===e.type&&(b.append(j),b.append(k),b.append(l),a.data("overhangConfirm",null),j.click(function(){a.data("overhangConfirm",!0),f(!0,"overhangConfirm")}),k.click(function(){a.data("overhangConfirm",!1),f(!0,"overhangConfirm")})),a.append(b),e.closeConfirm?(b.slideDown(e.speed,e.easing),l.click(function(){"prompt"!==e.type&&"confirm"!==e.type?f(!0,null):f(!1,null)})):b.slideDown(e.speed,e.easing).delay(1e3*e.duration).slideUp(e.speed,function(){f(!0,null)})};


function rem(e) {
    var t = $("<div />");
    t.css({
        position: "absolute",
        left: -9999,
        top: e + "rem"
    }),
        t.appendTo("body");
    var n = t.position().top;
    return t.remove(),
        n
}

function isSmallDevice() {
    return $(window).width() < 1200
}

function Display(e) {
    var t = this;
    t.canvas = e,
        t.context = void 0,
        t.framerate = 30,
        t.numFrames = 0,
        t.paused = !0,
        t.nextRedraw = 0,
        t.scale = 1,
        t.listeners = {},
        t.draw = {
            continuous: !1,
            info: !1
        },
        t.info = {
            fps: 0,
            lastFrameTime: 0,
            runningFrameTime: 0
        },
        t.frames_for_menu_to_ramin_visible = 3 * t.framerate,
        t.triggered_initial_mouseover = !1,
        t.logo = {},
        t.init = function () {
            return t.canvas.getContext ? (t.context = t.canvas.getContext("2d"), t.context.scale(t.scale, t.scale), t.calculate_scale(), t.canvas.onmousedown = function (e) {
                return t.fireEvent("mouseDown", e),
                    !1
            },
                t.canvas.onmouseup = function (e) {
                    return t.fireEvent("mouseUp", e),
                        !1
                },
                t.canvas.onmouseover = function (e) {
                    t.fireEvent("mouseOver", e)
                },
                t.canvas.onmousemove = function (e) {
                    t.fireEvent("mouseMove", e)
                },
                window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame, t.addListener("draw", t), t.addListener("afterDraw", t), t.addListener("newFrame", t), t.main(), void t.setupStats()) : void t.error("No Context")
        },
        t.calculate_scale = function () {
            t.width = t.canvas.width / t.scale,
                t.height = t.canvas.height / t.scale
        },
        t.addListener = function (e, n) {
            t.listeners[e] || (t.listeners[e] = []),
                t.listeners[e].push(n)
        },
        t.fireEvent = function (e, n) {
            if (t.listeners[e] && t.listeners[e].length > 0) for (var i = "on" + e.substr(0, 1).toUpperCase() + e.substr(1), o = 0; o < t.listeners[e].length; o++) t.listeners[e][o][i] && t.listeners[e][o][i].call(t.listeners[e][o], n, t)
        },
        t.main = function () {
            t.paused || t.nextFrame(),
                window.requestAnimFrame ? window.requestAnimFrame(function () {
                    t.main()
                }) : t.nextRedraw = setTimeout(function () {
                        t.main()
                    },
                    1e3 / t.framerate)
        },
        t.nextFrame = function () {
            t.fireEvent("newFrame"),
                t.fireEvent("beforeUpdate"),
                t.fireEvent("update"),
                t.fireEvent("afterUpdate"),
                t.fireEvent("beforeDraw"),
                t.fireEvent("draw"),
                t.fireEvent("afterDraw")
        },
        t.error = function (e) {
            t.fireEvent("error", {
                text: e
            })
        },
        t.getFps = function () {
            return (1e3 / t.info.runningFrameTime).toFixed(1)
        },
        t.onDraw = function () {
            t.tick()
        },
        t.onAfterDraw = function () {
            t.draw.info && this.stats.end()
        },
        t.drawStats = function () {
        },
        t.onNewFrame = function () {
            if (t.draw.info && this.stats.begin(), t.numFrames > t.frames_for_menu_to_ramin_visible && !t.triggered_initial_mouseover) {
                var e = $.Event("mousemove");
                t.canvas.onmousemove(e),
                    t.triggered_initial_mouseover = !0
            }
            t.draw.continuous || t.clear()
        },
        t.drawLine = function (e, n) {
            t.context.beginPath(),
                t.context.moveTo(e.x, e.y),
                t.context.lineTo(n.x, n.y),
                t.context.stroke()
        },
        t.drawText = function (e, n, i) {
            t.context.fillText(e, n.x, n.y, i)
        },
        t.drawCircle = function (e, n) {
            t.context.beginPath(),
                t.context.arc(e.x, e.y, n, 0, 2 * Math.PI),
                t.context.closePath(),
                t.context.fill()
        },
        t.fillStyle = function (e) {
            t.context.fillStyle = e
        },
        t.strokeStyle = function (e) {
            t.context.strokeStyle = e
        },
        t.tick = function () {
            if (t.numFrames++, t.info.lastFrameTime) {
                var e = (new Date).getTime(),
                    n = e - t.info.lastFrameTime;
                t.info.runningFrameTime = .8 * t.info.runningFrameTime + .2 * n,
                    t.info.lastFrameTime = e
            } else t.info.lastFrameTime = (new Date).getTime()
        },
        t.setupStats = function () {
            return t.draw.info ? (this.stats = new Stats, this.stats.domElement.style.position = "absolute", this.stats.domElement.style.bottom = "0px", this.stats.domElement.style.right = "0px", void document.body.appendChild(this.stats.domElement)) : !1
        },
        t.clear = function () {
            t.context.clearRect(0, 0, t.width, t.height)
        },
        t.start = function () {
            t.paused = !1
        },
        t.stop = function () {
            t.paused = !0
        },
        t.togglePause = function () {
            t.paused = !t.paused
        },
        t.unpause = t.start,
        t.pause = t.stop,
        t.step = function () {
            t.stop(),
                t.nextFrame()
        },
        t.drawConsensysLogo = function () {
            var e = t.canvas.width / 2 - t.consensys_logo.width / 2,
                n = t.canvas.height / 2 - t.consensys_logo.height / 2;
            t.context.drawImage(t.consensys_logo, e, n, 150, 150)
        }
}

function Particle(e, t) {
    this.position = e,
        this.velocity = t,
        this.acceleration = new Vector(0, 0),
        this.ttl = -1,
        this.lived = 0,
        this.isFixed = 0,
        this.fillStyle = "white",  //闄堝織鍚�
        this.radius = 1 + 2 * Math.random(),
        this.connects = 0,
    this.radius >= 2.5 && (this.connects = 1),
    this.radius < 2.5 && (this.fillStyle = "#abd1ff", this.ttl = 1),
        this.radius = 2
}

function ParticleEmitter(e, t) {
    this.position = e,
        this.velocity = t,
        this.size = 8,
        this.particleLife = -1,
        this.spread = .3,
        this.emissionRate = .08,
        this.moveTo = function (e) {
            this.position = e
        },
        this.addParticle = function () {
            var e = new Particle(this.position.copy(), Vector.fromAngle(this.velocity.getAngle() + this.spread - Math.random() * this.spread * 2, this.velocity.getMagnitude()));
            return e
        },
        this.toString = function () {
            var e = [this.position.toString(), this.velocity.toString(), this.size, this.particleLife, this.spread.toFixed(2), this.emissionRate];
            return "E" + e.join(":")
        }
}

function ParticleSystem() {
    var e = this;
    e.display = null,
        e.maxParticles = 400,
        e.startTime = 0,
        e.draw = {
            objects: !1,
            accelerations: !1,
            velocities: !1,
            particles: !0
        },
        e.particles = [],
        e.emitters = [],
        e.fields = [],
        e.listeners = {},
        e.elapsed = 0,
        e.lastEmitter = 0,
        e.mouseCoords = new Point(0, 0),
        e.mouseFieldStrength = -140,
        e.mouseField,
        e.lines = {
            enabled: !0,
            min_particle_life: 0
        },
        e.minDist = 60,
        e.thresholdDist = 0,
        e.maxLines = 20,
        e.bounds_threshold = 30,
        e.buttons = null,
        e.menu_particles = [],
        e.init = function (t) {
            return e.display = t,
                t.addListener("draw", e),
                t.addListener("afterDraw", e),
                t.addListener("beforeUpdate", e),
                t.addListener("update", e),
                t.addListener("mouseUp", e),
                t.addListener("mouseDown", e),
                t.addListener("mouseMove", e),
                e
        },
        e.addListener = function (t, n) {
            e.listeners[t] || (e.listeners[t] = []),
                e.listeners[t].push(n)
        },
        e.fireEvent = function (t, n) {
            if (e.listeners[t] && e.listeners[t].length > 0) for (var i = "on" + t.substr(0, 1).toUpperCase() + t.substr(1), o = 0; o < e.listeners[t].length; o++) e.listeners[t][o][i] && e.listeners[t][o][i].call(e.listeners[t][o], n, e)
        },
        e.addEmitter = function (t, n) {
            var i = new ParticleEmitter(t, n);
            e.emitters.push(i),
                e.fireEvent("newObject", {
                    particleTarget: i
                })
        },
        e.removeEmitter = function (t) {
            typeof t.constructor !== Number && (t = e.emitters.indexOf(t));
            var n = e.emitters.splice(t, 1);
            n && e.fireEvent("deleteObject", {
                particleTarget: n
            })
        },
        e.addField = function (t, n) {
            var i = new Field(t, n);
            e.fields.push(i),
                e.fireEvent("newObject", {
                    particleTarget: i
                })
        },
        e.removeField = function (t) {
            typeof t.constructor !== Number && (t = e.fields.indexOf(t));
            var n = e.fields.splice(t, 1);
            n && e.fireEvent("deleteObject", {
                particleTarget: n
            })
        },
        e.onBeforeUpdate = function (t, n) {
            e.draw.accelerations && e.drawAccelerations(n),
            e.draw.velocities && e.drawVelocities(n)
        },
        e.onUpdate = function (t, n) {
            e.elapsed++,
                e.addNewParticles(),
                e.plotParticles(n)
        },
        e.onDraw = function (t, n) {
            e.draw.particles && e.drawParticles(n),
            e.draw.objects && (e.drawFields(n), e.drawEmitters(n))
        },
        e.onAfterDraw = function (e, t) {
            t.draw.info
        },
        e.onMouseDown = function (t) {
            var n = e.getObjectAtPoint(e.mouseCoords);
            e.selected && (t.particleTarget = e.selected, e.fireEvent("objectBlur", t), e.selected = void 0),
                n ? (e.clicked = n, t.particleTarget = n, e.fireEvent("objectMouseDown")) : (e.mouseField = new Field(e.mouseCoords, e.mouseFieldStrength), e.mouseField.size = 0, e.fields.push(e.mouseField))
        },
        e.onMouseUp = function (t) {
            var n = e.getObjectAtPoint(e.mouseCoords);
            e.mouseField ? (e.removeField(e.mouseField), e.mouseField = void 0) : e.clicked && (t.particleTarget = e.clicked, n === e.clicked && (e.clicked.moved ? e.fireEvent("objectFinishMove", t) : (e.selected = e.clicked, e.fireEvent("objectClick", t), e.fireEvent("objectFocus", t)), delete e.clicked.moved, e.clicked = void 0))
        },
        e.onMouseMove = function (t, n) {
            if (e.mouseCoords = new Point(t.offsetX || t.layerX - n.canvas.offsetLeft, t.offsetY || t.layerY - n.canvas.offsetTop), e.mouseField) e.mouseField.moveTo(e.mouseCoords);
            else if (e.clicked) e.clicked.moved = !0,
                e.clicked.moveTo(e.mouseCoords);
            else {
                var i = e.getObjectAtPoint(e.mouseCoords);
                e.objectMouseOver !== i && (e.objectMouseOver ? (t.particleTarget = e.objectMouseOver, e.fireEvent("objectMouseOut", t), e.objectMouseOver = void 0) : (t.particleTarget = i, e.fireEvent("objectMouseIn", t), e.objectMouseOver = i))
            }
        },
        e.addNewParticles = function () {
            if (e.particles.length < e.maxParticles) for (var t, n = 0; t = e.emitters[n]; n++) {
                var i = t.emissionRate;
                if (1 > i) {
                    if (!(e.display.numFrames % 10 <= 10 * i)) continue;
                    i = 1
                }
                for (var o = 0; i > o; o++) e.particles.push(t.addParticle())
            }
        },
        e.plotParticles = function (t) {
            for (var n, i = e.bounds_threshold,
                     o = t.width + i,
                     r = t.height + i,
                     a = e.particles,
                     s = e.fields,
                     l = []; n = a.pop();) {
                if (n.ttl > 0) {
                    if (++n.lived >= n.ttl) continue
                } else n.lived++;
                n.isFixed || (n.submitToFields(s), n.move());
                var c = n.position,
                    u = ({
                        x: t.canvas.width / t.scale / 2,
                        y: t.canvas.height / t.scale / 2
                    },
                        {
                            top: t.logo.position.top + t.logo.height / 2,
                            left: t.logo.position.left + t.logo.width / 2
                        }),
                    d = (t.logo.width - 10) / 2,
                    p = Math.pow(c.x - u.left, 2) + Math.pow(c.y - u.top, 2),
                    f = t.canvas.width / t.scale / 2;
                if (f * f >= p) {
                    var h = p / (f * f);
                    n.radius = 2 - 1 * (1 - h)
                }
                var m = Math.pow(c.x - u.left, 2) + Math.pow(c.y - u.top, 2) <= d * d;
                m || c.x < -i || c.x > o || c.y < -i || c.y > r || l.push(n)
            }
            if (e.particles = l, !e.lines.enabled) return !0;
            for (var g = 0; g < e.particles.length; g++) if (c = e.particles[g], c.connects && !(c.lived < e.lines.min_particle_life)) for (var v = 0,
                                                                                                                                                y = g + 1; y < e.particles.length && (p2 = e.particles[y], !p2.connects || p2.lived < e.lines.min_particle_life || (v += e.distance(t, c, p2), !(v >= e.maxLines))); y++) ;
        },
        e.distance = function (t, n, i) {
            if (n.menu_particle && i.menu_particle) return 0;
            var o, r = n.position.x - i.position.x,
                a = n.position.y - i.position.y,
                s = t.context;
            if (o = Math.sqrt(r * r + a * a), o <= e.minDist && o > e.thresholdDist) {
                s.beginPath();
                var l = 1.2 - o / e.minDist;
                return (n.anchor_particle && i.menu_particle || i.anchor_particle && n.menu_particle) && (l = 1),
                    s.strokeStyle = "rgba(255,255,255," + l + ")", //闄堝織鍚�
                    s.moveTo(n.position.x, n.position.y),
                    s.lineTo(i.position.x, i.position.y),
                    s.stroke(),
                    s.closePath(),
                    1
            }
            return 0
        },
        e.drawParticles = function (t) {
            for (var n, i = -1; n = e.particles[++i];) n.draw(t)
        },
        e.drawAccelerations = function (t) {
            t.strokeStyle("white"),
                t.context.beginPath();
            for (var n = 0,
                     i = e.particles.length; i > n; n++) {
                var o = e.particles[n];
                t.context.moveTo(o.position.x, o.position.y),
                    t.context.lineTo(o.position.x + o.acceleration.x, o.position.y + o.acceleration.y)
            }
            t.context.stroke()
        },
        e.drawVelocities = function (t) {
            t.strokeStyle("blue"),
                t.context.beginPath();
            for (var n = 0,
                     i = e.particles.length; i > n; n++) {
                var o = e.particles[n];
                t.context.moveTo(o.position.x, o.position.y),
                    t.context.lineTo(o.position.x + o.velocity.x, o.position.y + o.velocity.y)
            }
            t.context.stroke()
        },
        e.drawFields = function (t) {
            for (var n = 0,
                     i = e.fields.length; i > n; n++) e.drawCircularObject(t, e.fields[n])
        },
        e.drawEmitters = function (t) {
            for (var n = 0,
                     i = e.emitters.length; i > n; n++) e.drawCircularObject(t, e.emitters[n])
        },
        e.drawCircularObject = function (e, t) {
            var n = t.size >> 1,
                i = e.context.createLinearGradient(t.position.x - n, t.position.y - n, t.position.x + n, t.position.y + n);
            i.addColorStop(0, t.drawColor || t.constructor.drawColor),
                i.addColorStop(1, t.drawColor2 || t.constructor.drawColor2),
                e.fillStyle(i),
                e.drawCircle(t.position, n)
        },
        e.getObjectAtPoint = function (t) {
            for (var n = 0; n < e.emitters.length; n++) {
                var i = e.emitters[n];
                if (t.withinBounds(i.position, i.size)) return i
            }
            for (var n = 0; n < e.fields.length; n++) {
                var o = e.fields[n];
                if (t.withinBounds(o.position, o.size)) return o
            }
        },
        e.initMenuParticles = function () {
            var t = {
                    x: e.display.canvas.width / 2,
                    y: e.display.canvas.height / 2
                },
                n = 160,
                i = new Particle(new Point(t.x, t.y - n), new Vector(0, 0));
            i.setAsMenuAnchorType(),
                i.menu_name = "VISION",
                e.particles.push(i),
                e.menu_particles.push(i);
            var i = new Particle(new Point(t.x - n, t.y - n), new Vector(0, 0));
            i.setAsMenuAnchorType(),
                i.menu_name = "BLOG",
                e.particles.push(i),
                e.menu_particles.push(i);
            var i = new Particle(new Point(t.x - n, t.y), new Vector(0, 0));
            i.setAsMenuAnchorType(),
                i.menu_name = "MISSION",
                e.particles.push(i),
                e.menu_particles.push(i);
            var i = new Particle(new Point(t.x - n, t.y + n), new Vector(0, 0));
            i.setAsMenuAnchorType(),
                i.menu_name = "COMPANY",
                e.particles.push(i),
                e.menu_particles.push(i);
            var i = new Particle(new Point(t.x, t.y + n), new Vector(0, 0));
            i.setAsMenuAnchorType(),
                i.menu_name = "PROJECTS",
                e.particles.push(i),
                e.menu_particles.push(i);
            var i = new Particle(new Point(t.x + n, t.y + n), new Vector(0, 0));
            i.setAsMenuAnchorType(),
                i.menu_name = "TEAM",
                e.particles.push(i),
                e.menu_particles.push(i);
            var i = new Particle(new Point(t.x + n, t.y), new Vector(0, 0));
            i.setAsMenuAnchorType(),
                i.menu_name = "CONTACT",
                e.particles.push(i),
                e.menu_particles.push(i);
            var i = new Particle(new Point(t.x + n, t.y - n), new Vector(0, 0));
            i.setAsMenuAnchorType(),
                i.menu_name = "ETHEREUM",
                e.particles.push(i),
                e.menu_particles.push(i)
        },
        e.getParticleCount = function () {
            return e.particles.length
        },
        e.getEmitterCount = function () {
            return e.emitters.length
        },
        e.getFieldCount = function () {
            return e.fields.length
        },
        e.toString = function () {
            for (var t = 1,
                     n = [e.maxParticles, e.draw.objects ? 1 : 0, e.draw.accelerations ? 1 : 0, e.draw.velocities ? 1 : 0, e.draw.particles ? 1 : 0], i = 0; i < e.emitters.length; i++) n.push(e.emitters[i].toString());
            for (var i = 0; i < e.fields.length; i++) n.push(e.fields[i].toString());
            return "Sv" + t + "(" + n.join("|") + ")"
        },
        e.fromString = function (t) {
            var n = {
                    Sv1: e.loadStateV1
                },
                i = t.match(/^([^(]+)\((.*)\)$/);
            i && 3 == i.length && n[i[1]] && n[i[1]](i[2])
        },
        e.loadStateV1 = function (t) {
            var n = t.split("|");
            e.maxParticles = parseInt(n.shift()),
                e.draw.objects = "1" === n.shift() ? !0 : !1,
                e.draw.accelerations = "1" === n.shift() ? !0 : !1,
                e.draw.velocities = "1" === n.shift() ? !0 : !1,
                e.draw.particles = "1" === n.shift() ? !0 : !1,
                e.emitters = [],
                e.fields = [];
            for (; objectString = n.shift();) "E" == objectString.charAt(0) ? e.emitters.push(ParticleEmitter.fromString(objectString)) : e.fields.push(Field.fromString(objectString))
        }
}

function Field(e, t) {
    this.position = e,
        this.size = 8,
        this.setMass(t)
}

function Vector(e, t) {
    this.x = e || 0,
        this.y = t || 0
}

function addEmittersAndFields(e) {
    var t = e.display;
    t.logo.width = $("#blachole").width(),
        t.logo.height = $("#blachole").height(),
        t.logo.position = $("#blachole").position(),
        isSmallDevice() ? (e.maxParticles = Math.round($(window).width() / 5), e.maxParticles > 150 && (e.maxParticles = 150), e.addEmitter(new Point(rem(3.2), t.canvas.height / t.scale - rem(30.1)), new Vector(1, 0)), e.addEmitter(new Point(rem(3.2), t.canvas.height / t.scale - rem(22.1)), new Vector(1, 0)), e.addEmitter(new Point(rem(3.2), t.canvas.height / t.scale - rem(16.5)), new Vector(1, 0)), e.addEmitter(new Point(0, 0), new Vector(.5, 1)), e.addEmitter(new Point(rem(3), t.canvas.height / t.scale - rem(4)), new Vector(1, -.3))) : (e.maxParticles = 400, e.addEmitter(new Point(rem(10), rem(14)), new Vector(1, .5)), e.addEmitter(new Point(rem(49), rem(32)), new Vector(1, .5)), e.addEmitter(new Point(rem(9.5), rem(24)), new Vector(1, .5)), e.addEmitter(new Point(rem(9.5), rem(32)), new Vector(1, .5)), e.addEmitter(new Point(rem(10), rem(42)), new Vector(1, .5)), e.addEmitter(new Point(rem(29), rem(14)), new Vector(1, .5)), e.addEmitter(new Point(rem(10), t.canvas.height / t.scale - rem(10)), new Vector(1, -.1)));
    var n = 1 * Math.sqrt(t.canvas.width / t.scale / 2 * (t.canvas.width / t.scale / 2) + t.canvas.height / t.scale / 2 * (t.canvas.height / t.scale / 2)),
        i = {
            top: t.logo.position.top + t.logo.height / 2,
            left: t.logo.position.left + t.logo.width / 2
        };
    e.addField(new Point(i.left, i.top), 2 * n),
        isSmallDevice() ? (e.addField(new Point(t.canvas.width / t.scale - rem(2.4), t.canvas.height / t.scale - rem(2.4)), -n / 10), e.addField(new Point(t.canvas.width / t.scale, 2 * (t.canvas.height / t.scale) / 3), -n / 10)) : (e.addField(new Point(t.canvas.width / t.scale - rem(12), t.canvas.height / t.scale - rem(12)), -n / 10), e.addField(new Point(t.canvas.width / t.scale / 2, 120), n / 5))
}

void 0 === jQuery.migrateMute && (jQuery.migrateMute = !0),
    function (e, t, n) {
        function i(n) {
            var i = t.console;
            r[n] || (r[n] = !0, e.migrateWarnings.push(n), i && i.warn && !e.migrateMute && (i.warn("JQMIGRATE: " + n), e.migrateTrace && i.trace && i.trace()))
        }

        function o(t, o, r, a) {
            if (Object.defineProperty) try {
                return Object.defineProperty(t, o, {
                    configurable: !0,
                    enumerable: !0,
                    get: function () {
                        return i(a),
                            r
                    },
                    set: function (e) {
                        i(a),
                            r = e
                    }
                }),
                    n
            } catch (s) {
            }
            e._definePropertyBroken = !0,
                t[o] = r
        }

        var r = {};
        e.migrateWarnings = [],
        !e.migrateMute && t.console && t.console.log && t.console.log("JQMIGRATE: Logging is active"),
        e.migrateTrace === n && (e.migrateTrace = !0),
            e.migrateReset = function () {
                r = {},
                    e.migrateWarnings.length = 0
            },
        "BackCompat" === document.compatMode && i("jQuery is not compatible with Quirks Mode");
        var a = e("<input/>", {
                size: 1
            }).attr("size") && e.attrFn,
            s = e.attr,
            l = e.attrHooks.value && e.attrHooks.value.get ||
                function () {
                    return null
                },
            c = e.attrHooks.value && e.attrHooks.value.set ||
                function () {
                    return n
                },
            u = /^(?:input|button)$/i,
            d = /^[238]$/,
            p = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
            f = /^(?:checked|selected)$/i;
        o(e, "attrFn", a || {},
            "jQuery.attrFn is deprecated"),
            e.attr = function (t, o, r, l) {
                var c = o.toLowerCase(),
                    h = t && t.nodeType;
                return l && (4 > s.length && i("jQuery.fn.attr( props, pass ) is deprecated"), t && !d.test(h) && (a ? o in a : e.isFunction(e.fn[o]))) ? e(t)[o](r) : ("type" === o && r !== n && u.test(t.nodeName) && t.parentNode && i("Can't change the 'type' of an input or button in IE 6/7/8"), !e.attrHooks[c] && p.test(c) && (e.attrHooks[c] = {
                    get: function (t, i) {
                        var o, r = e.prop(t, i);
                        return r === !0 || "boolean" != typeof r && (o = t.getAttributeNode(i)) && o.nodeValue !== !1 ? i.toLowerCase() : n
                    },
                    set: function (t, n, i) {
                        var o;
                        return n === !1 ? e.removeAttr(t, i) : (o = e.propFix[i] || i, o in t && (t[o] = !0), t.setAttribute(i, i.toLowerCase())),
                            i
                    }
                },
                f.test(c) && i("jQuery.fn.attr('" + c + "') may use property instead of attribute")), s.call(e, t, o, r))
            },
            e.attrHooks.value = {
                get: function (e, t) {
                    var n = (e.nodeName || "").toLowerCase();
                    return "button" === n ? l.apply(this, arguments) : ("input" !== n && "option" !== n && i("jQuery.fn.attr('value') no longer gets properties"), t in e ? e.value : null)
                },
                set: function (e, t) {
                    var o = (e.nodeName || "").toLowerCase();
                    return "button" === o ? c.apply(this, arguments) : ("input" !== o && "option" !== o && i("jQuery.fn.attr('value', val) no longer sets properties"), e.value = t, n)
                }
            };
        var h, m, g = e.fn.init,
            v = e.parseJSON,
            y = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
        e.fn.init = function (t, n, o) {
            var r;
            return t && "string" == typeof t && !e.isPlainObject(n) && (r = y.exec(e.trim(t))) && r[0] && ("<" !== t.charAt(0) && i("$(html) HTML strings must start with '<' character"), r[3] && i("$(html) HTML text after last tag is ignored"), "#" === r[0].charAt(0) && (i("HTML string cannot start with a '#' character"), e.error("JQMIGRATE: Invalid selector string (XSS)")), n && n.context && (n = n.context), e.parseHTML) ? g.call(this, e.parseHTML(r[2], n, !0), n, o) : g.apply(this, arguments)
        },
            e.fn.init.prototype = e.fn,
            e.parseJSON = function (e) {
                return e || null === e ? v.apply(this, arguments) : (i("jQuery.parseJSON requires a valid JSON string"), null)
            },
            e.uaMatch = function (e) {
                e = e.toLowerCase();
                var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || 0 > e.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
                return {
                    browser: t[1] || "",
                    version: t[2] || "0"
                }
            },
        e.browser || (h = e.uaMatch(navigator.userAgent), m = {},
        h.browser && (m[h.browser] = !0, m.version = h.version), m.chrome ? m.webkit = !0 : m.webkit && (m.safari = !0), e.browser = m),
            o(e, "browser", e.browser, "jQuery.browser is deprecated"),
            e.sub = function () {
                function t(e, n) {
                    return new t.fn.init(e, n)
                }

                e.extend(!0, t, this),
                    t.superclass = this,
                    t.fn = t.prototype = this(),
                    t.fn.constructor = t,
                    t.sub = this.sub,
                    t.fn.init = function (i, o) {
                        return o && o instanceof e && !(o instanceof t) && (o = t(o)),
                            e.fn.init.call(this, i, o, n)
                    },
                    t.fn.init.prototype = t.fn;
                var n = t(document);
                return i("jQuery.sub() is deprecated"),
                    t
            },
            e.ajaxSetup({
                converters: {
                    "text json": e.parseJSON
                }
            });
        var w = e.fn.data;
        e.fn.data = function (t) {
            var o, r, a = this[0];
            return !a || "events" !== t || 1 !== arguments.length || (o = e.data(a, t), r = e._data(a, t), o !== n && o !== r || r === n) ? w.apply(this, arguments) : (i("Use of jQuery.fn.data('events') is deprecated"), r)
        };
        var b = /\/(java|ecma)script/i,
            x = e.fn.andSelf || e.fn.addBack;
        e.fn.andSelf = function () {
            return i("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),
                x.apply(this, arguments)
        },
        e.clean || (e.clean = function (t, o, r, a) {
            o = o || document,
                o = !o.nodeType && o[0] || o,
                o = o.ownerDocument || o,
                i("jQuery.clean() is deprecated");
            var s, l, c, u, d = [];
            if (e.merge(d, e.buildFragment(t, o).childNodes), r) for (c = function (e) {
                return !e.type || b.test(e.type) ? a ? a.push(e.parentNode ? e.parentNode.removeChild(e) : e) : r.appendChild(e) : n
            },
                                                                          s = 0; null != (l = d[s]); s++) e.nodeName(l, "script") && c(l) || (r.appendChild(l), l.getElementsByTagName !== n && (u = e.grep(e.merge([], l.getElementsByTagName("script")), c), d.splice.apply(d, [s + 1, 0].concat(u)), s += u.length));
            return d
        });
        var S = e.event.add,
            C = e.event.remove,
            T = e.event.trigger,
            E = e.fn.toggle,
            _ = e.fn.live,
            I = e.fn.die,
            P = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
            k = RegExp("\\b(?:" + P + ")\\b"),
            M = /(?:^|\s)hover(\.\S+|)\b/,
            H = function (t) {
                return "string" != typeof t || e.event.special.hover ? t : (M.test(t) && i("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), t && t.replace(M, "mouseenter$1 mouseleave$1"))
            };
        e.event.props && "attrChange" !== e.event.props[0] && e.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"),
        e.event.dispatch && o(e.event, "handle", e.event.dispatch, "jQuery.event.handle is undocumented and deprecated"),
            e.event.add = function (e, t, n, o, r) {
                e !== document && k.test(t) && i("AJAX events should be attached to document: " + t),
                    S.call(this, e, H(t || ""), n, o, r)
            },
            e.event.remove = function (e, t, n, i, o) {
                C.call(this, e, H(t) || "", n, i, o)
            },
            e.fn.error = function () {
                var e = Array.prototype.slice.call(arguments, 0);
                return i("jQuery.fn.error() is deprecated"),
                    e.splice(0, 0, "error"),
                    arguments.length ? this.bind.apply(this, e) : (this.triggerHandler.apply(this, e), this)
            },
            e.fn.toggle = function (t, n) {
                if (!e.isFunction(t) || !e.isFunction(n)) return E.apply(this, arguments);
                i("jQuery.fn.toggle(handler, handler...) is deprecated");
                var o = arguments,
                    r = t.guid || e.guid++,
                    a = 0,
                    s = function (n) {
                        var i = (e._data(this, "lastToggle" + t.guid) || 0) % a;
                        return e._data(this, "lastToggle" + t.guid, i + 1),
                            n.preventDefault(),
                        o[i].apply(this, arguments) || !1
                    };
                for (s.guid = r; o.length > a;) o[a++].guid = r;
                return this.click(s)
            },
            e.fn.live = function (t, n, o) {
                return i("jQuery.fn.live() is deprecated"),
                    _ ? _.apply(this, arguments) : (e(this.context).on(t, this.selector, n, o), this)
            },
            e.fn.die = function (t, n) {
                return i("jQuery.fn.die() is deprecated"),
                    I ? I.apply(this, arguments) : (e(this.context).off(t, this.selector || "**", n), this)
            },
            e.event.trigger = function (e, t, n, o) {
                return n || k.test(e) || i("Global events are undocumented and deprecated"),
                    T.call(this, e, t, n || document, o)
            },
            e.each(P.split("|"),
                function (t, n) {
                    e.event.special[n] = {
                        setup: function () {
                            var t = this;
                            return t !== document && (e.event.add(document, n + "." + e.guid,
                                function () {
                                    e.event.trigger(n, null, t, !0)
                                }), e._data(this, n, e.guid++)),
                                !1
                        },
                        teardown: function () {
                            return this !== document && e.event.remove(document, n + "." + e._data(this, n)),
                                !1
                        }
                    }
                })
    }(jQuery, window),
    jQuery.easing.jswing = jQuery.easing.swing,
    jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        swing: function (e, t, n, i, o) {
            return jQuery.easing[jQuery.easing.def](e, t, n, i, o)
        },
        easeInQuad: function (e, t, n, i, o) {
            return i * (t /= o) * t + n
        },
        easeOutQuad: function (e, t, n, i, o) {
            return -i * (t /= o) * (t - 2) + n
        },
        easeInOutQuad: function (e, t, n, i, o) {
            return (t /= o / 2) < 1 ? i / 2 * t * t + n : -i / 2 * (--t * (t - 2) - 1) + n
        },
        easeInCubic: function (e, t, n, i, o) {
            return i * (t /= o) * t * t + n
        },
        easeOutCubic: function (e, t, n, i, o) {
            return i * ((t = t / o - 1) * t * t + 1) + n
        },
        easeInOutCubic: function (e, t, n, i, o) {
            return (t /= o / 2) < 1 ? i / 2 * t * t * t + n : i / 2 * ((t -= 2) * t * t + 2) + n
        },
        easeInQuart: function (e, t, n, i, o) {
            return i * (t /= o) * t * t * t + n
        },
        easeOutQuart: function (e, t, n, i, o) {
            return -i * ((t = t / o - 1) * t * t * t - 1) + n
        },
        easeInOutQuart: function (e, t, n, i, o) {
            return (t /= o / 2) < 1 ? i / 2 * t * t * t * t + n : -i / 2 * ((t -= 2) * t * t * t - 2) + n
        },
        easeInQuint: function (e, t, n, i, o) {
            return i * (t /= o) * t * t * t * t + n
        },
        easeOutQuint: function (e, t, n, i, o) {
            return i * ((t = t / o - 1) * t * t * t * t + 1) + n
        },
        easeInOutQuint: function (e, t, n, i, o) {
            return (t /= o / 2) < 1 ? i / 2 * t * t * t * t * t + n : i / 2 * ((t -= 2) * t * t * t * t + 2) + n
        },
        easeInSine: function (e, t, n, i, o) {
            return -i * Math.cos(t / o * (Math.PI / 2)) + i + n
        },
        easeOutSine: function (e, t, n, i, o) {
            return i * Math.sin(t / o * (Math.PI / 2)) + n
        },
        easeInOutSine: function (e, t, n, i, o) {
            return -i / 2 * (Math.cos(Math.PI * t / o) - 1) + n
        },
        easeInExpo: function (e, t, n, i, o) {
            return 0 == t ? n : i * Math.pow(2, 10 * (t / o - 1)) + n
        },
        easeOutExpo: function (e, t, n, i, o) {
            return t == o ? n + i : i * (-Math.pow(2, -10 * t / o) + 1) + n
        },
        easeInOutExpo: function (e, t, n, i, o) {
            return 0 == t ? n : t == o ? n + i : (t /= o / 2) < 1 ? i / 2 * Math.pow(2, 10 * (t - 1)) + n : i / 2 * (-Math.pow(2, -10 * --t) + 2) + n
        },
        easeInCirc: function (e, t, n, i, o) {
            return -i * (Math.sqrt(1 - (t /= o) * t) - 1) + n
        },
        easeOutCirc: function (e, t, n, i, o) {
            return i * Math.sqrt(1 - (t = t / o - 1) * t) + n
        },
        easeInOutCirc: function (e, t, n, i, o) {
            return (t /= o / 2) < 1 ? -i / 2 * (Math.sqrt(1 - t * t) - 1) + n : i / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
        },
        easeInElastic: function (e, t, n, i, o) {
            var r = 1.70158,
                a = 0,
                s = i;
            if (0 == t) return n;
            if (1 == (t /= o)) return n + i;
            if (a || (a = .3 * o), s < Math.abs(i)) {
                s = i;
                var r = a / 4
            } else var r = a / (2 * Math.PI) * Math.asin(i / s);
            return -(s * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * o - r) * Math.PI / a)) + n
        },
        easeOutElastic: function (e, t, n, i, o) {
            var r = 1.70158,
                a = 0,
                s = i;
            if (0 == t) return n;
            if (1 == (t /= o)) return n + i;
            if (a || (a = .3 * o), s < Math.abs(i)) {
                s = i;
                var r = a / 4
            } else var r = a / (2 * Math.PI) * Math.asin(i / s);
            return s * Math.pow(2, -10 * t) * Math.sin(2 * (t * o - r) * Math.PI / a) + i + n
        },
        easeInOutElastic: function (e, t, n, i, o) {
            var r = 1.70158,
                a = 0,
                s = i;
            if (0 == t) return n;
            if (2 == (t /= o / 2)) return n + i;
            if (a || (a = .3 * o * 1.5), s < Math.abs(i)) {
                s = i;
                var r = a / 4
            } else var r = a / (2 * Math.PI) * Math.asin(i / s);
            return 1 > t ? -.5 * s * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * o - r) * Math.PI / a) + n : s * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t * o - r) * Math.PI / a) * .5 + i + n
        },
        easeInBack: function (e, t, n, i, o, r) {
            return void 0 == r && (r = 1.70158),
            i * (t /= o) * t * ((r + 1) * t - r) + n
        },
        easeOutBack: function (e, t, n, i, o, r) {
            return void 0 == r && (r = 1.70158),
            i * ((t = t / o - 1) * t * ((r + 1) * t + r) + 1) + n
        },
        easeInOutBack: function (e, t, n, i, o, r) {
            return void 0 == r && (r = 1.70158),
                (t /= o / 2) < 1 ? i / 2 * t * t * (((r *= 1.525) + 1) * t - r) + n : i / 2 * ((t -= 2) * t * (((r *= 1.525) + 1) * t + r) + 2) + n
        },
        easeInBounce: function (e, t, n, i, o) {
            return i - jQuery.easing.easeOutBounce(e, o - t, 0, i, o) + n
        },
        easeOutBounce: function (e, t, n, i, o) {
            return (t /= o) < 1 / 2.75 ? 7.5625 * i * t * t + n : 2 / 2.75 > t ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : 2.5 / 2.75 > t ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
        },
        easeInOutBounce: function (e, t, n, i, o) {
            return o / 2 > t ? .5 * jQuery.easing.easeInBounce(e, 2 * t, 0, i, o) + n : .5 * jQuery.easing.easeOutBounce(e, 2 * t - o, 0, i, o) + .5 * i + n
        }
    }),
"object" != typeof JSON && (JSON = {}),
    function () {
        "use strict";

        function f(e) {
            return 10 > e ? "0" + e : e
        }

        function quote(e) {
            return escapable.lastIndex = 0,
                escapable.test(e) ? '"' + e.replace(escapable,
                    function (e) {
                        var t = meta[e];
                        return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                    }) + '"' : '"' + e + '"'
        }

        function str(e, t) {
            var n, i, o, r, a, s = gap,
                l = t[e];
            switch (l && "object" == typeof l && "function" == typeof l.toJSON && (l = l.toJSON(e)), "function" == typeof rep && (l = rep.call(t, e, l)), typeof l) {
                case "string":
                    return quote(l);
                case "number":
                    return isFinite(l) ? String(l) : "null";
                case "boolean":
                case "null":
                    return String(l);
                case "object":
                    if (!l) return "null";
                    if (gap += indent, a = [], "[object Array]" === Object.prototype.toString.apply(l)) {
                        for (r = l.length, n = 0; r > n; n += 1) a[n] = str(n, l) || "null";
                        return o = 0 === a.length ? "[]" : gap ? "[\n" + gap + a.join(",\n" + gap) + "\n" + s + "]" : "[" + a.join(",") + "]",
                            gap = s,
                            o
                    }
                    if (rep && "object" == typeof rep) for (r = rep.length, n = 0; r > n; n += 1) "string" == typeof rep[n] && (i = rep[n], o = str(i, l), o && a.push(quote(i) + (gap ? ": " : ":") + o));
                    else for (i in l) Object.prototype.hasOwnProperty.call(l, i) && (o = str(i, l), o && a.push(quote(i) + (gap ? ": " : ":") + o));
                    return o = 0 === a.length ? "{}" : gap ? "{\n" + gap + a.join(",\n" + gap) + "\n" + s + "}" : "{" + a.join(",") + "}",
                        gap = s,
                        o
            }
        }

        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        },
            String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
                return this.valueOf()
            });
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap, indent, meta = {
                "\b": "\\b",
                "	": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            rep;
        "function" != typeof JSON.stringify && (JSON.stringify = function (e, t, n) {
            var i;
            if (gap = "", indent = "", "number" == typeof n) for (i = 0; n > i; i += 1) indent += " ";
            else "string" == typeof n && (indent = n);
            if (rep = t, !t || "function" == typeof t || "object" == typeof t && "number" == typeof t.length) return str("", {
                "": e
            });
            throw new Error("JSON.stringify")
        }),
        "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) {
            function walk(e, t) {
                var n, i, o = e[t];
                if (o && "object" == typeof o) for (n in o) Object.prototype.hasOwnProperty.call(o, n) && (i = walk(o, n), void 0 !== i ? o[n] = i : delete o[n]);
                return reviver.call(e, t, o)
            }

            var j;
            if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx,
                    function (e) {
                        return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                    })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"),
                "function" == typeof reviver ? walk({
                        "": j
                    },
                    "") : j;
            throw new SyntaxError("JSON.parse")
        })
    }(),
    function (e, t) {
        "use strict";
        var n = e.History = e.History || {},
            i = e.jQuery;
        if ("undefined" != typeof n.Adapter) throw new Error("History.js Adapter has already been loaded...");
        n.Adapter = {
            bind: function (e, t, n) {
                i(e).bind(t, n)
            },
            trigger: function (e, t, n) {
                i(e).trigger(t, n)
            },
            extractEventData: function (e, n, i) {
                var o = n && n.originalEvent && n.originalEvent[e] || i && i[e] || t;
                return o
            },
            onDomLoad: function (e) {
                i(e)
            }
        },
        "undefined" != typeof n.init && n.init()
    }(window),
    function (e) {
        "use strict";
        var t = e.document,
            n = e.setTimeout || n,
            i = e.clearTimeout || i,
            o = e.setInterval || o,
            r = e.History = e.History || {};
        if ("undefined" != typeof r.initHtml4) throw new Error("History.js HTML4 Support has already been loaded...");
        r.initHtml4 = function () {
            return "undefined" != typeof r.initHtml4.initialized ? !1 : (r.initHtml4.initialized = !0, r.enabled = !0, r.savedHashes = [], r.isLastHash = function (e) {
                var t, n = r.getHashByIndex();
                return t = e === n
            },
                r.isHashEqual = function (e, t) {
                    return e = encodeURIComponent(e).replace(/%25/g, "%"),
                        t = encodeURIComponent(t).replace(/%25/g, "%"),
                    e === t
                },
                r.saveHash = function (e) {
                    return r.isLastHash(e) ? !1 : (r.savedHashes.push(e), !0)
                },
                r.getHashByIndex = function (e) {
                    var t = null;
                    return t = "undefined" == typeof e ? r.savedHashes[r.savedHashes.length - 1] : 0 > e ? r.savedHashes[r.savedHashes.length + e] : r.savedHashes[e]
                },
                r.discardedHashes = {},
                r.discardedStates = {},
                r.discardState = function (e, t, n) {
                    var i, o = r.getHashByState(e);
                    return i = {
                        discardedState: e,
                        backState: n,
                        forwardState: t
                    },
                        r.discardedStates[o] = i,
                        !0
                },
                r.discardHash = function (e, t, n) {
                    var i = {
                        discardedHash: e,
                        backState: n,
                        forwardState: t
                    };
                    return r.discardedHashes[e] = i,
                        !0
                },
                r.discardedState = function (e) {
                    var t, n = r.getHashByState(e);
                    return t = r.discardedStates[n] || !1
                },
                r.discardedHash = function (e) {
                    var t = r.discardedHashes[e] || !1;
                    return t
                },
                r.recycleState = function (e) {
                    var t = r.getHashByState(e);
                    return r.discardedState(e) && delete r.discardedStates[t],
                        !0
                },
            r.emulated.hashChange && (r.hashChangeInit = function () {
                r.checkerFunction = null;
                var n, i, a, s, l = "",
                    c = Boolean(r.getHash());
                return r.isInternetExplorer() ? (n = "historyjs-iframe", i = t.createElement("iframe"), i.setAttribute("id", n), i.setAttribute("src", "#"), i.style.display = "none", t.body.appendChild(i), i.contentWindow.document.open(), i.contentWindow.document.close(), a = "", s = !1, r.checkerFunction = function () {
                    if (s) return !1;
                    s = !0;
                    var t = r.getHash(),
                        n = r.getHash(i.contentWindow.document);
                    return t !== l ? (l = t, n !== t && (a = n = t, i.contentWindow.document.open(), i.contentWindow.document.close(), i.contentWindow.document.location.hash = r.escapeHash(t)), r.Adapter.trigger(e, "hashchange")) : n !== a && (a = n, c && "" === n ? r.back() : r.setHash(n, !1)),
                        s = !1,
                        !0
                }) : r.checkerFunction = function () {
                    var t = r.getHash() || "";
                    return t !== l && (l = t, r.Adapter.trigger(e, "hashchange")),
                        !0
                },
                    r.intervalList.push(o(r.checkerFunction, r.options.hashChangeInterval)),
                    !0
            },
                r.Adapter.onDomLoad(r.hashChangeInit)), r.emulated.pushState && (r.onHashChange = function (t) {
                var n, i = t && t.newURL || r.getLocationHref(),
                    o = r.getHashByUrl(i),
                    a = null,
                    s = null;
                return r.isLastHash(o) ? (r.busy(!1), !1) : (r.doubleCheckComplete(), r.saveHash(o), o && r.isTraditionalAnchor(o) ? (r.Adapter.trigger(e, "anchorchange"), r.busy(!1), !1) : (a = r.extractState(r.getFullUrl(o || r.getLocationHref()), !0), r.isLastSavedState(a) ? (r.busy(!1), !1) : (s = r.getHashByState(a), n = r.discardedState(a), n ? (r.getHashByIndex(-2) === r.getHashByState(n.forwardState) ? r.back(!1) : r.forward(!1), !1) : (r.pushState(a.data, a.title, encodeURI(a.url), !1), !0))))
            },
                r.Adapter.bind(e, "hashchange", r.onHashChange), r.pushState = function (t, n, i, o) {
                if (i = encodeURI(i).replace(/%25/g, "%"), r.getHashByUrl(i)) throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
                if (o !== !1 && r.busy()) return r.pushQueue({
                    scope: r,
                    callback: r.pushState,
                    args: arguments,
                    queue: o
                }),
                    !1;
                r.busy(!0);
                var a = r.createStateObject(t, n, i),
                    s = r.getHashByState(a),
                    l = r.getState(!1),
                    c = r.getHashByState(l),
                    u = r.getHash(),
                    d = r.expectedStateId == a.id;
                return r.storeState(a),
                    r.expectedStateId = a.id,
                    r.recycleState(a),
                    r.setTitle(a),
                    s === c ? (r.busy(!1), !1) : (r.saveState(a), d || r.Adapter.trigger(e, "statechange"), !r.isHashEqual(s, u) && !r.isHashEqual(s, r.getShortUrl(r.getLocationHref())) && r.setHash(s, !1), r.busy(!1), !0)
            },
                r.replaceState = function (t, n, i, o) {
                    if (i = encodeURI(i).replace(/%25/g, "%"), r.getHashByUrl(i)) throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
                    if (o !== !1 && r.busy()) return r.pushQueue({
                        scope: r,
                        callback: r.replaceState,
                        args: arguments,
                        queue: o
                    }),
                        !1;
                    r.busy(!0);
                    var a = r.createStateObject(t, n, i),
                        s = r.getHashByState(a),
                        l = r.getState(!1),
                        c = r.getHashByState(l),
                        u = r.getStateByIndex(-2);
                    return r.discardState(l, a, u),
                        s === c ? (r.storeState(a), r.expectedStateId = a.id, r.recycleState(a), r.setTitle(a), r.saveState(a), r.Adapter.trigger(e, "statechange"), r.busy(!1)) : r.pushState(a.data, a.title, a.url, !1),
                        !0
                }), r.emulated.pushState && r.getHash() && !r.emulated.hashChange && r.Adapter.onDomLoad(function () {
                r.Adapter.trigger(e, "hashchange")
            }), void 0)
        },
        "undefined" != typeof r.init && r.init()
    }(window),
    function (e, t) {
        "use strict";
        var n = e.console || t,
            i = e.document,
            o = e.navigator,
            r = !1,
            a = e.setTimeout,
            s = e.clearTimeout,
            l = e.setInterval,
            c = e.clearInterval,
            u = e.JSON,
            d = e.alert,
            p = e.History = e.History || {},
            f = e.history;
        try {
            r = e.sessionStorage,
                r.setItem("TEST", "1"),
                r.removeItem("TEST")
        } catch (h) {
            r = !1
        }
        if (u.stringify = u.stringify || u.encode, u.parse = u.parse || u.decode, "undefined" != typeof p.init) throw new Error("History.js Core has already been loaded...");
        p.init = function () {
            return "undefined" == typeof p.Adapter ? !1 : ("undefined" != typeof p.initCore && p.initCore(), "undefined" != typeof p.initHtml4 && p.initHtml4(), !0)
        },
            p.initCore = function () {
                if ("undefined" != typeof p.initCore.initialized) return !1;
                if (p.initCore.initialized = !0, p.options = p.options || {},
                        p.options.hashChangeInterval = p.options.hashChangeInterval || 100, p.options.safariPollInterval = p.options.safariPollInterval || 500, p.options.doubleCheckInterval = p.options.doubleCheckInterval || 500, p.options.disableSuid = p.options.disableSuid || !1, p.options.storeInterval = p.options.storeInterval || 1e3, p.options.busyDelay = p.options.busyDelay || 250, p.options.debug = p.options.debug || !1, p.options.initialTitle = p.options.initialTitle || i.title, p.options.html4Mode = p.options.html4Mode || !1, p.options.delayInit = p.options.delayInit || !1, p.intervalList = [], p.clearAllIntervals = function () {
                        var e, t = p.intervalList;
                        if ("undefined" != typeof t && null !== t) {
                            for (e = 0; e < t.length; e++) c(t[e]);
                            p.intervalList = null
                        }
                    },
                        p.debug = function () {
                            (p.options.debug || !1) && p.log.apply(p, arguments)
                        },
                        p.log = function () {
                            var e, t, o, r, a,
                                s = "undefined" != typeof n && "undefined" != typeof n.log && "undefined" != typeof n.log.apply,
                                l = i.getElementById("log");
                            for (s ? (r = Array.prototype.slice.call(arguments), e = r.shift(), "undefined" != typeof n.debug ? n.debug.apply(n, [e, r]) : n.log.apply(n, [e, r])) : e = "\n" + arguments[0] + "\n", t = 1, o = arguments.length; o > t; ++t) {
                                if (a = arguments[t], "object" == typeof a && "undefined" != typeof u) try {
                                    a = u.stringify(a)
                                } catch (c) {
                                }
                                e += "\n" + a + "\n"
                            }
                            return l ? (l.value += e + "\n-----\n", l.scrollTop = l.scrollHeight - l.clientHeight) : s || d(e),
                                !0
                        },
                        p.getInternetExplorerMajorVersion = function () {
                            var e = p.getInternetExplorerMajorVersion.cached = "undefined" != typeof p.getInternetExplorerMajorVersion.cached ? p.getInternetExplorerMajorVersion.cached : function () {
                                for (var e = 3,
                                         t = i.createElement("div"), n = t.getElementsByTagName("i"); (t.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->") && n[0];) ;
                                return e > 4 ? e : !1
                            }();
                            return e
                        },
                        p.isInternetExplorer = function () {
                            var e = p.isInternetExplorer.cached = "undefined" != typeof p.isInternetExplorer.cached ? p.isInternetExplorer.cached : Boolean(p.getInternetExplorerMajorVersion());
                            return e
                        },
                        p.emulated = p.options.html4Mode ? {
                            pushState: !0,
                            hashChange: !0
                        } : {
                            pushState: !Boolean(e.history && e.history.pushState && e.history.replaceState && !/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(o.userAgent) && !/AppleWebKit\/5([0-2]|3[0-2])/i.test(o.userAgent)),
                            hashChange: Boolean(!("onhashchange" in e || "onhashchange" in i) || p.isInternetExplorer() && p.getInternetExplorerMajorVersion() < 8)
                        },
                        p.enabled = !p.emulated.pushState, p.bugs = {
                        setHash: Boolean(!p.emulated.pushState && "Apple Computer, Inc." === o.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(o.userAgent)),
                        safariPoll: Boolean(!p.emulated.pushState && "Apple Computer, Inc." === o.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(o.userAgent)),
                        ieDoubleCheck: Boolean(p.isInternetExplorer() && p.getInternetExplorerMajorVersion() < 8),
                        hashEscape: Boolean(p.isInternetExplorer() && p.getInternetExplorerMajorVersion() < 7)
                    },
                        p.isEmptyObject = function (e) {
                            for (var t in e) if (e.hasOwnProperty(t)) return !1;
                            return !0
                        },
                        p.cloneObject = function (e) {
                            var t, n;
                            return e ? (t = u.stringify(e), n = u.parse(t)) : n = {},
                                n
                        },
                        p.getRootUrl = function () {
                            var e = i.location.protocol + "//" + (i.location.hostname || i.location.host);
                            return i.location.port && (e += ":" + i.location.port),
                                e += "/"
                        },
                        p.getBaseHref = function () {
                            var e = i.getElementsByTagName("base"),
                                t = null,
                                n = "";
                            return 1 === e.length && (t = e[0], n = t.href.replace(/[^\/]+$/, "")),
                                n = n.replace(/\/+$/, ""),
                            n && (n += "/"),
                                n
                        },
                        p.getBaseUrl = function () {
                            var e = p.getBaseHref() || p.getBasePageUrl() || p.getRootUrl();
                            return e
                        },
                        p.getPageUrl = function () {
                            var e, t = p.getState(!1, !1),
                                n = (t || {}).url || p.getLocationHref();
                            return e = n.replace(/\/+$/, "").replace(/[^\/]+$/,
                                function (e) {
                                    return /\./.test(e) ? e : e + "/"
                                })
                        },
                        p.getBasePageUrl = function () {
                            var e = p.getLocationHref().replace(/[#\?].*/, "").replace(/[^\/]+$/,
                                function (e) {
                                    return /[^\/]$/.test(e) ? "" : e
                                }).replace(/\/+$/, "") + "/";
                            return e
                        },
                        p.getFullUrl = function (e, t) {
                            var n = e,
                                i = e.substring(0, 1);
                            return t = "undefined" == typeof t ? !0 : t,
                            /[a-z]+\:\/\//.test(e) || (n = "/" === i ? p.getRootUrl() + e.replace(/^\/+/, "") : "#" === i ? p.getPageUrl().replace(/#.*/, "") + e : "?" === i ? p.getPageUrl().replace(/[\?#].*/, "") + e : t ? p.getBaseUrl() + e.replace(/^(\.\/)+/, "") : p.getBasePageUrl() + e.replace(/^(\.\/)+/, "")),
                                n.replace(/\#$/, "")
                        },
                        p.getShortUrl = function (e) {
                            var t = e,
                                n = p.getBaseUrl(),
                                i = p.getRootUrl();
                            return p.emulated.pushState && (t = t.replace(n, "")),
                                t = t.replace(i, "/"),
                            p.isTraditionalAnchor(t) && (t = "./" + t),
                                t = t.replace(/^(\.\/)+/g, "./").replace(/\#$/, "")
                        },
                        p.getLocationHref = function (e) {
                            return e = e || i,
                                e.URL === e.location.href ? e.location.href : e.location.href === decodeURIComponent(e.URL) ? e.URL : e.location.hash && decodeURIComponent(e.location.href.replace(/^[^#]+/, "")) === e.location.hash ? e.location.href : -1 == e.URL.indexOf("#") && -1 != e.location.href.indexOf("#") ? e.location.href : e.URL || e.location.href
                        },
                        p.store = {},
                        p.idToState = p.idToState || {},
                        p.stateToId = p.stateToId || {},
                        p.urlToId = p.urlToId || {},
                        p.storedStates = p.storedStates || [], p.savedStates = p.savedStates || [], p.normalizeStore = function () {
                        p.store.idToState = p.store.idToState || {},
                            p.store.urlToId = p.store.urlToId || {},
                            p.store.stateToId = p.store.stateToId || {}
                    },
                        p.getState = function (e, t) {
                            "undefined" == typeof e && (e = !0),
                            "undefined" == typeof t && (t = !0);
                            var n = p.getLastSavedState();
                            return !n && t && (n = p.createStateObject()),
                            e && (n = p.cloneObject(n), n.url = n.cleanUrl || n.url),
                                n
                        },
                        p.getIdByState = function (e) {
                            var t, n = p.extractId(e.url);
                            if (!n) if (t = p.getStateString(e), "undefined" != typeof p.stateToId[t]) n = p.stateToId[t];
                            else if ("undefined" != typeof p.store.stateToId[t]) n = p.store.stateToId[t];
                            else {
                                for (; n = (new Date).getTime() + String(Math.random()).replace(/\D/g, ""), "undefined" != typeof p.idToState[n] || "undefined" != typeof p.store.idToState[n];) ;
                                p.stateToId[t] = n,
                                    p.idToState[n] = e
                            }
                            return n
                        },
                        p.normalizeState = function (e) {
                            var t, n;
                            return e && "object" == typeof e || (e = {}),
                                "undefined" != typeof e.normalized ? e : (e.data && "object" == typeof e.data || (e.data = {}), t = {},
                                    t.normalized = !0, t.title = e.title || "", t.url = p.getFullUrl(e.url ? e.url : p.getLocationHref()), t.hash = p.getShortUrl(t.url), t.data = p.cloneObject(e.data), t.id = p.getIdByState(t), t.cleanUrl = t.url.replace(/\??\&_suid.*/, ""), t.url = t.cleanUrl, n = !p.isEmptyObject(t.data), (t.title || n) && p.options.disableSuid !== !0 && (t.hash = p.getShortUrl(t.url).replace(/\??\&_suid.*/, ""), /\?/.test(t.hash) || (t.hash += "?"), t.hash += "&_suid=" + t.id), t.hashedUrl = p.getFullUrl(t.hash), (p.emulated.pushState || p.bugs.safariPoll) && p.hasUrlDuplicate(t) && (t.url = t.hashedUrl), t)
                        },
                        p.createStateObject = function (e, t, n) {
                            var i = {
                                data: e,
                                title: t,
                                url: n
                            };
                            return i = p.normalizeState(i)
                        },
                        p.getStateById = function (e) {
                            e = String(e);
                            var n = p.idToState[e] || p.store.idToState[e] || t;
                            return n
                        },
                        p.getStateString = function (e) {
                            var t, n, i;
                            return t = p.normalizeState(e),
                                n = {
                                    data: t.data,
                                    title: e.title,
                                    url: e.url
                                },
                                i = u.stringify(n)
                        },
                        p.getStateId = function (e) {
                            var t, n;
                            return t = p.normalizeState(e),
                                n = t.id
                        },
                        p.getHashByState = function (e) {
                            var t, n;
                            return t = p.normalizeState(e),
                                n = t.hash
                        },
                        p.extractId = function (e) {
                            var t, n, i, o;
                            return o = -1 != e.indexOf("#") ? e.split("#")[0] : e,
                                n = /(.*)\&_suid=([0-9]+)$/.exec(o),
                                i = n ? n[1] || e : e,
                                t = n ? String(n[2] || "") : "",
                            t || !1
                        },
                        p.isTraditionalAnchor = function (e) {
                            var t = !/[\/\?\.]/.test(e);
                            return t
                        },
                        p.extractState = function (e, t) {
                            var n, i, o = null;
                            return t = t || !1,
                                n = p.extractId(e),
                            n && (o = p.getStateById(n)),
                            o || (i = p.getFullUrl(e), n = p.getIdByUrl(i) || !1, n && (o = p.getStateById(n)), !o && t && !p.isTraditionalAnchor(e) && (o = p.createStateObject(null, null, i))),
                                o
                        },
                        p.getIdByUrl = function (e) {
                            var n = p.urlToId[e] || p.store.urlToId[e] || t;
                            return n
                        },
                        p.getLastSavedState = function () {
                            return p.savedStates[p.savedStates.length - 1] || t
                        },
                        p.getLastStoredState = function () {
                            return p.storedStates[p.storedStates.length - 1] || t
                        },
                        p.hasUrlDuplicate = function (e) {
                            var t, n = !1;
                            return t = p.extractState(e.url),
                                n = t && t.id !== e.id
                        },
                        p.storeState = function (e) {
                            return p.urlToId[e.url] = e.id,
                                p.storedStates.push(p.cloneObject(e)),
                                e
                        },
                        p.isLastSavedState = function (e) {
                            var t, n, i, o = !1;
                            return p.savedStates.length && (t = e.id, n = p.getLastSavedState(), i = n.id, o = t === i),
                                o
                        },
                        p.saveState = function (e) {
                            return p.isLastSavedState(e) ? !1 : (p.savedStates.push(p.cloneObject(e)), !0)
                        },
                        p.getStateByIndex = function (e) {
                            var t = null;
                            return t = "undefined" == typeof e ? p.savedStates[p.savedStates.length - 1] : 0 > e ? p.savedStates[p.savedStates.length + e] : p.savedStates[e]
                        },
                        p.getCurrentIndex = function () {
                            var e = null;
                            return e = p.savedStates.length < 1 ? 0 : p.savedStates.length - 1
                        },
                        p.getHash = function (e) {
                            var t, n = p.getLocationHref(e);
                            return t = p.getHashByUrl(n)
                        },
                        p.unescapeHash = function (e) {
                            var t = p.normalizeHash(e);
                            return t = decodeURIComponent(t)
                        },
                        p.normalizeHash = function (e) {
                            var t = e.replace(/[^#]*#/, "").replace(/#.*/, "");
                            return t
                        },
                        p.setHash = function (e, t) {
                            var n, o;
                            return t !== !1 && p.busy() ? (p.pushQueue({
                                scope: p,
                                callback: p.setHash,
                                args: arguments,
                                queue: t
                            }), !1) : (p.busy(!0), n = p.extractState(e, !0), n && !p.emulated.pushState ? p.pushState(n.data, n.title, n.url, !1) : p.getHash() !== e && (p.bugs.setHash ? (o = p.getPageUrl(), p.pushState(null, null, o + "#" + e, !1)) : i.location.hash = e), p)
                        },
                        p.escapeHash = function (t) {
                            var n = p.normalizeHash(t);
                            return n = e.encodeURIComponent(n),
                            p.bugs.hashEscape || (n = n.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")),
                                n
                        },
                        p.getHashByUrl = function (e) {
                            var t = String(e).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
                            return t = p.unescapeHash(t)
                        },
                        p.setTitle = function (e) {
                            var t, n = e.title;
                            n || (t = p.getStateByIndex(0), t && t.url === e.url && (n = t.title || p.options.initialTitle));
                            try {
                                i.getElementsByTagName("title")[0].innerHTML = n.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
                            } catch (o) {
                            }
                            return i.title = n,
                                p
                        },
                        p.queues = [], p.busy = function (e) {
                        if ("undefined" != typeof e ? p.busy.flag = e : "undefined" == typeof p.busy.flag && (p.busy.flag = !1), !p.busy.flag) {
                            s(p.busy.timeout);
                            var t = function () {
                                var e, n, i;
                                if (!p.busy.flag) for (e = p.queues.length - 1; e >= 0; --e) n = p.queues[e],
                                0 !== n.length && (i = n.shift(), p.fireQueueItem(i), p.busy.timeout = a(t, p.options.busyDelay))
                            };
                            p.busy.timeout = a(t, p.options.busyDelay)
                        }
                        return p.busy.flag
                    },
                        p.busy.flag = !1, p.fireQueueItem = function (e) {
                        return e.callback.apply(e.scope || p, e.args || [])
                    },
                        p.pushQueue = function (e) {
                            return p.queues[e.queue || 0] = p.queues[e.queue || 0] || [],
                                p.queues[e.queue || 0].push(e),
                                p
                        },
                        p.queue = function (e, t) {
                            return "function" == typeof e && (e = {
                                callback: e
                            }),
                            "undefined" != typeof t && (e.queue = t),
                                p.busy() ? p.pushQueue(e) : p.fireQueueItem(e),
                                p
                        },
                        p.clearQueue = function () {
                            return p.busy.flag = !1,
                                p.queues = [],
                                p
                        },
                        p.stateChanged = !1, p.doubleChecker = !1, p.doubleCheckComplete = function () {
                        return p.stateChanged = !0,
                            p.doubleCheckClear(),
                            p
                    },
                        p.doubleCheckClear = function () {
                            return p.doubleChecker && (s(p.doubleChecker), p.doubleChecker = !1),
                                p
                        },
                        p.doubleCheck = function (e) {
                            return p.stateChanged = !1,
                                p.doubleCheckClear(),
                            p.bugs.ieDoubleCheck && (p.doubleChecker = a(function () {
                                    return p.doubleCheckClear(),
                                    p.stateChanged || e(),
                                        !0
                                },
                                p.options.doubleCheckInterval)),
                                p
                        },
                        p.safariStatePoll = function () {
                            var t, n = p.extractState(p.getLocationHref());
                            return p.isLastSavedState(n) ? void 0 : (t = n, t || (t = p.createStateObject()), p.Adapter.trigger(e, "popstate"), p)
                        },
                        p.back = function (e) {
                            return e !== !1 && p.busy() ? (p.pushQueue({
                                scope: p,
                                callback: p.back,
                                args: arguments,
                                queue: e
                            }), !1) : (p.busy(!0), p.doubleCheck(function () {
                                p.back(!1)
                            }), f.go(-1), !0)
                        },
                        p.forward = function (e) {
                            return e !== !1 && p.busy() ? (p.pushQueue({
                                scope: p,
                                callback: p.forward,
                                args: arguments,
                                queue: e
                            }), !1) : (p.busy(!0), p.doubleCheck(function () {
                                p.forward(!1)
                            }), f.go(1), !0)
                        },
                        p.go = function (e, t) {
                            var n;
                            if (e > 0) for (n = 1; e >= n; ++n) p.forward(t);
                            else {
                                if (!(0 > e)) throw new Error("History.go: History.go requires a positive or negative integer passed.");
                                for (n = -1; n >= e; --n) p.back(t)
                            }
                            return p
                        },
                        p.emulated.pushState) {
                    var h = function () {
                    };
                    p.pushState = p.pushState || h,
                        p.replaceState = p.replaceState || h
                } else p.onPopState = function (t, n) {
                    var i, o, r = !1,
                        a = !1;
                    return p.doubleCheckComplete(),
                        i = p.getHash(),
                        i ? (o = p.extractState(i || p.getLocationHref(), !0), o ? p.replaceState(o.data, o.title, o.url, !1) : (p.Adapter.trigger(e, "anchorchange"), p.busy(!1)), p.expectedStateId = !1, !1) : (r = p.Adapter.extractEventData("state", t, n) || !1, a = r ? p.getStateById(r) : p.expectedStateId ? p.getStateById(p.expectedStateId) : p.extractState(p.getLocationHref()), a || (a = p.createStateObject(null, null, p.getLocationHref())), p.expectedStateId = !1, p.isLastSavedState(a) ? (p.busy(!1), !1) : (p.storeState(a), p.saveState(a), p.setTitle(a), p.Adapter.trigger(e, "statechange"), p.busy(!1), !0))
                },
                    p.Adapter.bind(e, "popstate", p.onPopState),
                    p.pushState = function (t, n, i, o) {
                        if (p.getHashByUrl(i) && p.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                        if (o !== !1 && p.busy()) return p.pushQueue({
                            scope: p,
                            callback: p.pushState,
                            args: arguments,
                            queue: o
                        }),
                            !1;
                        p.busy(!0);
                        var r = p.createStateObject(t, n, i);
                        return p.isLastSavedState(r) ? p.busy(!1) : (p.storeState(r), p.expectedStateId = r.id, f.pushState(r.id, r.title, r.url), p.Adapter.trigger(e, "popstate")),
                            !0
                    },
                    p.replaceState = function (t, n, i, o) {
                        if (p.getHashByUrl(i) && p.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                        if (o !== !1 && p.busy()) return p.pushQueue({
                            scope: p,
                            callback: p.replaceState,
                            args: arguments,
                            queue: o
                        }),
                            !1;
                        p.busy(!0);
                        var r = p.createStateObject(t, n, i);
                        return p.isLastSavedState(r) ? p.busy(!1) : (p.storeState(r), p.expectedStateId = r.id, f.replaceState(r.id, r.title, r.url), p.Adapter.trigger(e, "popstate")),
                            !0
                    };
                if (r) {
                    try {
                        p.store = u.parse(r.getItem("History.store")) || {}
                    } catch (m) {
                        p.store = {}
                    }
                    p.normalizeStore()
                } else p.store = {},
                    p.normalizeStore();
                p.Adapter.bind(e, "unload", p.clearAllIntervals),
                    p.saveState(p.storeState(p.extractState(p.getLocationHref(), !0))),
                r && (p.onUnload = function () {
                    var e, t, n;
                    try {
                        e = u.parse(r.getItem("History.store")) || {}
                    } catch (i) {
                        e = {}
                    }
                    e.idToState = e.idToState || {},
                        e.urlToId = e.urlToId || {},
                        e.stateToId = e.stateToId || {};
                    for (t in p.idToState) p.idToState.hasOwnProperty(t) && (e.idToState[t] = p.idToState[t]);
                    for (t in p.urlToId) p.urlToId.hasOwnProperty(t) && (e.urlToId[t] = p.urlToId[t]);
                    for (t in p.stateToId) p.stateToId.hasOwnProperty(t) && (e.stateToId[t] = p.stateToId[t]);
                    p.store = e,
                        p.normalizeStore(),
                        n = u.stringify(e);
                    try {
                        r.setItem("History.store", n)
                    } catch (o) {
                        if (o.code !== DOMException.QUOTA_EXCEEDED_ERR) throw o;
                        r.length && (r.removeItem("History.store"), r.setItem("History.store", n))
                    }
                },
                    p.intervalList.push(l(p.onUnload, p.options.storeInterval)), p.Adapter.bind(e, "beforeunload", p.onUnload), p.Adapter.bind(e, "unload", p.onUnload)),
                p.emulated.pushState || (p.bugs.safariPoll && p.intervalList.push(l(p.safariStatePoll, p.options.safariPollInterval)), ("Apple Computer, Inc." === o.vendor || "Mozilla" === (o.appCodeName || "")) && (p.Adapter.bind(e, "hashchange",
                    function () {
                        p.Adapter.trigger(e, "popstate")
                    }), p.getHash() && p.Adapter.onDomLoad(function () {
                    p.Adapter.trigger(e, "hashchange")
                })))
            },
        (!p.options || !p.options.delayInit) && p.init()
    }(window),
    function (e, t) {
        "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.NProgress = t()
    }(this,function () {
            function e(e, t, n) {
                return t > e ? t : e > n ? n : e
            }

            function t(e) {
                return 100 * (-1 + e)
            }

            function n(e, n, i) {
                var o;
                return o = "translate3d" === c.positionUsing ? {
                    transform: "translate3d(" + t(e) + "%,0,0)"
                } : "translate" === c.positionUsing ? {
                    transform: "translate(" + t(e) + "%,0)"
                } : {
                    "margin-left": t(e) + "%"
                },
                    o.transition = "all " + n + "ms " + i,
                    o
            }

            function i(e, t) {
                var n = "string" == typeof e ? e : a(e);
                return n.indexOf(" " + t + " ") >= 0
            }

            function o(e, t) {
                var n = a(e),
                    o = n + t;
                i(n, t) || (e.className = o.substring(1))
            }

            function r(e, t) {
                var n, o = a(e);
                i(e, t) && (n = o.replace(" " + t + " ", " "), e.className = n.substring(1, n.length - 1))
            }

            function a(e) {
                return (" " + (e.className || "") + " ").replace(/\s+/gi, " ")
            }

            function s(e) {
                e && e.parentNode && e.parentNode.removeChild(e)
            }

            var l = {};
            l.version = "0.2.0";
            var c = l.settings = {
                minimum: .08,
                easing: "ease",
                positionUsing: "",
                speed: 200,
                trickle: !0,
                trickleRate: .02,
                trickleSpeed: 800,
                showSpinner: !0,
                barSelector: '[role="bar"]',
                spinnerSelector: '[role="spinner"]',
                parent: "body",
                template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            };
            l.configure = function (e) {
                var t, n;
                for (t in e) n = e[t],
                void 0 !== n && e.hasOwnProperty(t) && (c[t] = n);
                return this
            },
                l.status = null,
                l.set = function (t) {
                    var i = l.isStarted();
                    t = e(t, c.minimum, 1),
                        l.status = 1 === t ? null : t;
                    var o = l.render(!i),
                        r = o.querySelector(c.barSelector),
                        a = c.speed,
                        s = c.easing;
                    return o.offsetWidth,
                        u(function (e) {
                            "" === c.positionUsing && (c.positionUsing = l.getPositioningCSS()),
                                d(r, n(t, a, s)),
                                1 === t ? (d(o, {
                                    transition: "none",
                                    opacity: 1
                                }), o.offsetWidth, setTimeout(function () {
                                        d(o, {
                                            transition: "all " + a + "ms linear",
                                            opacity: 0
                                        }),
                                            setTimeout(function () {
                                                    l.remove(),
                                                        e()
                                                },
                                                a)
                                    },
                                    a)) : setTimeout(e, a)
                        }),
                        this
                },
                l.isStarted = function () {
                    return "number" == typeof l.status
                },
                l.start = function () {
                    l.status || l.set(0);
                    var e = function () {
                        setTimeout(function () {
                                l.status && (l.trickle(), e())
                            },
                            c.trickleSpeed)
                    };
                    return c.trickle && e(),
                        this
                },
                l.done = function (e) {
                    return e || l.status ? l.inc(.3 + .5 * Math.random()).set(1) : this
                },
                l.inc = function (t) {
                    var n = l.status;
                    return n ? ("number" != typeof t && (t = (1 - n) * e(Math.random() * n, .1, .95)), n = e(n + t, 0, .994), l.set(n)) : l.start()
                },
                l.trickle = function () {
                    return l.inc(Math.random() * c.trickleRate)
                },
                function () {
                    var e = 0,
                        t = 0;
                    l.promise = function (n) {
                        return n && "resolved" !== n.state() ? (0 === t && l.start(), e++, t++, n.always(function () {
                            t--,
                                0 === t ? (e = 0, l.done()) : l.set((e - t) / e)
                        }), this) : this
                    }
                }(),
                l.render = function (e) {
                    if (l.isRendered()) return document.getElementById("nprogress");
                    o(document.documentElement, "nprogress-busy");
                    var n = document.createElement("div");
                    n.id = "nprogress",
                        n.innerHTML = c.template;
                    var i, r = n.querySelector(c.barSelector),
                        a = e ? "-100" : t(l.status || 0),
                        u = document.querySelector(c.parent);
                    return d(r, {
                        transition: "all 0 linear",
                        transform: "translate3d(" + a + "%,0,0)"
                    }),
                    c.showSpinner || (i = n.querySelector(c.spinnerSelector), i && s(i)),
                    u != document.body && o(u, "nprogress-custom-parent"),
                        u.appendChild(n),
                        n
                },
                l.remove = function () {
                    r(document.documentElement, "nprogress-busy"),
                        r(document.querySelector(c.parent), "nprogress-custom-parent");
                    var e = document.getElementById("nprogress");
                    e && s(e)
                },
                l.isRendered = function () {
                    return !!document.getElementById("nprogress")
                },
                l.getPositioningCSS = function () {
                    var e = document.body.style,
                        t = "WebkitTransform" in e ? "Webkit" : "MozTransform" in e ? "Moz" : "msTransform" in e ? "ms" : "OTransform" in e ? "O" : "";
                    return t + "Perspective" in e ? "translate3d" : t + "Transform" in e ? "translate" : "margin"
                };
            var u = function () {
                    function e() {
                        var n = t.shift();
                        n && n(e)
                    }

                    var t = [];
                    return function (n) {
                        t.push(n),
                        1 == t.length && e()
                    }
                }(),
                d = function () {
                    function e(e) {
                        return e.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi,
                            function (e, t) {
                                return t.toUpperCase()
                            })
                    }

                    function t(e) {
                        var t = document.body.style;
                        if (e in t) return e;
                        for (var n, i = o.length,
                                 r = e.charAt(0).toUpperCase() + e.slice(1); i--;) if (n = o[i] + r, n in t) return n;
                        return e
                    }

                    function n(n) {
                        return n = e(n),
                        r[n] || (r[n] = t(n))
                    }

                    function i(e, t, i) {
                        t = n(t),
                            e.style[t] = i
                    }

                    var o = ["Webkit", "O", "Moz", "ms"],
                        r = {};
                    return function (e, t) {
                        var n, o, r = arguments;
                        if (2 == r.length) for (n in t) o = t[n],
                        void 0 !== o && t.hasOwnProperty(n) && i(e, n, o);
                        else i(e, r[1], r[2])
                    }
                }();
            return l
        }),function (e, t) {
        "object" == typeof exports ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Spinner = t()
    }(this,function () {
            "use strict";

            function e(e, t) {
                var n, i = document.createElement(e || "div");
                for (n in t) i[n] = t[n];
                return i
            }

            function t(e) {
                for (var t = 1,
                         n = arguments.length; n > t; t++) e.appendChild(arguments[t]);
                return e
            }

            function n(e, t, n, i) {
                var o = ["opacity", t, ~~(100 * e), n, i].join("-"),
                    r = .01 + 100 * (n / i),
                    a = Math.max(1 - (1 - e) / t * (100 - r), e),
                    s = c.substring(0, c.indexOf("Animation")).toLowerCase(),
                    l = s && "-" + s + "-" || "";
                return d[o] || (p.insertRule("@" + l + "keyframes " + o + "{0%{opacity:" + a + "}" + r + "%{opacity:" + e + "}" + (r + .01) + "%{opacity:1}" + (r + t) % 100 + "%{opacity:" + e + "}100%{opacity:" + a + "}}", p.cssRules.length), d[o] = 1),
                    o
            }

            function i(e, t) {
                var n, i, o = e.style;
                if (void 0 !== o[t]) return t;
                for (t = t.charAt(0).toUpperCase() + t.slice(1), i = 0; u.length > i; i++) if (n = u[i] + t, void 0 !== o[n]) return n
            }

            function o(e, t) {
                for (var n in t) e.style[i(e, n) || n] = t[n];
                return e
            }

            function r(e) {
                for (var t = 1; arguments.length > t; t++) {
                    var n = arguments[t];
                    for (var i in n) void 0 === e[i] && (e[i] = n[i])
                }
                return e
            }

            function a(e) {
                for (var t = {
                    x: e.offsetLeft,
                    y: e.offsetTop
                }; e = e.offsetParent;) t.x += e.offsetLeft,
                    t.y += e.offsetTop;
                return t
            }

            function s(e) {
                return void 0 === this ? new s(e) : void (this.opts = r(e || {},
                    s.defaults, f))
            }

            function l() {
                function n(t, n) {
                    return e("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', n)
                }

                p.addRule(".spin-vml", "behavior:url(#default#VML)"),
                    s.prototype.lines = function (e, i) {
                        function r() {
                            return o(n("group", {
                                coordsize: c + " " + c,
                                coordorigin: -l + " " + -l
                            }), {
                                width: c,
                                height: c
                            })
                        }

                        function a(e, a, s) {
                            t(d, t(o(r(), {
                                rotation: 360 / i.lines * e + "deg",
                                left: ~~a
                            }), t(o(n("roundrect", {
                                arcsize: i.corners
                            }), {
                                width: l,
                                height: i.width,
                                left: i.radius,
                                top: -i.width >> 1,
                                filter: s
                            }), n("fill", {
                                color: i.color,
                                opacity: i.opacity
                            }), n("stroke", {
                                opacity: 0
                            }))))
                        }

                        var s, l = i.length + i.width,
                            c = 2 * l,
                            u = 2 * -(i.width + i.length) + "px",
                            d = o(r(), {
                                position: "absolute",
                                top: u,
                                left: u
                            });
                        if (i.shadow) for (s = 1; i.lines >= s; s++) a(s, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
                        for (s = 1; i.lines >= s; s++) a(s);
                        return t(e, d)
                    },
                    s.prototype.opacity = function (e, t, n, i) {
                        var o = e.firstChild;
                        i = i.shadow && i.lines || 0,
                        o && o.childNodes.length > t + i && (o = o.childNodes[t + i], o = o && o.firstChild, o = o && o.firstChild, o && (o.opacity = n))
                    }
            }

            var c, u = ["webkit", "Moz", "ms", "O"],
                d = {},
                p = function () {
                    var n = e("style", {
                        type: "text/css"
                    });
                    return t(document.getElementsByTagName("head")[0], n),
                    n.sheet || n.styleSheet
                }(),
                f = {
                    lines: 12,
                    length: 7,
                    width: 5,
                    radius: 10,
                    rotate: 0,
                    corners: 1,
                    color: "#000",
                    direction: 1,
                    speed: 1,
                    trail: 100,
                    opacity: .25,
                    fps: 20,
                    zIndex: 2e9,
                    className: "spinner",
                    top: "auto",
                    left: "auto",
                    position: "relative"
                };
            s.defaults = {},
                r(s.prototype, {
                    spin: function (t) {
                        this.stop();
                        var n, i, r = this,
                            s = r.opts,
                            l = r.el = o(e(0, {
                                className: s.className
                            }), {
                                position: s.position,
                                width: 0,
                                zIndex: s.zIndex
                            }),
                            u = s.radius + s.length + s.width;
                        if (t && (t.insertBefore(l, t.firstChild || null), i = a(t), n = a(l), o(l, {
                                left: ("auto" == s.left ? i.x - n.x + (t.offsetWidth >> 1) : parseInt(s.left, 10) + u) + "px",
                                top: ("auto" == s.top ? i.y - n.y + (t.offsetHeight >> 1) : parseInt(s.top, 10) + u) + "px"
                            })), l.setAttribute("role", "progressbar"), r.lines(l, r.opts), !c) {
                            var d, p = 0,
                                f = (s.lines - 1) * (1 - s.direction) / 2,
                                h = s.fps,
                                m = h / s.speed,
                                g = (1 - s.opacity) / (m * s.trail / 100),
                                v = m / s.lines;
                            !
                                function y() {
                                    p++;
                                    for (var e = 0; s.lines > e; e++) d = Math.max(1 - (p + (s.lines - e) * v) % m * g, s.opacity),
                                        r.opacity(l, e * s.direction + f, d, s);
                                    r.timeout = r.el && setTimeout(y, ~~(1e3 / h))
                                }()
                        }
                        return r
                    },
                    stop: function () {
                        var e = this.el;
                        return e && (clearTimeout(this.timeout), e.parentNode && e.parentNode.removeChild(e), this.el = void 0),
                            this
                    },
                    lines: function (i, r) {
                        function a(t, n) {
                            return o(e(), {
                                position: "absolute",
                                width: r.length + r.width + "px",
                                height: r.width + "px",
                                background: t,
                                boxShadow: n,
                                transformOrigin: "left",
                                transform: "rotate(" + ~~(360 / r.lines * l + r.rotate) + "deg) translate(" + r.radius + "px,0)",
                                borderRadius: (r.corners * r.width >> 1) + "px"
                            })
                        }

                        for (var s, l = 0,
                                 u = (r.lines - 1) * (1 - r.direction) / 2; r.lines > l; l++) s = o(e(), {
                            position: "absolute",
                            top: 1 + ~(r.width / 2) + "px",
                            transform: r.hwaccel ? "translate3d(0,0,0)" : "",
                            opacity: r.opacity,
                            animation: c && n(r.opacity, r.trail, u + l * r.direction, r.lines) + " " + 1 / r.speed + "s linear infinite"
                        }),
                        r.shadow && t(s, o(a("#000", "0 0 4px #000"), {
                            top: "2px"
                        })),
                            t(i, t(s, a(r.color, "0 0 1px rgba(0,0,0,.1)")));
                        return i
                    },
                    opacity: function (e, t, n) {
                        e.childNodes.length > t && (e.childNodes[t].style.opacity = n)
                    }
                });
            var h = o(e("group"), {
                behavior: "url(#default#VML)"
            });
            return !i(h, "transform") && h.adj ? l() : c = i(h, "animation"),
                s
        }),function (e, t) {
        "object" == typeof exports ? module.exports = t() : "function" == typeof define && define.amd ? define(["spin"], t) : e.Ladda = t(e.Spinner)
    }(this,function (e) {
            "use strict";

            function t(e) {
                if (void 0 === e) return void console.warn("Ladda button target must be defined.");
                e.querySelector(".ladda-label") || (e.innerHTML = '<span class="ladda-label">' + e.innerHTML + "</span>");
                var t = o(e),
                    n = document.createElement("span");
                n.className = "ladda-spinner",
                    e.appendChild(n);
                var i, r = {
                    start: function () {
                        return e.setAttribute("disabled", ""),
                            e.setAttribute("data-loading", ""),
                            clearTimeout(i),
                            t.spin(n),
                            this.setProgress(0),
                            this
                    },
                    startAfter: function (e) {
                        return clearTimeout(i),
                            i = setTimeout(function () {
                                    r.start()
                                },
                                e),
                            this
                    },
                    stop: function () {
                        return e.removeAttribute("disabled"),
                            e.removeAttribute("data-loading"),
                            clearTimeout(i),
                            i = setTimeout(function () {
                                    t.stop()
                                },
                                1e3),
                            this
                    },
                    toggle: function () {
                        return this.isLoading() ? this.stop() : this.start(),
                            this
                    },
                    setProgress: function (t) {
                        t = Math.max(Math.min(t, 1), 0);
                        var n = e.querySelector(".ladda-progress");
                        0 === t && n && n.parentNode ? n.parentNode.removeChild(n) : (n || (n = document.createElement("div"), n.className = "ladda-progress", e.appendChild(n)), n.style.width = (t || 0) * e.offsetWidth + "px")
                    },
                    enable: function () {
                        return this.stop(),
                            this
                    },
                    disable: function () {
                        return this.stop(),
                            e.setAttribute("disabled", ""),
                            this
                    },
                    isLoading: function () {
                        return e.hasAttribute("data-loading")
                    }
                };
                return a.push(r),
                    r
            }

            function n(e, n) {
                n = n || {};
                var i = [];
                "string" == typeof e ? i = r(document.querySelectorAll(e)) : "object" == typeof e && "string" == typeof e.nodeName && (i = [e]);
                for (var o = 0,
                         a = i.length; a > o; o++) (function () {
                    var e = i[o];
                    if ("function" == typeof e.addEventListener) {
                        var r = t(e),
                            a = -1;
                        e.addEventListener("click",
                            function () {
                                r.startAfter(1),
                                "number" == typeof n.timeout && (clearTimeout(a), a = setTimeout(r.stop, n.timeout)),
                                "function" == typeof n.callback && n.callback.apply(null, [r])
                            },
                            !1)
                    }
                })()
            }

            function i() {
                for (var e = 0,
                         t = a.length; t > e; e++) a[e].stop()
            }

            function o(t) {
                var n, i = t.offsetHeight;
                i > 32 && (i *= .8),
                t.hasAttribute("data-spinner-size") && (i = parseInt(t.getAttribute("data-spinner-size"), 10)),
                t.hasAttribute("data-spinner-color") && (n = t.getAttribute("data-spinner-color"));
                var o = 12,
                    r = .2 * i,
                    a = .6 * r,
                    s = 7 > r ? 2 : 3;
                return new e({
                    color: n || "#fff",
                    lines: o,
                    radius: r,
                    length: a,
                    width: s,
                    zIndex: "auto",
                    top: "auto",
                    left: "auto",
                    className: ""
                })
            }

            function r(e) {
                for (var t = [], n = 0; e.length > n; n++) t.push(e[n]);
                return t
            }

            var a = [];
            return {
                bind: n,
                create: t,
                stopAll: i
            }
        }),!function (e) {
            "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e : e(jQuery)
        }(function (e) {
            function t(t) {
                var a = t || window.event,
                    s = l.call(arguments, 1),
                    c = 0,
                    d = 0,
                    p = 0,
                    f = 0,
                    h = 0,
                    m = 0;
                if (t = e.event.fix(a), t.type = "mousewheel", "detail" in a && (p = -1 * a.detail), "wheelDelta" in a && (p = a.wheelDelta), "wheelDeltaY" in a && (p = a.wheelDeltaY), "wheelDeltaX" in a && (d = -1 * a.wheelDeltaX), "axis" in a && a.axis === a.HORIZONTAL_AXIS && (d = -1 * p, p = 0), c = 0 === p ? d : p, "deltaY" in a && (p = -1 * a.deltaY, c = p), "deltaX" in a && (d = a.deltaX, 0 === p && (c = -1 * d)), 0 !== p || 0 !== d) {
                    if (1 === a.deltaMode) {
                        var g = e.data(this, "mousewheel-line-height");
                        c *= g,
                            p *= g,
                            d *= g
                    } else if (2 === a.deltaMode) {
                        var v = e.data(this, "mousewheel-page-height");
                        c *= v,
                            p *= v,
                            d *= v
                    }
                    if (f = Math.max(Math.abs(p), Math.abs(d)), (!r || r > f) && (r = f, i(a, f) && (r /= 40)), i(a, f) && (c /= 40, d /= 40, p /= 40), c = Math[c >= 1 ? "floor" : "ceil"](c / r), d = Math[d >= 1 ? "floor" : "ceil"](d / r), p = Math[p >= 1 ? "floor" : "ceil"](p / r), u.settings.normalizeOffset && this.getBoundingClientRect) {
                        var y = this.getBoundingClientRect();
                        h = t.clientX - y.left,
                            m = t.clientY - y.top
                    }
                    return t.deltaX = d,
                        t.deltaY = p,
                        t.deltaFactor = r,
                        t.offsetX = h,
                        t.offsetY = m,
                        t.deltaMode = 0,
                        s.unshift(t, c, d, p),
                    o && clearTimeout(o),
                        o = setTimeout(n, 200),
                        (e.event.dispatch || e.event.handle).apply(this, s)
                }
            }

            function n() {
                r = null
            }

            function i(e, t) {
                return u.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 === 0
            }

            var o, r, a = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
                s = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
                l = Array.prototype.slice;
            if (e.event.fixHooks) for (var c = a.length; c;) e.event.fixHooks[a[--c]] = e.event.mouseHooks;
            var u = e.event.special.mousewheel = {
                version: "3.1.12",
                setup: function () {
                    if (this.addEventListener) for (var n = s.length; n;) this.addEventListener(s[--n], t, !1);
                    else this.onmousewheel = t;
                    e.data(this, "mousewheel-line-height", u.getLineHeight(this)),
                        e.data(this, "mousewheel-page-height", u.getPageHeight(this))
                },
                teardown: function () {
                    if (this.removeEventListener) for (var n = s.length; n;) this.removeEventListener(s[--n], t, !1);
                    else this.onmousewheel = null;
                    e.removeData(this, "mousewheel-line-height"),
                        e.removeData(this, "mousewheel-page-height")
                },
                getLineHeight: function (t) {
                    var n = e(t),
                        i = n["offsetParent" in e.fn ? "offsetParent" : "parent"]();
                    return i.length || (i = e("body")),
                    parseInt(i.css("fontSize"), 10) || parseInt(n.css("fontSize"), 10) || 16
                },
                getPageHeight: function (t) {
                    return e(t).height()
                },
                settings: {
                    adjustOldDeltas: !0,
                    normalizeOffset: !0
                }
            };
            e.fn.extend({
                mousewheel: function (e) {
                    return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
                },
                unmousewheel: function (e) {
                    return this.unbind("mousewheel", e)
                }
            })
        });
var Stats = function () {
    var e = Date.now(),
        t = e,
        n = 0,
        i = 1 / 0,
        o = 0,
        r = 0,
        a = 1 / 0,
        s = 0,
        l = 0,
        c = 0,
        u = document.createElement("div");
    u.id = "stats",
        u.addEventListener("mousedown",
            function (e) {
                e.preventDefault(),
                    y(++c % 2)
            },
            !1),
        u.style.cssText = "width:80px;opacity:0.9;cursor:pointer";
    var d = document.createElement("div");
    d.id = "fps",
        d.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#002",
        u.appendChild(d);
    var p = document.createElement("div");
    p.id = "fpsText",
        p.style.cssText = "color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",
        p.innerHTML = "FPS",
        d.appendChild(p);
    var f = document.createElement("div");
    for (f.id = "fpsGraph", f.style.cssText = "position:relative;width:74px;height:30px;background-color:#0ff", d.appendChild(f); 74 > f.children.length;) {
        var h = document.createElement("span");
        h.style.cssText = "width:1px;height:30px;float:left;background-color:#113",
            f.appendChild(h)
    }
    var m = document.createElement("div");
    m.id = "ms",
        m.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#020;display:none",
        u.appendChild(m);
    var g = document.createElement("div");
    g.id = "msText",
        g.style.cssText = "color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",
        g.innerHTML = "MS",
        m.appendChild(g);
    var v = document.createElement("div");
    for (v.id = "msGraph", v.style.cssText = "position:relative;width:74px;height:30px;background-color:#0f0", m.appendChild(v); 74 > v.children.length;) h = document.createElement("span"),
        h.style.cssText = "width:1px;height:30px;float:left;background-color:#131",
        v.appendChild(h);
    var y = function (e) {
        switch (c = e) {
            case 0:
                d.style.display = "block",
                    m.style.display = "none";
                break;
            case 1:
                d.style.display = "none",
                    m.style.display = "block"
        }
    };
    return {
        REVISION: 12,
        domElement: u,
        setMode: y,
        begin: function () {
            e = Date.now()
        },
        end: function () {
            var c = Date.now();
            n = c - e,
                i = Math.min(i, n),
                o = Math.max(o, n),
                g.textContent = n + " MS (" + i + "-" + o + ")";
            var u = Math.min(30, 30 - 30 * (n / 200));
            return v.appendChild(v.firstChild).style.height = u + "px",
                l++,
            c > t + 1e3 && (r = Math.round(1e3 * l / (c - t)), a = Math.min(a, r), s = Math.max(s, r), p.textContent = r + " FPS (" + a + "-" + s + ")", u = Math.min(30, 30 - 30 * (r / 100)), f.appendChild(f.firstChild).style.height = u + "px", t = c, l = 0),
                c
        },
        update: function () {
            e = this.end()
        }
    }
};
"object" == typeof module && (module.exports = Stats),
    !function (e) {
            "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
        }(function (e) {
            var t, n, i, o, r, a, s = "Close",
                l = "BeforeClose",
                c = "AfterClose",
                u = "BeforeAppend",
                d = "MarkupParse",
                p = "Open",
                f = "Change",
                h = "mfp",
                m = "." + h,
                g = "mfp-ready",
                v = "mfp-removing",
                y = "mfp-prevent-close",
                w = function () {
                },
                b = !!window.jQuery,
                x = e(window),
                S = function (e, n) {
                    t.ev.on(h + e + m, n)
                },
                C = function (t, n, i, o) {
                    var r = document.createElement("div");
                    return r.className = "mfp-" + t,
                    i && (r.innerHTML = i),
                        o ? n && n.appendChild(r) : (r = e(r), n && r.appendTo(n)),
                        r
                },
                T = function (n, i) {
                    t.ev.triggerHandler(h + n, i),
                    t.st.callbacks && (n = n.charAt(0).toLowerCase() + n.slice(1), t.st.callbacks[n] && t.st.callbacks[n].apply(t, e.isArray(i) ? i : [i]))
                },
                E = function (n) {
                    return n === a && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)), a = n),
                        t.currTemplate.closeBtn
                },
                _ = function () {
                    e.magnificPopup.instance || (t = new w, t.init(), e.magnificPopup.instance = t)
                },
                I = function () {
                    var e = document.createElement("p").style,
                        t = ["ms", "O", "Moz", "Webkit"];
                    if (void 0 !== e.transition) return !0;
                    for (; t.length;) if (t.pop() + "Transition" in e) return !0;
                    return !1
                };
            w.prototype = {
                constructor: w,
                init: function () {
                    var n = navigator.appVersion;
                    t.isIE7 = -1 !== n.indexOf("MSIE 7."),
                        t.isIE8 = -1 !== n.indexOf("MSIE 8."),
                        t.isLowIE = t.isIE7 || t.isIE8,
                        t.isAndroid = /android/gi.test(n),
                        t.isIOS = /iphone|ipad|ipod/gi.test(n),
                        t.supportsTransition = I(),
                        t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),
                        i = e(document),
                        t.popupsCache = {}
                },
                open: function (n) {
                    var o;
                    if (n.isObj === !1) {
                        t.items = n.items.toArray(),
                            t.index = 0;
                        var a, s = n.items;
                        for (o = 0; o < s.length; o++) if (a = s[o], a.parsed && (a = a.el[0]), a === n.el[0]) {
                            t.index = o;
                            break
                        }
                    } else t.items = e.isArray(n.items) ? n.items : [n.items],
                        t.index = n.index || 0;
                    if (t.isOpen) return void t.updateItemHTML();
                    t.types = [],
                        r = "",
                        t.ev = n.mainEl && n.mainEl.length ? n.mainEl.eq(0) : i,
                        n.key ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}), t.currTemplate = t.popupsCache[n.key]) : t.currTemplate = {},
                        t.st = e.extend(!0, {},
                            e.magnificPopup.defaults, n),
                        t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos,
                    t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1),
                    t.bgOverlay || (t.bgOverlay = C("bg").on("click" + m,
                        function () {
                            t.close()
                        }), t.wrap = C("wrap").attr("tabindex", -1).on("click" + m,
                        function (e) {
                            t._checkIfClose(e.target) && t.close()
                        }), t.container = C("container", t.wrap)),
                        t.contentContainer = C("content"),
                    t.st.preloader && (t.preloader = C("preloader", t.container, t.st.tLoading));
                    var l = e.magnificPopup.modules;
                    for (o = 0; o < l.length; o++) {
                        var c = l[o];
                        c = c.charAt(0).toUpperCase() + c.slice(1),
                            t["init" + c].call(t)
                    }
                    T("BeforeOpen"),
                    t.st.showCloseBtn && (t.st.closeBtnInside ? (S(d,
                        function (e, t, n, i) {
                            n.close_replaceWith = E(i.type)
                        }), r += " mfp-close-btn-in") : t.wrap.append(E())),
                    t.st.alignTop && (r += " mfp-align-top"),
                        t.wrap.css(t.fixedContentPos ? {
                            overflow: t.st.overflowY,
                            overflowX: "hidden",
                            overflowY: t.st.overflowY
                        } : {
                            top: x.scrollTop(),
                            position: "absolute"
                        }),
                    (t.st.fixedBgPos === !1 || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
                        height: i.height(),
                        position: "absolute"
                    }),
                    t.st.enableEscapeKey && i.on("keyup" + m,
                        function (e) {
                            27 === e.keyCode && t.close()
                        }),
                        x.on("resize" + m,
                            function () {
                                t.updateSize()
                            }),
                    t.st.closeOnContentClick || (r += " mfp-auto-cursor"),
                    r && t.wrap.addClass(r);
                    var u = t.wH = x.height(),
                        f = {};
                    if (t.fixedContentPos && t._hasScrollBar(u)) {
                        var h = t._getScrollbarSize();
                        h && (f.marginRight = h)
                    }
                    t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : f.overflow = "hidden");
                    var v = t.st.mainClass;
                    return t.isIE7 && (v += " mfp-ie7"),
                    v && t._addClassToMFP(v),
                        t.updateItemHTML(),
                        T("BuildControls"),
                        e("html").css(f),
                        t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)),
                        t._lastFocusedEl = document.activeElement,
                        setTimeout(function () {
                                t.content ? (t._addClassToMFP(g), t._setFocus()) : t.bgOverlay.addClass(g),
                                    i.on("focusin" + m, t._onFocusIn)
                            },
                            16),
                        t.isOpen = !0,
                        t.updateSize(u),
                        T(p),
                        n
                },
                close: function () {
                    t.isOpen && (T(l), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(v), setTimeout(function () {
                            t._close()
                        },
                        t.st.removalDelay)) : t._close())
                },
                _close: function () {
                    T(s);
                    var n = v + " " + g + " ";
                    if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (n += t.st.mainClass + " "), t._removeClassFromMFP(n), t.fixedContentPos) {
                        var o = {
                            marginRight: ""
                        };
                        t.isIE7 ? e("body, html").css("overflow", "") : o.overflow = "",
                            e("html").css(o)
                    }
                    i.off("keyup" + m + " focusin" + m),
                        t.ev.off(m),
                        t.wrap.attr("class", "mfp-wrap").removeAttr("style"),
                        t.bgOverlay.attr("class", "mfp-bg"),
                        t.container.attr("class", "mfp-container"),
                    !t.st.showCloseBtn || t.st.closeBtnInside && t.currTemplate[t.currItem.type] !== !0 || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(),
                    t._lastFocusedEl && e(t._lastFocusedEl).focus(),
                        t.currItem = null,
                        t.content = null,
                        t.currTemplate = null,
                        t.prevHeight = 0,
                        T(c)
                },
                updateSize: function (e) {
                    if (t.isIOS) {
                        var n = document.documentElement.clientWidth / window.innerWidth,
                            i = window.innerHeight * n;
                        t.wrap.css("height", i),
                            t.wH = i
                    } else t.wH = e || x.height();
                    t.fixedContentPos || t.wrap.css("height", t.wH),
                        T("Resize")
                },
                updateItemHTML: function () {
                    var n = t.items[t.index];
                    t.contentContainer.detach(),
                    t.content && t.content.detach(),
                    n.parsed || (n = t.parseEl(t.index));
                    var i = n.type;
                    if (T("BeforeChange", [t.currItem ? t.currItem.type : "", i]), t.currItem = n, !t.currTemplate[i]) {
                        var r = t.st[i] ? t.st[i].markup : !1;
                        T("FirstMarkupParse", r),
                            t.currTemplate[i] = r ? e(r) : !0
                    }
                    o && o !== n.type && t.container.removeClass("mfp-" + o + "-holder");
                    var a = t["get" + i.charAt(0).toUpperCase() + i.slice(1)](n, t.currTemplate[i]);
                    t.appendContent(a, i),
                        n.preloaded = !0,
                        T(f, n),
                        o = n.type,
                        t.container.prepend(t.contentContainer),
                        T("AfterChange")
                },
                appendContent: function (e, n) {
                    t.content = e,
                        e ? t.st.showCloseBtn && t.st.closeBtnInside && t.currTemplate[n] === !0 ? t.content.find(".mfp-close").length || t.content.append(E()) : t.content = e : t.content = "",
                        T(u),
                        t.container.addClass("mfp-" + n + "-holder"),
                        t.contentContainer.append(t.content)
                },
                parseEl: function (n) {
                    var i, o = t.items[n];
                    if (o.tagName ? o = {
                            el: e(o)
                        } : (i = o.type, o = {
                            data: o,
                            src: o.src
                        }), o.el) {
                        for (var r = t.types,
                                 a = 0; a < r.length; a++) if (o.el.hasClass("mfp-" + r[a])) {
                            i = r[a];
                            break
                        }
                        o.src = o.el.attr("data-mfp-src"),
                        o.src || (o.src = o.el.attr("href"))
                    }
                    return o.type = i || t.st.type || "inline",
                        o.index = n,
                        o.parsed = !0,
                        t.items[n] = o,
                        T("ElementParse", o),
                        t.items[n]
                },
                addGroup: function (e, n) {
                    var i = function (i) {
                        i.mfpEl = this,
                            t._openClick(i, e, n)
                    };
                    n || (n = {});
                    var o = "click.magnificPopup";
                    n.mainEl = e,
                        n.items ? (n.isObj = !0, e.off(o).on(o, i)) : (n.isObj = !1, n.delegate ? e.off(o).on(o, n.delegate, i) : (n.items = e, e.off(o).on(o, i)))
                },
                _openClick: function (n, i, o) {
                    var r = void 0 !== o.midClick ? o.midClick : e.magnificPopup.defaults.midClick;
                    if (r || 2 !== n.which && !n.ctrlKey && !n.metaKey) {
                        var a = void 0 !== o.disableOn ? o.disableOn : e.magnificPopup.defaults.disableOn;
                        if (a) if (e.isFunction(a)) {
                            if (!a.call(t)) return !0
                        } else if (x.width() < a) return !0;
                        n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()),
                            o.el = e(n.mfpEl),
                        o.delegate && (o.items = i.find(o.delegate)),
                            t.open(o)
                    }
                },
                updateStatus: function (e, i) {
                    if (t.preloader) {
                        n !== e && t.container.removeClass("mfp-s-" + n),
                        i || "loading" !== e || (i = t.st.tLoading);
                        var o = {
                            status: e,
                            text: i
                        };
                        T("UpdateStatus", o),
                            e = o.status,
                            i = o.text,
                            t.preloader.html(i),
                            t.preloader.find("a").on("click",
                                function (e) {
                                    e.stopImmediatePropagation()
                                }),
                            t.container.addClass("mfp-s-" + e),
                            n = e
                    }
                },
                _checkIfClose: function (n) {
                    if (!e(n).hasClass(y)) {
                        var i = t.st.closeOnContentClick,
                            o = t.st.closeOnBgClick;
                        if (i && o) return !0;
                        if (!t.content || e(n).hasClass("mfp-close") || t.preloader && n === t.preloader[0]) return !0;
                        if (n === t.content[0] || e.contains(t.content[0], n)) {
                            if (i) return !0
                        } else if (o && e.contains(document, n)) return !0;
                        return !1
                    }
                },
                _addClassToMFP: function (e) {
                    t.bgOverlay.addClass(e),
                        t.wrap.addClass(e)
                },
                _removeClassFromMFP: function (e) {
                    this.bgOverlay.removeClass(e),
                        t.wrap.removeClass(e)
                },
                _hasScrollBar: function (e) {
                    return (t.isIE7 ? i.height() : document.body.scrollHeight) > (e || x.height())
                },
                _setFocus: function () {
                    (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
                },
                _onFocusIn: function (n) {
                    return n.target === t.wrap[0] || e.contains(t.wrap[0], n.target) ? void 0 : (t._setFocus(), !1)
                },
                _parseMarkup: function (t, n, i) {
                    var o;
                    i.data && (n = e.extend(i.data, n)),
                        T(d, [t, n, i]),
                        e.each(n,
                            function (e, n) {
                                if (void 0 === n || n === !1) return !0;
                                if (o = e.split("_"), o.length > 1) {
                                    var i = t.find(m + "-" + o[0]);
                                    if (i.length > 0) {
                                        var r = o[1];
                                        "replaceWith" === r ? i[0] !== n[0] && i.replaceWith(n) : "img" === r ? i.is("img") ? i.attr("src", n) : i.replaceWith('<img src="' + n + '" class="' + i.attr("class") + '" />') : i.attr(o[1], n)
                                    }
                                } else t.find(m + "-" + e).html(n)
                            })
                },
                _getScrollbarSize: function () {
                    if (void 0 === t.scrollbarSize) {
                        var e = document.createElement("div");
                        e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",
                            document.body.appendChild(e),
                            t.scrollbarSize = e.offsetWidth - e.clientWidth,
                            document.body.removeChild(e)
                    }
                    return t.scrollbarSize
                }
            },
                e.magnificPopup = {
                    instance: null,
                    proto: w.prototype,
                    modules: [],
                    open: function (t, n) {
                        return _(),
                            t = t ? e.extend(!0, {},
                                t) : {},
                            t.isObj = !0,
                            t.index = n || 0,
                            this.instance.open(t)
                    },
                    close: function () {
                        return e.magnificPopup.instance && e.magnificPopup.instance.close()
                    },
                    registerModule: function (t, n) {
                        n.options && (e.magnificPopup.defaults[t] = n.options),
                            e.extend(this.proto, n.proto),
                            this.modules.push(t)
                    },
                    defaults: {
                        disableOn: 0,
                        key: null,
                        midClick: !1,
                        mainClass: "",
                        preloader: !0,
                        focus: "",
                        closeOnContentClick: !1,
                        closeOnBgClick: !0,
                        closeBtnInside: !0,
                        showCloseBtn: !0,
                        enableEscapeKey: !0,
                        modal: !1,
                        alignTop: !1,
                        removalDelay: 0,
                        prependTo: null,
                        fixedContentPos: "auto",
                        fixedBgPos: "auto",
                        overflowY: "auto",
                        closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
                        tClose: "Close (Esc)",
                        tLoading: "Loading..."
                    }
                },
                e.fn.magnificPopup = function (n) {
                    _();
                    var i = e(this);
                    if ("string" == typeof n) if ("open" === n) {
                        var o, r = b ? i.data("magnificPopup") : i[0].magnificPopup,
                            a = parseInt(arguments[1], 10) || 0;
                        r.items ? o = r.items[a] : (o = i, r.delegate && (o = o.find(r.delegate)), o = o.eq(a)),
                            t._openClick({
                                    mfpEl: o
                                },
                                i, r)
                    } else t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1));
                    else n = e.extend(!0, {},
                        n),
                        b ? i.data("magnificPopup", n) : i[0].magnificPopup = n,
                        t.addGroup(i, n);
                    return i
                };
            var P, k, M, H = "inline",
                O = function () {
                    M && (k.after(M.addClass(P)).detach(), M = null)
                };
            e.magnificPopup.registerModule(H, {
                options: {
                    hiddenClass: "hide",
                    markup: "",
                    tNotFound: "Content not found"
                },
                proto: {
                    initInline: function () {
                        t.types.push(H),
                            S(s + "." + H,
                                function () {
                                    O()
                                })
                    },
                    getInline: function (n, i) {
                        if (O(), n.src) {
                            var o = t.st.inline,
                                r = e(n.src);
                            if (r.length) {
                                var a = r[0].parentNode;
                                a && a.tagName && (k || (P = o.hiddenClass, k = C(P), P = "mfp-" + P), M = r.after(k).detach().removeClass(P)),
                                    t.updateStatus("ready")
                            } else t.updateStatus("error", o.tNotFound),
                                r = e("<div>");
                            return n.inlineElement = r,
                                r
                        }
                        return t.updateStatus("ready"),
                            t._parseMarkup(i, {},
                                n),
                            i
                    }
                }
            });
            var B, L = "ajax",
                A = function () {
                    B && e(document.body).removeClass(B)
                },
                $ = function () {
                    A(),
                    t.req && t.req.abort()
                };
            e.magnificPopup.registerModule(L, {
                options: {
                    settings: null,
                    cursor: "mfp-ajax-cur",
                    tError: '<a href="%url%">The content</a> could not be loaded.'
                },
                proto: {
                    initAjax: function () {
                        t.types.push(L),
                            B = t.st.ajax.cursor,
                            S(s + "." + L, $),
                            S("BeforeChange." + L, $)
                    },
                    getAjax: function (n) {
                        B && e(document.body).addClass(B),
                            t.updateStatus("loading");
                        var i = e.extend({
                                url: n.src,
                                success: function (i, o, r) {
                                    var a = {
                                        data: i,
                                        xhr: r
                                    };
                                    T("ParseAjax", a),
                                        t.appendContent(e(a.data), L),
                                        n.finished = !0,
                                        A(),
                                        t._setFocus(),
                                        setTimeout(function () {
                                                t.wrap.addClass(g)
                                            },
                                            16),
                                        t.updateStatus("ready"),
                                        T("AjaxContentAdded")
                                },
                                error: function () {
                                    A(),
                                        n.finished = n.loadError = !0,
                                        t.updateStatus("error", t.st.ajax.tError.replace("%url%", n.src))
                                }
                            },
                            t.st.ajax.settings);
                        return t.req = e.ajax(i),
                            ""
                    }
                }
            });
            var j, z = function (n) {
                if (n.data && void 0 !== n.data.title) return n.data.title;
                var i = t.st.image.titleSrc;
                if (i) {
                    if (e.isFunction(i)) return i.call(t, n);
                    if (n.el) return n.el.attr(i) || ""
                }
                return ""
            };
            e.magnificPopup.registerModule("image", {
                options: {
                    markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
                    cursor: "mfp-zoom-out-cur",
                    titleSrc: "title",
                    verticalFit: !0,
                    tError: '<a href="%url%">The image</a> could not be loaded.'
                },
                proto: {
                    initImage: function () {
                        var n = t.st.image,
                            i = ".image";
                        t.types.push("image"),
                            S(p + i,
                                function () {
                                    "image" === t.currItem.type && n.cursor && e(document.body).addClass(n.cursor)
                                }),
                            S(s + i,
                                function () {
                                    n.cursor && e(document.body).removeClass(n.cursor),
                                        x.off("resize" + m)
                                }),
                            S("Resize" + i, t.resizeImage),
                        t.isLowIE && S("AfterChange", t.resizeImage)
                    },
                    resizeImage: function () {
                        var e = t.currItem;
                        if (e && e.img && t.st.image.verticalFit) {
                            var n = 0;
                            t.isLowIE && (n = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)),
                                e.img.css("max-height", t.wH - n)
                        }
                    },
                    _onImageHasSize: function (e) {
                        e.img && (e.hasSize = !0, j && clearInterval(j), e.isCheckingImgSize = !1, T("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), e.imgHidden = !1))
                    },
                    findImageSize: function (e) {
                        var n = 0,
                            i = e.img[0],
                            o = function (r) {
                                j && clearInterval(j),
                                    j = setInterval(function () {
                                            return i.naturalWidth > 0 ? void t._onImageHasSize(e) : (n > 200 && clearInterval(j), n++, void (3 === n ? o(10) : 40 === n ? o(50) : 100 === n && o(500)))
                                        },
                                        r)
                            };
                        o(1)
                    },
                    getImage: function (n, i) {
                        var o = 0,
                            r = function () {
                                n && (n.img[0].complete ? (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("ready")), n.hasSize = !0, n.loaded = !0, T("ImageLoadComplete")) : (o++, 200 > o ? setTimeout(r, 100) : a()))
                            },
                            a = function () {
                                n && (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("error", s.tError.replace("%url%", n.src))), n.hasSize = !0, n.loaded = !0, n.loadError = !0)
                            },
                            s = t.st.image,
                            l = i.find(".mfp-img");
                        if (l.length) {
                            var c = document.createElement("img");
                            c.className = "mfp-img",
                            n.el && n.el.find("img").length && (c.alt = n.el.find("img").attr("alt")),
                                n.img = e(c).on("load.mfploader", r).on("error.mfploader", a),
                                c.src = n.src,
                            l.is("img") && (n.img = n.img.clone()),
                                c = n.img[0],
                                c.naturalWidth > 0 ? n.hasSize = !0 : c.width || (n.hasSize = !1)
                        }
                        return t._parseMarkup(i, {
                                title: z(n),
                                img_replaceWith: n.img
                            },
                            n),
                            t.resizeImage(),
                            n.hasSize ? (j && clearInterval(j), n.loadError ? (i.addClass("mfp-loading"), t.updateStatus("error", s.tError.replace("%url%", n.src))) : (i.removeClass("mfp-loading"), t.updateStatus("ready")), i) : (t.updateStatus("loading"), n.loading = !0, n.hasSize || (n.imgHidden = !0, i.addClass("mfp-loading"), t.findImageSize(n)), i)
                    }
                }
            });
            var F, N = function () {
                return void 0 === F && (F = void 0 !== document.createElement("p").style.MozTransform),
                    F
            };
            e.magnificPopup.registerModule("zoom", {
                options: {
                    enabled: !1,
                    easing: "ease-in-out",
                    duration: 300,
                    opener: function (e) {
                        return e.is("img") ? e : e.find("img")
                    }
                },
                proto: {
                    initZoom: function () {
                        var e, n = t.st.zoom,
                            i = ".zoom";
                        if (n.enabled && t.supportsTransition) {
                            var o, r, a = n.duration,
                                c = function (e) {
                                    var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                        i = "all " + n.duration / 1e3 + "s " + n.easing,
                                        o = {
                                            position: "fixed",
                                            zIndex: 9999,
                                            left: 0,
                                            top: 0,
                                            "-webkit-backface-visibility": "hidden"
                                        },
                                        r = "transition";
                                    return o["-webkit-" + r] = o["-moz-" + r] = o["-o-" + r] = o[r] = i,
                                        t.css(o),
                                        t
                                },
                                u = function () {
                                    t.content.css("visibility", "visible")
                                };
                            S("BuildControls" + i,
                                function () {
                                    if (t._allowZoom()) {
                                        if (clearTimeout(o), t.content.css("visibility", "hidden"), e = t._getItemToZoom(), !e) return void u();
                                        r = c(e),
                                            r.css(t._getOffset()),
                                            t.wrap.append(r),
                                            o = setTimeout(function () {
                                                    r.css(t._getOffset(!0)),
                                                        o = setTimeout(function () {
                                                                u(),
                                                                    setTimeout(function () {
                                                                            r.remove(),
                                                                                e = r = null,
                                                                                T("ZoomAnimationEnded")
                                                                        },
                                                                        16)
                                                            },
                                                            a)
                                                },
                                                16)
                                    }
                                }),
                                S(l + i,
                                    function () {
                                        if (t._allowZoom()) {
                                            if (clearTimeout(o), t.st.removalDelay = a, !e) {
                                                if (e = t._getItemToZoom(), !e) return;
                                                r = c(e)
                                            }
                                            r.css(t._getOffset(!0)),
                                                t.wrap.append(r),
                                                t.content.css("visibility", "hidden"),
                                                setTimeout(function () {
                                                        r.css(t._getOffset())
                                                    },
                                                    16)
                                        }
                                    }),
                                S(s + i,
                                    function () {
                                        t._allowZoom() && (u(), r && r.remove(), e = null)
                                    })
                        }
                    },
                    _allowZoom: function () {
                        return "image" === t.currItem.type
                    },
                    _getItemToZoom: function () {
                        return t.currItem.hasSize ? t.currItem.img : !1
                    },
                    _getOffset: function (n) {
                        var i;
                        i = n ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
                        var o = i.offset(),
                            r = parseInt(i.css("padding-top"), 10),
                            a = parseInt(i.css("padding-bottom"), 10);
                        o.top -= e(window).scrollTop() - r;
                        var s = {
                            width: i.width(),
                            height: (b ? i.innerHeight() : i[0].offsetHeight) - a - r
                        };
                        return N() ? s["-moz-transform"] = s.transform = "translate(" + o.left + "px," + o.top + "px)" : (s.left = o.left, s.top = o.top),
                            s
                    }
                }
            });
            var D = "iframe",
                U = "//about:blank",
                R = function (e) {
                    if (t.currTemplate[D]) {
                        var n = t.currTemplate[D].find("iframe");
                        n.length && (e || (n[0].src = U), t.isIE8 && n.css("display", e ? "block" : "none"))
                    }
                };
            e.magnificPopup.registerModule(D, {
                options: {
                    markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
                    srcAction: "iframe_src",
                    patterns: {
                        youtube: {
                            index: "youtube.com",
                            id: "v=",
                            src: "//www.youtube.com/embed/%id%?autoplay=1"
                        },
                        vimeo: {
                            index: "vimeo.com/",
                            id: "/",
                            src: "//player.vimeo.com/video/%id%?autoplay=1"
                        },
                        gmaps: {
                            index: "//maps.google.",
                            src: "%id%&output=embed"
                        }
                    }
                },
                proto: {
                    initIframe: function () {
                        t.types.push(D),
                            S("BeforeChange",
                                function (e, t, n) {
                                    t !== n && (t === D ? R() : n === D && R(!0))
                                }),
                            S(s + "." + D,
                                function () {
                                    R()
                                })
                    },
                    getIframe: function (n, i) {
                        var o = n.src,
                            r = t.st.iframe;
                        e.each(r.patterns,
                            function () {
                                return o.indexOf(this.index) > -1 ? (this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace("%id%", o), !1) : void 0
                            });
                        var a = {};
                        return r.srcAction && (a[r.srcAction] = o),
                            t._parseMarkup(i, a, n),
                            t.updateStatus("ready"),
                            i
                    }
                }
            });
            var V = function (e) {
                    var n = t.items.length;
                    return e > n - 1 ? e - n : 0 > e ? n + e : e
                },
                q = function (e, t, n) {
                    return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n)
                };
            e.magnificPopup.registerModule("gallery", {
                options: {
                    enabled: !1,
                    arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                    preload: [0, 2],
                    navigateByImgClick: !0,
                    arrows: !0,
                    tPrev: "Previous (Left arrow key)",
                    tNext: "Next (Right arrow key)",
                    tCounter: "%curr% of %total%"
                },
                proto: {
                    initGallery: function () {
                        var n = t.st.gallery,
                            o = ".mfp-gallery",
                            a = Boolean(e.fn.mfpFastClick);
                        return t.direction = !0,
                            n && n.enabled ? (r += " mfp-gallery", S(p + o,
                                function () {
                                    n.navigateByImgClick && t.wrap.on("click" + o, ".mfp-img",
                                        function () {
                                            return t.items.length > 1 ? (t.next(), !1) : void 0
                                        }),
                                        i.on("keydown" + o,
                                            function (e) {
                                                37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
                                            })
                                }), S("UpdateStatus" + o,
                                function (e, n) {
                                    n.text && (n.text = q(n.text, t.currItem.index, t.items.length))
                                }), S(d + o,
                                function (e, i, o, r) {
                                    var a = t.items.length;
                                    o.counter = a > 1 ? q(n.tCounter, r.index, a) : ""
                                }), S("BuildControls" + o,
                                function () {
                                    if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
                                        var i = n.arrowMarkup,
                                            o = t.arrowLeft = e(i.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(y),
                                            r = t.arrowRight = e(i.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(y),
                                            s = a ? "mfpFastClick" : "click";
                                        o[s](function () {
                                            t.prev()
                                        }),
                                            r[s](function () {
                                                t.next()
                                            }),
                                        t.isIE7 && (C("b", o[0], !1, !0), C("a", o[0], !1, !0), C("b", r[0], !1, !0), C("a", r[0], !1, !0)),
                                            t.container.append(o.add(r))
                                    }
                                }), S(f + o,
                                function () {
                                    t._preloadTimeout && clearTimeout(t._preloadTimeout),
                                        t._preloadTimeout = setTimeout(function () {
                                                t.preloadNearbyImages(),
                                                    t._preloadTimeout = null
                                            },
                                            16)
                                }), void S(s + o,
                                function () {
                                    i.off(o),
                                        t.wrap.off("click" + o),
                                    t.arrowLeft && a && t.arrowLeft.add(t.arrowRight).destroyMfpFastClick(),
                                        t.arrowRight = t.arrowLeft = null
                                })) : !1
                    },
                    next: function () {
                        t.direction = !0,
                            t.index = V(t.index + 1),
                            t.updateItemHTML()
                    },
                    prev: function () {
                        t.direction = !1,
                            t.index = V(t.index - 1),
                            t.updateItemHTML()
                    },
                    goTo: function (e) {
                        t.direction = e >= t.index,
                            t.index = e,
                            t.updateItemHTML()
                    },
                    preloadNearbyImages: function () {
                        var e, n = t.st.gallery.preload,
                            i = Math.min(n[0], t.items.length),
                            o = Math.min(n[1], t.items.length);
                        for (e = 1; e <= (t.direction ? o : i); e++) t._preloadItem(t.index + e);
                        for (e = 1; e <= (t.direction ? i : o); e++) t._preloadItem(t.index - e)
                    },
                    _preloadItem: function (n) {
                        if (n = V(n), !t.items[n].preloaded) {
                            var i = t.items[n];
                            i.parsed || (i = t.parseEl(n)),
                                T("LazyLoad", i),
                            "image" === i.type && (i.img = e('<img class="mfp-img" />').on("load.mfploader",
                                function () {
                                    i.hasSize = !0
                                }).on("error.mfploader",
                                function () {
                                    i.hasSize = !0,
                                        i.loadError = !0,
                                        T("LazyLoadError", i)
                                }).attr("src", i.src)),
                                i.preloaded = !0
                        }
                    }
                }
            });
            var Q = "retina";
            e.magnificPopup.registerModule(Q, {
                options: {
                    replaceSrc: function (e) {
                        return e.src.replace(/\.\w+$/,
                            function (e) {
                                return "@2x" + e
                            })
                    },
                    ratio: 1
                },
                proto: {
                    initRetina: function () {
                        if (window.devicePixelRatio > 1) {
                            var e = t.st.retina,
                                n = e.ratio;
                            n = isNaN(n) ? n() : n,
                            n > 1 && (S("ImageHasSize." + Q,
                                function (e, t) {
                                    t.img.css({
                                        "max-width": t.img[0].naturalWidth / n,
                                        width: "100%"
                                    })
                                }), S("ElementParse." + Q,
                                function (t, i) {
                                    i.src = e.replaceSrc(i, n)
                                }))
                        }
                    }
                }
            }),
                function () {
                    var t = 1e3,
                        n = "ontouchstart" in window,
                        i = function () {
                            x.off("touchmove" + r + " touchend" + r)
                        },
                        o = "mfpFastClick",
                        r = "." + o;
                    e.fn.mfpFastClick = function (o) {
                        return e(this).each(function () {
                            var a, s = e(this);
                            if (n) {
                                var l, c, u, d, p, f;
                                s.on("touchstart" + r,
                                    function (e) {
                                        d = !1,
                                            f = 1,
                                            p = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0],
                                            c = p.clientX,
                                            u = p.clientY,
                                            x.on("touchmove" + r,
                                                function (e) {
                                                    p = e.originalEvent ? e.originalEvent.touches : e.touches,
                                                        f = p.length,
                                                        p = p[0],
                                                    (Math.abs(p.clientX - c) > 10 || Math.abs(p.clientY - u) > 10) && (d = !0, i())
                                                }).on("touchend" + r,
                                                function (e) {
                                                    i(),
                                                    d || f > 1 || (a = !0, e.preventDefault(), clearTimeout(l), l = setTimeout(function () {
                                                            a = !1
                                                        },
                                                        t), o())
                                                })
                                    })
                            }
                            s.on("click" + r,
                                function () {
                                    a || o()
                                })
                        })
                    },
                        e.fn.destroyMfpFastClick = function () {
                            e(this).off("touchstart" + r + " click" + r),
                            n && x.off("touchmove" + r + " touchend" + r)
                        }
                }(),
                _()
        }),
    function () {
        "use strict";

        function e(t, i) {
            function o(e, t) {
                return function () {
                    return e.apply(t, arguments)
                }
            }

            var r;
            if (i = i || {},
                    this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = i.touchBoundary || 10, this.layer = t, this.tapDelay = i.tapDelay || 200, this.tapTimeout = i.tapTimeout || 700, !e.notNeeded(t)) {
                for (var a = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], s = this, l = 0, c = a.length; c > l; l++) s[a[l]] = o(s[a[l]], s);
                n && (t.addEventListener("mouseover", this.onMouse, !0), t.addEventListener("mousedown", this.onMouse, !0), t.addEventListener("mouseup", this.onMouse, !0)),
                    t.addEventListener("click", this.onClick, !0),
                    t.addEventListener("touchstart", this.onTouchStart, !1),
                    t.addEventListener("touchmove", this.onTouchMove, !1),
                    t.addEventListener("touchend", this.onTouchEnd, !1),
                    t.addEventListener("touchcancel", this.onTouchCancel, !1),
                Event.prototype.stopImmediatePropagation || (t.removeEventListener = function (e, n, i) {
                    var o = Node.prototype.removeEventListener;
                    "click" === e ? o.call(t, e, n.hijacked || n, i) : o.call(t, e, n, i)
                },
                    t.addEventListener = function (e, n, i) {
                        var o = Node.prototype.addEventListener;
                        "click" === e ? o.call(t, e, n.hijacked || (n.hijacked = function (e) {
                            e.propagationStopped || n(e)
                        }), i) : o.call(t, e, n, i)
                    }),
                "function" == typeof t.onclick && (r = t.onclick, t.addEventListener("click",
                    function (e) {
                        r(e)
                    },
                    !1), t.onclick = null)
            }
        }

        var t = navigator.userAgent.indexOf("Windows Phone") >= 0,
            n = navigator.userAgent.indexOf("Android") > 0 && !t,
            i = /iP(ad|hone|od)/.test(navigator.userAgent) && !t,
            o = i && /OS 4_\d(_\d)?/.test(navigator.userAgent),
            r = i && /OS [6-7]_\d/.test(navigator.userAgent),
            a = navigator.userAgent.indexOf("BB10") > 0;
        e.prototype.needsClick = function (e) {
            switch (e.nodeName.toLowerCase()) {
                case "button":
                case "select":
                case "textarea":
                    if (e.disabled) return !0;
                    break;
                case "input":
                    if (i && "file" === e.type || e.disabled) return !0;
                    break;
                case "label":
                case "iframe":
                case "video":
                    return !0
            }
            return /\bneedsclick\b/.test(e.className)
        },
            e.prototype.needsFocus = function (e) {
                switch (e.nodeName.toLowerCase()) {
                    case "textarea":
                        return !0;
                    case "select":
                        return !n;
                    case "input":
                        switch (e.type) {
                            case "button":
                            case "checkbox":
                            case "file":
                            case "image":
                            case "radio":
                            case "submit":
                                return !1
                        }
                        return !e.disabled && !e.readOnly;
                    default:
                        return /\bneedsfocus\b/.test(e.className)
                }
            },
            e.prototype.sendClick = function (e, t) {
                var n, i;
                document.activeElement && document.activeElement !== e && document.activeElement.blur(),
                    i = t.changedTouches[0],
                    n = document.createEvent("MouseEvents"),
                    n.initMouseEvent(this.determineEventType(e), !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null),
                    n.forwardedTouchEvent = !0,
                    e.dispatchEvent(n)
            },
            e.prototype.determineEventType = function (e) {
                return n && "select" === e.tagName.toLowerCase() ? "mousedown" : "click"
            },
            e.prototype.focus = function (e) {
                var t;
                i && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type && "month" !== e.type ? (t = e.value.length, e.setSelectionRange(t, t)) : e.focus()
            },
            e.prototype.updateScrollParent = function (e) {
                var t, n;
                if (t = e.fastClickScrollParent, !t || !t.contains(e)) {
                    n = e;
                    do {
                        if (n.scrollHeight > n.offsetHeight) {
                            t = n,
                                e.fastClickScrollParent = n;
                            break
                        }
                        n = n.parentElement
                    } while (n)
                }
                t && (t.fastClickLastScrollTop = t.scrollTop)
            },
            e.prototype.getTargetElementFromEventTarget = function (e) {
                return e.nodeType === Node.TEXT_NODE ? e.parentNode : e
            },
            e.prototype.onTouchStart = function (e) {
                var t, n, r;
                if (e.targetTouches.length > 1) return !0;
                if (t = this.getTargetElementFromEventTarget(e.target), n = e.targetTouches[0], i) {
                    if (r = window.getSelection(), r.rangeCount && !r.isCollapsed) return !0;
                    if (!o) {
                        if (n.identifier && n.identifier === this.lastTouchIdentifier) return e.preventDefault(),
                            !1;
                        this.lastTouchIdentifier = n.identifier,
                            this.updateScrollParent(t)
                    }
                }
                return this.trackingClick = !0,
                    this.trackingClickStart = e.timeStamp,
                    this.targetElement = t,
                    this.touchStartX = n.pageX,
                    this.touchStartY = n.pageY,
                e.timeStamp - this.lastClickTime < this.tapDelay && e.preventDefault(),
                    !0
            },
            e.prototype.touchHasMoved = function (e) {
                var t = e.changedTouches[0],
                    n = this.touchBoundary;
                return Math.abs(t.pageX - this.touchStartX) > n || Math.abs(t.pageY - this.touchStartY) > n ? !0 : !1
            },
            e.prototype.onTouchMove = function (e) {
                return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
            },
            e.prototype.findControl = function (e) {
                return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
            },
            e.prototype.onTouchEnd = function (e) {
                var t, a, s, l, c, u = this.targetElement;
                if (!this.trackingClick) return !0;
                if (e.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0,
                    !0;
                if (e.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
                if (this.cancelNextClick = !1, this.lastClickTime = e.timeStamp, a = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, r && (c = e.changedTouches[0], u = document.elementFromPoint(c.pageX - window.pageXOffset, c.pageY - window.pageYOffset) || u, u.fastClickScrollParent = this.targetElement.fastClickScrollParent), s = u.tagName.toLowerCase(), "label" === s) {
                    if (t = this.findControl(u)) {
                        if (this.focus(u), n) return !1;
                        u = t
                    }
                } else if (this.needsFocus(u)) return e.timeStamp - a > 100 || i && window.top !== window && "input" === s ? (this.targetElement = null, !1) : (this.focus(u), this.sendClick(u, e), i && "select" === s || (this.targetElement = null, e.preventDefault()), !1);
                return i && !o && (l = u.fastClickScrollParent, l && l.fastClickLastScrollTop !== l.scrollTop) ? !0 : (this.needsClick(u) || (e.preventDefault(), this.sendClick(u, e)), !1)
            },
            e.prototype.onTouchCancel = function () {
                this.trackingClick = !1,
                    this.targetElement = null
            },
            e.prototype.onMouse = function (e) {
                return this.targetElement ? e.forwardedTouchEvent ? !0 : e.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), !1) : !0 : !0
            },
            e.prototype.onClick = function (e) {
                var t;
                return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === e.target.type && 0 === e.detail ? !0 : (t = this.onMouse(e), t || (this.targetElement = null), t)
            },
            e.prototype.destroy = function () {
                var e = this.layer;
                n && (e.removeEventListener("mouseover", this.onMouse, !0), e.removeEventListener("mousedown", this.onMouse, !0), e.removeEventListener("mouseup", this.onMouse, !0)),
                    e.removeEventListener("click", this.onClick, !0),
                    e.removeEventListener("touchstart", this.onTouchStart, !1),
                    e.removeEventListener("touchmove", this.onTouchMove, !1),
                    e.removeEventListener("touchend", this.onTouchEnd, !1),
                    e.removeEventListener("touchcancel", this.onTouchCancel, !1)
            },
            e.notNeeded = function (e) {
                var t, i, o, r;
                if ("undefined" == typeof window.ontouchstart) return !0;
                if (i = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
                    if (!n) return !0;
                    if (t = document.querySelector("meta[name=viewport]")) {
                        if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
                        if (i > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
                    }
                }
                if (a && (o = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), o[1] >= 10 && o[2] >= 3 && (t = document.querySelector("meta[name=viewport]")))) {
                    if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
                    if (document.documentElement.scrollWidth <= window.outerWidth) return !0
                }
                return "none" === e.style.msTouchAction || "manipulation" === e.style.touchAction ? !0 : (r = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], r >= 27 && (t = document.querySelector("meta[name=viewport]"), t && (-1 !== t.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === e.style.touchAction || "manipulation" === e.style.touchAction ? !0 : !1)
            },
            e.attach = function (t, n) {
                return new e(t, n)
            },
            "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function () {
                return e
            }) : "undefined" != typeof module && module.exports ? (module.exports = e.attach, module.exports.FastClick = e) : window.FastClick = e
    }(),
    $(function () {
        $(window).load(function () {
            window.loaded = !0
        }),
            $(document).on("click", ".dynamic-modal-content",
                function (e) {
                    var t = $(this),
                        n = t.attr("href");
                    openModal(n, !0, t.hasClass("remember-current-state")),
                        e.preventDefault()
                }),
            History.Adapter.bind(window, "statechange",
                function () {
                    if (1 == $.skip_statechange_action) return $.skip_statechange_action = 0,
                        !0;
                    var e = History.getState();
                    return "dynamic-modal-content" == e.data.type ? (openModal(e.url, 0, e.remember_state), !0) : e.data.home || "/" == e.hash ? (closeModal(), !0) : void 0
                }),
            $(document).keyup(function (e) {
                27 == e.keyCode && closeModal()
            }),
            $("#main-menu .menu-item").hover(function (e) {
                    e.stopPropagation(),
                        $(this).addClass("hover")
                },
                function () {
                    $(this).removeClass("hover")
                }),
            $(window).resize(function () {
                    $("#content-modal").scroll()
            }).resize()
    }),


    Particle.GLOBAL_DRAW_COLOR = [0, 0, 0, 255],
    Particle.prototype.submitToFields = function (e) {
        for (var t = 0,
                 n = 0,
                 i = 0; i < e.length; i++) {
            var o = e[i],
                r = o.position.x - this.position.x,
                a = o.position.y - this.position.y,
                s = o.mass / Math.pow(r * r + o.mass / 2 + a * a + o.mass / 2, 1.5);
            t += r * s,
                n += a * s
        }
        this.acceleration = new Vector(t, n)
    },
    Particle.prototype.move = function () {
        this.velocity.x += this.acceleration.x / 1.5,
            this.velocity.y += this.acceleration.y / 1.5,
            this.position.x += this.velocity.x / 1.5,
            this.position.y += this.velocity.y / 1.5
    },
    Particle.prototype.drawVariable = function (e, t) {
        var n = 4 * (~~this.position.y * t + ~~this.position.x),
            i = this.velocity.getMagnitude(),
            o = Particle.GLOBAL_DRAW_COLOR[0] * i,
            r = Particle.GLOBAL_DRAW_COLOR[1],
            a = .5 * Particle.GLOBAL_DRAW_COLOR[2] / i,
            s = Particle.GLOBAL_DRAW_COLOR[3];
        e[n] += o,
            e[n + 1] += r,
            e[n + 2] += a,
            e[n + 3] = s
    },
    Particle.prototype.drawBasic = function (e) {
        var t = e.context;
        t.fillStyle = this.fillStyle,
            t.beginPath(),
            t.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, !1),
            t.fill(),
        this.stroke_radius && this.drawHole(e)
    },
    Particle.prototype.drawHole = function (e) {
        var t = e.context;
        t.fillStyle = this.holeFillStyle,
            t.beginPath(),
            t.arc(this.position.x, this.position.y, this.stroke_radius, 0, 2 * Math.PI, !1),
            t.fill()
    },
    Particle.prototype.drawSoft = function (e, t) {
        var n = 4 * (~~this.position.y * t + ~~this.position.x),
            i = Particle.GLOBAL_DRAW_COLOR[0],
            o = Particle.GLOBAL_DRAW_COLOR[1],
            r = Particle.GLOBAL_DRAW_COLOR[2],
            a = Particle.GLOBAL_DRAW_COLOR[3];
        e[n - 4] += .8 * i,
            e[n - 3] += .8 * o,
            e[n - 2] += .8 * r,
            e[n - 1] = a,
            e[n] += .8 * i,
            e[n + 1] += .8 * o,
            e[n + 2] += .8 * r,
            e[n + 3] = a,
            e[n + 4] += .8 * i,
            e[n + 5] += .8 * o,
            e[n + 6] += .8 * r,
            e[n + 7] = a,
            n += 4 * t,
            e[n - 4] += .8 * i,
            e[n - 3] += .8 * o,
            e[n - 2] += .8 * r,
            e[n - 1] = a,
            e[n] += i,
            e[n + 1] += o,
            e[n + 2] += r,
            e[n + 3] = a,
            e[n + 4] += .8 * i,
            e[n + 5] += .8 * o,
            e[n + 6] += .8 * r,
            e[n + 7] = a,
            n += 4 * t,
            e[n - 4] += .8 * i,
            e[n - 3] += .8 * o,
            e[n - 2] += .8 * r,
            e[n - 1] = a,
            e[n] += .8 * i,
            e[n + 1] += .8 * o,
            e[n + 2] += .8 * r,
            e[n + 3] = a,
            e[n + 4] += .8 * i,
            e[n + 5] += .8 * o,
            e[n + 6] += .8 * r,
            e[n + 7] = a
    },
    Particle.prototype.draw = Particle.prototype.drawBasic,
    Particle.prototype.setAsMenuAnchorType = function () {
        var e = this;
        e.isFixed = 1,
            e.fillStyle = "#227eef",
            e.connects = 1,
            e.radius = 5,
            e.stroke_radius = 3,
            e.holeFillStyle = "#e8e8e8",
            e.anchor_particle = 1
    },
    Particle.prototype.setAsButtonEdgeType = function () {
        var e = this;
        e.isFixed = 1,
            e.fillStyle = "#227eef",
            e.connects = 1,
            e.radius = 2,
            e.menu_particle = 1
    },
    ParticleEmitter.drawColor = "#999",
    ParticleEmitter.drawColor2 = "#000",
    ParticleEmitter.jitter = .05,
    ParticleEmitter.fromString = function (e) {
        var t = e.substr(1).split(":"),
            n = new ParticleEmitter;
        return n.position = Point.fromString(t.shift()),
            n.velocity = Vector.fromString(t.shift()),
            n.size = parseInt(t.shift()),
            n.particleLife = parseInt(t.shift()),
            n.spread = parseFloat(t.shift()),
            n.emissionRate = parseInt(t.shift().valueOf()),
            n
    },
    Field.drawColor = "rgb(0,0,255)",
    Field.drawColor2 = "rgb(0,0,0)",
    Field.prototype.setMass = function (e) {
        return this.mass = e,
            this.drawColor = 0 > e ? "#900" : "#090",
            this
    },
    Field.prototype.moveTo = function (e) {
        this.position = e
    },
    Field.prototype.toString = function () {
        var e = [this.position.toString(), this.mass];
        return "F" + e.join(":")
    },
    Field.fromString = function (e) {
        var t = e.substr(1).split(":"),
            n = new Field(Point.fromString(t.shift()), parseInt(t.shift()));
        return n
    },
    Vector.prototype.getMagnitude = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    },
    Vector.prototype.multiply = function (e) {
        this.x *= e,
            this.y *= e
    },
    Vector.prototype.add = function (e) {
        this.x += e.x,
            this.y += e.y
    },
    Vector.prototype.vectorTo = function (e) {
        return new Vector(e.x - this.x, e.y - this.y)
    },
    Vector.prototype.withinBounds = function (e, t) {
        return this.x >= e.x - t / 2 && this.x <= e.x + t / 2 && this.y >= e.y - t / 2 && this.y <= e.y + t / 2
    },
    Vector.prototype.getAngle = function () {
        var e = 0,
            t = 0;
        this.x > 0 ? this.y > 0 ? (t = 0, e = this.y / this.x) : (t = 3 * Math.PI / 2, e = this.x / this.y) : this.y > 0 ? (t = Math.PI / 2, e = this.x / this.y) : (t = Math.PI, e = this.y / this.x);
        var n = Math.atan(Math.abs(e)) + t;
        return n
    },
    Vector.prototype.getAngleDegrees = function () {
        return 180 * this.getAngle() / Math.PI
    },
    Vector.prototype.jitter = function (e) {
        return new Vector(this.x + this.x * e * Math.random(), this.y + this.y * e * Math.random())
    },
    Vector.prototype.copy = function () {
        return new Vector(this.x, this.y)
    },
    Vector.prototype.toString = function () {
        return this.x.toFixed(3).replace(/\.?0+$/, "") + "," + this.y.toFixed(3).replace(/\.?0+$/, "")
    },
    Vector.fromAngle = function (e, t) {
        return new Vector(t * Math.cos(e), t * Math.sin(e))
    },
    Vector.fromString = function (e) {
        var t = e.split(",");
        return new Vector(parseFloat(t[0]), parseFloat(t[1]))
    },
    Point = Vector;
var display = null,
    particleSystem = null,
    context = document.getElementById("display").getContext("2d"),
    devicePixelRatio = window.devicePixelRatio || 1,
    backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1,
    scale_ratio = devicePixelRatio / backingStoreRatio;
$(function () {
    var e = document.getElementById("display");
    $(e).attr("width", $(window).width() * scale_ratio),
        $(e).attr("height", $(window).height() * scale_ratio),
        $(e).css("width", $(window).width()),
        $(e).css("height", $(window).height()),
        display = new Display(document.getElementById("display")),
        display.scale = scale_ratio,
        display.init(),
        particleSystem = (new ParticleSystem).init(display),
        display.start(),
        addEmittersAndFields(particleSystem);
    var t = null;
    $(window).resize(function () {
        clearTimeout(t),
            t = setTimeout(function () {
                    particleSystem.emitters = [],
                        particleSystem.fields = [];
                    var e = document.getElementById("display");
                    $(e).attr("width", $(window).width() * scale_ratio),
                        $(e).attr("height", $(window).height() * scale_ratio),
                        $(e).css("width", $(window).width()),
                        $(e).css("height", $(window).height()),
                        particleSystem.display.context.scale(scale_ratio, scale_ratio),
                        particleSystem.display.scale = scale_ratio,
                        particleSystem.display.calculate_scale(),
                        addEmittersAndFields(particleSystem)
                },
                300)
    })
});
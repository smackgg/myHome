/*
*   页面翻转
*   功能：页面翻动，页面内部class为container的容器进行180度翻转
*   将所有页面class设置page
*/
(function($){
    window.onload = function(){
        new myHomeMain();
        //进度条
        // $('.onload').css('display','none');
        
    }
    // 主函数
    var myHomeMain = function(){
        this.init();
    }
    myHomeMain.prototype = {
        // 参数配置
        data:{
            // 页面计数器
            count: 1,
            // 所有页面
            $pageEle: $('.page'),
            // 显示
            introduce: '我是许岩，现就读于哈尔滨理工大学测通学院物联网工程专业，爱前端，爱游戏，爱运动。性格开朗、稳重、有活力，待人热情、真诚，能吃苦耐劳，有较强的实际动手能力和团体协作精神。',
            mobileTo:''
        },
        
        // 页面滚动函数
        init: function() {
            var event,
                _this = this,
                pageLen = _this.data.$pageEle.length,
                ele = document.getElementsByTagName('body')[0];
            _this.addEvent(ele, 'mousewheel', handler);
            function handler(e){
                event = e||window.event;
                if(event.wheelDelta < 0){
                    _this.toLeft(ele, pageLen, handler);
                }else{      
                    _this.toRight(ele, handler);            
                }
                return false;   
            }
            _this.introduce();
            _this.ctrlTo();
            _this.mobile();
            _this.bottomCtrl();
            _this.skillPre();
        },

        // 鼠标滚轮下滑 fn 回调函数
        toLeft: function(ele, pageLen, handler, fn) {
            var _this = this;
            if(_this.browser().mobile === true && $(window).width()<767){
                $('body').unbind('touchmove');
                var timerMobile = setTimeout(function(){
                    _this.mobile();
                },800);
            }
            _this.removeEvent(ele, 'mousewheel',handler);
            // 延迟事件
            var timer = setTimeout(function(){
                _this.addEvent(ele, 'mousewheel',handler);
            },1000);
            if(_this.data.count < pageLen){
                console.log(_this.data.count);
                $('.page' + _this.data.count).css({
                    'left': '-100%'
                });
                $('.page' + _this.data.count + '>.container').removeClass('rotateL rotateR');
                _this.data.count++;
                $('.page' + _this.data.count).css({
                    'left': '0'
                });
                $('.page' + _this.data.count + '>.container').addClass('rotateL');
            }else if(_this.data.count == pageLen){
                $('.page:not(".page1,.page' + pageLen + '")').css({
                    'left': '100%',
                    'display':'none'
                });
                $('.page' + pageLen).css('left', '100%');
                $('.page' + _this.data.count + '>.container').removeClass('rotateL rotateR');
                $('.page1').css({
                    'left':'0px'
                });
                $('.page1>.container').addClass('rotateR');
                _this.data.count = 1;
                setTimeout(function(){
                    $('.page:not(".page1,.page' + pageLen + '")').css({
                        'display':'block'
                    });
                }, 800);
            }
            _this.bottomCtrl();
            this.skill(this.data.count);
        },
        // 鼠标滚轮上滑
        toRight: function (ele, handler) {
            var _this = this;
            if(_this.browser().mobile === true && $(window).width()<767){
                $('body').unbind('touchmove');
                var timerMobile = setTimeout(function(){
                    _this.mobile();
                },800);
            }
            _this.removeEvent(ele, 'mousewheel', handler);
            var timer = setTimeout(function(){
                _this.addEvent(ele, 'mousewheel', handler);
            },1000);
            if(_this.data.count > 1){
                console.log(_this.data.count);
                $('.page' + _this.data.count).css({
                    'left': '100%'
                });
                $('.page' + _this.data.count + '>.container').removeClass('rotateL rotateR');
                _this.data.count--;
                $('.page' + _this.data.count).css({
                    'left': '0'
                });
                $('.page' + _this.data.count + '>.container').addClass('rotateR');
            }
            _this.bottomCtrl();
            this.skill(this.data.count);
        },
        // 事件绑定
        addEvent:function (ele,type,fn) {
            if (ele.addEventListener) {
                ele.addEventListener(type,fn,false);
            }else{
                // console.log(111);
                ele.attachEvent('on'+type,function(){
                    // 用来修改代码执行的作用域
                    fn.call(ele);
                });
            }
        },
        // 事件解绑
        removeEvent:function (ele,type,fn) {
            if (ele.removeEventListener) {
                ele.removeEventListener(type,fn,false);
            }else{
                ele.detachEvent('on'+type,fn);
            }
        },
        // 取消冒泡
        cancelBubble: function (e) {
            var event = e || window.event;
            if (event.stopPropagation) {
                event.stopPropagation();
            }else{
                event.cancelBubble = true;
            }
        },
        // 自我介绍
        introduce : function(){
            
            var _this = this,
                str = _this.data.introduce,
                arr = str.split('');            
                ele = document.getElementsByClassName('introduce')[0];
                // 移动端样式
                if(_this.browser().mobile === true && $(window).width()<767){
                    // console.log(_this.browser().mobile);
                        $('.introduce').css({
                            'width': '70%',
                            'font-size': '1.1em',
                            'line-height': '1.6em',
                            'padding': '20px'
                    });
                }
            var timerInt = setInterval(function(){
                if(arr.length > 0){
                    ele.innerHTML += arr.shift();
                }else {
                    clearInterval(timerInt);
                }
            },100);
        },
        // 第二页掌握技能
        skill: function(count){
            if(this.browser().mobile === true && $(window).width()<767){
                if(count==2){   
                    setTimeout(function(){
                        $('#skill1,#skill2').css('width','250px');
                        $('#skill3').css('width','200px');
                        $('#skill4').css('width','180px');
                        $('#skill5').css('width','160px');
                        $('#skill6').css('width','80px');
                    },1000);
                }else{
                    $('#skill>li').css('width','0px');
                }   
            }else{
                if(count==2){   
                    setTimeout(function(){
                        $('#skill1,#skill2').css('width','600px');
                        $('#skill3').css('width','550px');
                        $('#skill4').css('width','400px');
                        $('#skill5').css('width','350px');
                        $('#skill6').css('width','300px');
                    },1000);
                }else{
                    $('#skill>li').css('width','0px');
                }   
            }   
        },
        skillPre:function(){
            $('#skill>li').mouseenter(function(e){
                var list = e.currentTarget.children;
                $(list).css('display','block');
            }).mouseleave(function(e){
                var list = e.currentTarget.children;
                $(list).css('display','none');
            });
            if(this.browser().mobile === true && $(window).width()<767){
                $('#skill>li').css({
                    'height': '20px',
                    'font-size': '10px',
                    'line-height': '20px'
                });
                $('#skill').css('left','0px');
                $('#skill>li>.list>li').css({
                    'line-height':'20px',
                });
            }
        },
        // 左侧控制圆点
        bottomCtrl: function(){
            count = this.data.count;
            $('.bottomCtrl>ul>li[index='+ count + ']').css({
                'background-color':'#000',
                'border':'3px solid #fff'
                // 'border':'2px solid #fff'
            });
            $('.bottomCtrl>ul>li:not([index='+ count + '])').css({
                'background-color':'#fff',
                'border':'none'
            });
            this.skill(this.data.count);
        },
        // 左侧小圆点以及导航的事件绑定
        ctrlTo: function(){
            var _this = this;
            $('.bottomCtrl>ul>li').click(function(e){
                // console.log(e);
                // console.log($(this).attr('index'));
                _this.toPage($(this).attr('index'));
            });
            $('.droptoLeft-menu>li>a').click(function(e){
                _this.toPage($(this).attr('index'));
            });
        },
        // 直接跳转到某页
        toPage: function(toPage){
            var _this = this;
            $('.page .container').removeClass('rotateL rotateR');
            $('.page' + toPage + ' .container').addClass('rotateR');
            for (var i = 1; i <=  _this.data.$pageEle.length; i++) {
                if(i!=toPage && i!=_this.data.count){
                    $('.page' + i).css({
                        'display':'none'
                    });
                }
                if(i<toPage){
                    $('.page' + i).css({
                        'left': '-100%',
                    });
                }else if(i>toPage){
                    $('.page' + i).css({
                        'left': '100%',
                    });
                }else{
                    $('.page' + i).css({
                        'left': '0'
                    })
                }
            };
            _this.data.count = toPage;
            _this.bottomCtrl();
            setTimeout(function(){
                $('.page:not(.page' + toPage).css({
                    'display':'block'
                });
            }, 300);
        },
        // 移动端处理
        mobile: function(){
            var _this = this,
                startX,
                startY,
                moveEndX,
                moveEndY,
                X,
                Y,
                ele = document.getElementsByTagName('body')[0];
            $("body").on("touchstart", function(e) {
                // e.preventDefault();
                startX = e.originalEvent.changedTouches[0].pageX;
                startY = e.originalEvent.changedTouches[0].pageY;
            });
            $("body").bind("touchmove", function(e) {
                e.preventDefault();
                moveEndX = e.originalEvent.changedTouches[0].pageX;
                moveEndY = e.originalEvent.changedTouches[0].pageY;
                X = moveEndX - startX;
                Y = moveEndY - startY;
                if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {
                    // right
                    _this.data.mobileTo = 'right';
                    _this.toRight(ele);
                }
                else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
                    // left
                    _this.data.mobileTo = 'left';
                    _this.toLeft(ele, _this.data.$pageEle.length);
                }
                else if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
                    // bottom
                    console.log('bottom');
                    _this.data.mobileTo = 'bottom';
                }
                else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
                    // top
                    console.log('top');
                    _this.data.mobileTo = 'top';     
                }
                else{
                    // just touch
                    _this.data.mobileTo = 'touch';
                }
            });
        },
        browser: function(){
            var u = window.navigator.userAgent;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者安卓QQ浏览器
                iPad: u.indexOf('iPad') > -1, //是否为iPad
                webApp: u.indexOf('Safari') == -1 ,//是否为web应用程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') == -1 //是否为微信浏览器
            }
        }
    }
}(jQuery));


//音乐控制
console.log(1);
$('#audio_btn').click(function(){
    console.log(1);
    var $this=$(this);
    if($this.hasClass('play_yinfu')){
        $this.removeClass('play_yinfu').addClass('off');
        $('#yinfu').removeClass('rotate');  
        $('#media')[0].pause();
    }else{
        $this.removeClass('off').addClass('play_yinfu');
        $('#yinfu').addClass('rotate'); 
        $('#media')[0].play();
    }
})

// page1
$()

$('.about>ul>.wrapper').mouseenter(function(e){
    console.log(e.currentTarget.classList[0]);
    console.log(e.currentTarget.classList[0]+'>.aboutMe');
    $('.'+e.currentTarget.classList[0]+'>.aboutMe').css({
        // 'display':'block',
        'opacity':'1'
    });
}).mouseleave(function(){
    $('.aboutMe').css({
        // 'display':'none',
        'opacity':'0'
    });
});
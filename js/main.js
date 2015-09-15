/*
*   页面翻转
*   功能：页面翻动，页面内部class为container的容器进行180度翻转
*   将所有页面class设置page
*/
(function($){
    window.onload = function(){
        new myHomeMain();
        
        $('.video_exist').append('<audio preload="metadata" autoplay="" id="media" src="http://7xl432.com1.z0.glb.clouddn.com/南山南.mp3" loop=""></audio>');
        
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
$('#audio_btn').click(function(){
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

// page1 个人信息
$('.about>ul>.wrapper').mouseenter(function(e){
    console.log(e.currentTarget.classList[0]);
    console.log(e.currentTarget.classList[0]+'>.aboutMe');
    $('.'+e.currentTarget.classList[0]+'>.aboutMe').css({
        'display':'block'
        // 'opacity':'1'
    });
}).mouseleave(function(){
    $('.aboutMe').css({
        'display':'none'
    });
});
// 个人简历
$('.dropdown-menu>li>a[index=1]').click(function(){
     var $resume = $("<div class='resume'><div class='img'><img src='http://7xl432.com1.z0.glb.clouddn.com/resume.jpg'><div class='closeResume'>X</div></div></div>");
     $('#pageHome').append($resume);
     $('.closeResume').click(function(){
        console.log('cl');
        $('.resume').css({
            'display':'none'
        });
    });
});




// 雪花
$(function(){
    var container = document.querySelector(".snow-container");
    if (/MSIE 6|MSIE 7|MSIE 8/.test(navigator.userAgent)) {
        return;
    } else {
        if (/MSIE 9|MSIE 10/.test(navigator.userAgent)) {
            $(container).css("height", $(window).height()).bind("click", function() {
                $(this).remove();
            });
        }
    }
    var containerWidth = $(container).width();
    var containerHeight = $(container).height();
    var particle;
    var camera;
    var scene;
    var renderer;
    var mouseX = 0;
    var mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var particles = [];
    var particleImage = new Image();
    particleImage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAKQWlDQ1BJQ0MgUHJvZmlsZQAAeAGdlndUU9kWh8+9N73QEiIgJfQaegkg0jtIFQRRiUmAUAKGhCZ2RAVGFBEpVmRUwAFHhyJjRRQLg4Ji1wnyEFDGwVFEReXdjGsJ7601896a/cdZ39nnt9fZZ+9917oAUPyCBMJ0WAGANKFYFO7rwVwSE8vE9wIYEAEOWAHA4WZmBEf4RALU/L09mZmoSMaz9u4ugGS72yy/UCZz1v9/kSI3QyQGAApF1TY8fiYX5QKUU7PFGTL/BMr0lSkyhjEyFqEJoqwi48SvbPan5iu7yZiXJuShGlnOGbw0noy7UN6aJeGjjAShXJgl4GejfAdlvVRJmgDl9yjT0/icTAAwFJlfzOcmoWyJMkUUGe6J8gIACJTEObxyDov5OWieAHimZ+SKBIlJYqYR15hp5ejIZvrxs1P5YjErlMNN4Yh4TM/0tAyOMBeAr2+WRQElWW2ZaJHtrRzt7VnW5mj5v9nfHn5T/T3IevtV8Sbsz55BjJ5Z32zsrC+9FgD2JFqbHbO+lVUAtG0GQOXhrE/vIADyBQC03pzzHoZsXpLE4gwnC4vs7GxzAZ9rLivoN/ufgm/Kv4Y595nL7vtWO6YXP4EjSRUzZUXlpqemS0TMzAwOl89k/fcQ/+PAOWnNycMsnJ/AF/GF6FVR6JQJhIlou4U8gViQLmQKhH/V4X8YNicHGX6daxRodV8AfYU5ULhJB8hvPQBDIwMkbj96An3rWxAxCsi+vGitka9zjzJ6/uf6Hwtcim7hTEEiU+b2DI9kciWiLBmj34RswQISkAd0oAo0gS4wAixgDRyAM3AD3iAAhIBIEAOWAy5IAmlABLJBPtgACkEx2AF2g2pwANSBetAEToI2cAZcBFfADXALDIBHQAqGwUswAd6BaQiC8BAVokGqkBakD5lC1hAbWgh5Q0FQOBQDxUOJkBCSQPnQJqgYKoOqoUNQPfQjdBq6CF2D+qAH0CA0Bv0BfYQRmALTYQ3YALaA2bA7HAhHwsvgRHgVnAcXwNvhSrgWPg63whfhG/AALIVfwpMIQMgIA9FGWAgb8URCkFgkAREha5EipAKpRZqQDqQbuY1IkXHkAwaHoWGYGBbGGeOHWYzhYlZh1mJKMNWYY5hWTBfmNmYQM4H5gqVi1bGmWCesP3YJNhGbjS3EVmCPYFuwl7ED2GHsOxwOx8AZ4hxwfrgYXDJuNa4Etw/XjLuA68MN4SbxeLwq3hTvgg/Bc/BifCG+Cn8cfx7fjx/GvyeQCVoEa4IPIZYgJGwkVBAaCOcI/YQRwjRRgahPdCKGEHnEXGIpsY7YQbxJHCZOkxRJhiQXUiQpmbSBVElqIl0mPSa9IZPJOmRHchhZQF5PriSfIF8lD5I/UJQoJhRPShxFQtlOOUq5QHlAeUOlUg2obtRYqpi6nVpPvUR9Sn0vR5Mzl/OX48mtk6uRa5Xrl3slT5TXl3eXXy6fJ18hf0r+pvy4AlHBQMFTgaOwVqFG4bTCPYVJRZqilWKIYppiiWKD4jXFUSW8koGStxJPqUDpsNIlpSEaQtOledK4tE20Otpl2jAdRzek+9OT6cX0H+i99AllJWVb5SjlHOUa5bPKUgbCMGD4M1IZpYyTjLuMj/M05rnP48/bNq9pXv+8KZX5Km4qfJUilWaVAZWPqkxVb9UU1Z2qbapP1DBqJmphatlq+9Uuq43Pp893ns+dXzT/5PyH6rC6iXq4+mr1w+o96pMamhq+GhkaVRqXNMY1GZpumsma5ZrnNMe0aFoLtQRa5VrntV4wlZnuzFRmJbOLOaGtru2nLdE+pN2rPa1jqLNYZ6NOs84TXZIuWzdBt1y3U3dCT0svWC9fr1HvoT5Rn62fpL9Hv1t/ysDQINpgi0GbwaihiqG/YZ5ho+FjI6qRq9Eqo1qjO8Y4Y7ZxivE+41smsImdSZJJjclNU9jU3lRgus+0zwxr5mgmNKs1u8eisNxZWaxG1qA5wzzIfKN5m/krCz2LWIudFt0WXyztLFMt6ywfWSlZBVhttOqw+sPaxJprXWN9x4Zq42Ozzqbd5rWtqS3fdr/tfTuaXbDdFrtOu8/2DvYi+yb7MQc9h3iHvQ732HR2KLuEfdUR6+jhuM7xjOMHJ3snsdNJp9+dWc4pzg3OowsMF/AX1C0YctFx4bgccpEuZC6MX3hwodRV25XjWuv6zE3Xjed2xG3E3dg92f24+ysPSw+RR4vHlKeT5xrPC16Il69XkVevt5L3Yu9q76c+Oj6JPo0+E752vqt9L/hh/QL9dvrd89fw5/rX+08EOASsCegKpARGBFYHPgsyCRIFdQTDwQHBu4IfL9JfJFzUFgJC/EN2hTwJNQxdFfpzGC4sNKwm7Hm4VXh+eHcELWJFREPEu0iPyNLIR4uNFksWd0bJR8VF1UdNRXtFl0VLl1gsWbPkRoxajCCmPRYfGxV7JHZyqffS3UuH4+ziCuPuLjNclrPs2nK15anLz66QX8FZcSoeGx8d3xD/iRPCqeVMrvRfuXflBNeTu4f7kufGK+eN8V34ZfyRBJeEsoTRRJfEXYljSa5JFUnjAk9BteB1sl/ygeSplJCUoykzqdGpzWmEtPi000IlYYqwK10zPSe9L8M0ozBDuspp1e5VE6JA0ZFMKHNZZruYjv5M9UiMJJslg1kLs2qy3mdHZZ/KUcwR5vTkmuRuyx3J88n7fjVmNXd1Z752/ob8wTXuaw6thdauXNu5Tnddwbrh9b7rj20gbUjZ8MtGy41lG99uit7UUaBRsL5gaLPv5sZCuUJR4b0tzlsObMVsFWzt3WazrWrblyJe0fViy+KK4k8l3JLr31l9V/ndzPaE7b2l9qX7d+B2CHfc3em681iZYlle2dCu4F2t5czyovK3u1fsvlZhW3FgD2mPZI+0MqiyvUqvakfVp+qk6oEaj5rmvep7t+2d2sfb17/fbX/TAY0DxQc+HhQcvH/I91BrrUFtxWHc4azDz+ui6rq/Z39ff0TtSPGRz0eFR6XHwo911TvU1zeoN5Q2wo2SxrHjccdv/eD1Q3sTq+lQM6O5+AQ4ITnx4sf4H++eDDzZeYp9qukn/Z/2ttBailqh1tzWibakNml7THvf6YDTnR3OHS0/m/989Iz2mZqzymdLz5HOFZybOZ93fvJCxoXxi4kXhzpXdD66tOTSna6wrt7LgZevXvG5cqnbvfv8VZerZ645XTt9nX297Yb9jdYeu56WX+x+aem172296XCz/ZbjrY6+BX3n+l37L972un3ljv+dGwOLBvruLr57/17cPel93v3RB6kPXj/Mejj9aP1j7OOiJwpPKp6qP6391fjXZqm99Oyg12DPs4hnj4a4Qy//lfmvT8MFz6nPK0a0RupHrUfPjPmM3Xqx9MXwy4yX0+OFvyn+tveV0auffnf7vWdiycTwa9HrmT9K3qi+OfrW9m3nZOjk03dp76anit6rvj/2gf2h+2P0x5Hp7E/4T5WfjT93fAn88ngmbWbm3/eE8/ul8iYiAAAACXBIWXMAAAsTAAALEwEAmpwYAAACMElEQVQ4Ea3VWWsVQRQE4LlGTRRxCSKaB///P1NEXKK4x5v6OlNDj+ibByqn1+rq6jM3h+PxuPwlDhkDMbdvRpbFpm6c251fbm+tm0bJbqWrLZ+s7c6V6CrjvwN9WfSwHXGVIQOH3lkzchAI4Vfwc8327sireCYt4WkW3wvOgrvBTPwj/W/B1+B70AM28hJnblOJ5H7wIHi4Zn3jAumX4HNwuWZ94RZuM65Lba/v6kgeBefB0+BJ4AA3EBQifB8Y603q9cgU1wZtCylF+mLFs+THAUsECz4EbwJCRD2X2XGoFRRbxFPqKEX8cs1UmxN8pbYH8dctYPO6il1H22KKEVH6PLhY+zOxtitT/yn4uGZe47oqMTsM9OGodn2WOASqsJlylljbx8UxrK0VJS45rxFQJkMfL83dnPGWY4lHNVj436OK+eVFQZ16iH4AMjTaZ4W2tfZ0P67xYBolbvGrU/69C/poza0Kc9ZY69FKPvgoLqmvhgJflHJSp7zlP7I/iV9nzBpr7bG3X96xVihqNYiAAg/S4rdhrlt9SpG+Ct4G9tiLY/xeVDHVTuOX072usFCdKqlWhTWIHIaUJfYYx7GzYnyGGUTEL+ExLFb8rdM0//kjVLW4NitsMOBEMd+A4tapuVYOS1zf4UjtHTYkL4fpX9P4YjLWXzo28VlmTe1pWSGaCYfSjBG1Ix59fxLIHST3a9IXw8NkB5SsSgepRbNi/UbV68/tzpdcf253frkGpTvXMd60XhcAAAAASUVORK5CYII=";
    var snowNum = 500;
    function init() {
        console.log(1111);
        camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 1, 1e4);
        camera.position.z = 1e3;
        scene = new THREE.Scene();
        scene.add(camera);
        renderer = new THREE.CanvasRenderer();
        renderer.setSize(containerWidth, containerHeight);
        var material = new THREE.ParticleBasicMaterial({
            map:new THREE.Texture(particleImage)
        });
        for (var i = 0; i < snowNum; i++) {
            particle = new Particle3D(material);
            particle.position.x = Math.random() * 2e3 - 1e3;
            particle.position.y = Math.random() * 2e3 - 1e3;
            particle.position.z = Math.random() * 2e3 - 1e3;
            particle.scale.x = particle.scale.y = 1;
            scene.add(particle);
            particles.push(particle);
        }
        container.appendChild(renderer.domElement);
        document.addEventListener("mousemove", onDocumentMouseMove, false);
        document.addEventListener("touchstart", onDocumentTouchStart, false);
        document.addEventListener("touchmove", onDocumentTouchMove, false);
        setInterval(loop, 1e3 / 40);
    }
    function onDocumentMouseMove(event) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
    }
    function onDocumentTouchStart(event) {
        if (event.touches.length == 1) {
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    }
    function onDocumentTouchMove(event) {
        if (event.touches.length == 1) {
            // event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    }
    function loop() {
        for (var i = 0; i < particles.length; i++) {
            var particle = particles[i];
            particle.updatePhysics();
            with (particle.position) {
                if (y < -1e3) {
                    y += 2e3;
                }
                if (x > 1e3) {
                    x -= 2e3;
                } else {
                    if (x < -1e3) {
                        x += 2e3;
                    }
                }
                if (z > 1e3) {
                    z -= 2e3;
                } else {
                    if (z < -1e3) {
                        z += 2e3;
                    }
                }
            }
        }
        camera.position.x += (mouseX - camera.position.x) * .005;
        camera.position.y += (-mouseY - camera.position.y) * .005;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }

    init();
});



// 搜索

(function(){
    var oList = $('#list');
    //绑定键盘抬起事件
    $('#kw').on('keyup',function(e){
           var textVal = $(this).val();
        $('input[type=button]').click(function(){
            window.location.href = "https://www.baidu.com/s?ie=utf-8&newi=1&mod=11&isbd=1&isid=D6168032F4142123&wd=" + textVal;
        });
        $.ajax({
            url:'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?',
            method:'get',
            data: {
                json: 1,
                wd: textVal
            },
            dataType:"jsonp",
            success: function(data){
                if(data && data.s && data.s.length > 0){
                    //右边删除内容按钮
                    $('#clear').css('display', 'block').click(function(){
                            $('#kw').val('');
                            $('#list').css('display', 'none');
                            oList.children().remove();
                    });
                    render(data.s, textVal);
                }else {
                    $('#list').css('display', 'none');
                    oList.children().remove();
                }
            },
            jsonp:'cb'
        });
    });
    render = function(data, wd) {
        oList.children().remove();
        $('#list').css('display', 'block');
        for(var i = 0; i < data.length; i++){
            oList.append($('<li><a href=https://www.baidu.com/s?ie=utf-8&newi=1&mod=11&isbd=1&isid=D6168032F4142123&wd=' + data[i] + '>' + data[i] + '</a></li>'));
        }
    }
}());
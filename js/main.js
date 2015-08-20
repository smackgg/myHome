/*
*	页面翻转
*	功能：页面翻动，页面内部class为container的容器进行180度翻转
*/

(function($){
	window.onload = function(){
		new myHomeMain();
		//进度条
		$('.onload').css('display','none');
		introduce();
	}

	// 主函数
	var myHomeMain = function(){
		this.init();
	}
	myHomeMain.prototype = {
		//页面计数器
		count: 1,
		// 页面滚动函数
		init: function() {
			var event,
				$pageEle = $('.page'),
				pageLen = $pageEle.length,
				ele = document.getElementsByTagName('body')[0];
			var _this = this;
			_this.addEvent(ele, 'mousewheel', handler);
			function handler(e){
				event = e||window.event;
				if(event.wheelDelta < 0){
					_this.down(ele, pageLen, handler);
				}else{		
					_this.up(ele, handler);			
				}
				return false;	
			}
		},

		// 鼠标滚轮下滑
		down: function(ele, pageLen, handler) {
			var _this = this;
			_this.removeEvent(ele, 'mousewheel', handler);
			// 延迟事件
			var timer = setTimeout(function(){
				_this.addEvent(ele, 'mousewheel', handler);
			},1500);
			if(this.count < pageLen){
				console.log(this.count);
				$('.page' + this.count).css({
					'top': '-100%'
				});
				$('.page' + this.count + '>.container').removeClass('rotateL rotateR');
				this.count++;
				$('.page' + this.count).css({
					'top': '0'
				});
				$('.page' + this.count + '>.container').addClass('rotateR');
			}else if(this.count == pageLen){
				$('.page:not(".page1,.page' + pageLen + '")').css({
					'top': '100%',
					'display':'none'
				});
				$('.page' + pageLen).css('top', '100%');
				$('.page' + this.count + '>.container').removeClass('rotateL rotateR');
				$('.page1').css({
					'top':'0px'
				});
				$('.page1>.container').addClass('rotateL');
				this.count = 1;
				setTimeout(function(){
					$('.page:not(".page1,.page' + pageLen + '")').css({
						'display':'block'
					});
				}, 800);
			}
		},
		// 鼠标滚轮上滑
		up: function (ele, handler) {
			var _this = this;
			_this.removeEvent(ele, 'mousewheel', handler);
			var timer = setTimeout(function(){
				_this.addEvent(ele, 'mousewheel', handler);
			},1500);
			if(this.count > 1){
				console.log(this.count);
				$('.page' + this.count).css({
					'top': '100%'
				});
				$('.page' + this.count + '>.container').removeClass('rotateL rotateR');
				this.count--;
				$('.page' + this.count).css({
					'top': '0'
				});
				$('.page' + this.count + '>.container').addClass('rotateL');
			}
		},
		// 事件绑定
		addEvent:function (ele,type,fn) {
			if (ele.addEventListener) {
				ele.addEventListener(type,fn,false);
			}else{
				console.log(111);
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
		}
	}
	var introduce = function(){
		var str = '我是许岩，现就读于哈尔滨理工大学测通学院物联网工程专业，爱前端，爱游戏，爱运动。性格开朗、稳重、有活力，待人热情、真诚，能吃苦耐劳，有较强的实际动手能力和团体协作精神。';
		var arr = str.split(''),
			ele = document.getElementsByClassName('introduce')[0];
		var timerInt = setInterval(function(){
			if(arr.length > 0){
				ele.innerHTML += arr.shift();
			}else {
				clearInterval(timerInt);
			}
			
			// console.log($introduce.text(1));
		},100);
	}
}(jQuery));

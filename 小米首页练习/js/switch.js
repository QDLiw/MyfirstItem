var index = 0; /*索引*/
var timer = null; /*定时器*/
var offset = 5000; /*图片切换间隔时间*/

var count = 0;
var pagenum = 0;

$(function() {

	count = $('.star .goods-list li').length;
	if(count % 5 == 0) {
		pagenum = count / 5;
	} else {
		pagenum = Math.floor(count / 5) + 1;
	}
	$('.star .goods-list').css('width', pagenum * 1240 + 'px');

	console.log(count);
	console.log(pagenum);

	auto(); //设置自动切换
	clickSwitch();
	listsenMous();
});

// 自动切换
function auto() {
	index++; //索引增加
	if(index > pagenum - 1) {
		index = 0;
	}
	switchPage(index); /*切换页面*/
	changeControl(index); /*更新上下页的样式*/
	timer = window.setTimeout(auto, offset);
}

//产品列表交替轮换
function switchPage(index) {
	$('.star .star-content .goods-list').css('margin-left', -index * 1240 + 'px');
}

//切换按钮的样式
function changeControl(index) {
	$('.star-top .more .control').removeClass('control-disabled');
	if(index == 0) 
	{
		$('.star-top .more .control').eq(0).addClass('control-disabled');
	}
	if(index == pagenum - 1) {
		$('.star-top .more .control').eq(1).addClass('control-disabled');
	}

}

// 点击上下页切换
function clickSwitch() {
	$('.star-top .more .control')
		.bind('click', function() {
			if(timer) {
				clearTimeout(timer); //清除定时器，是DOM容器的方法
			}
			if($(this).hasClass('control-prev')) /*判断点击的是上一页*/ {
				index--;
				if(index < 0) index = 0; /*判断是否超出索引范围*/
			} else {
				index++;
				if(index > pagenum - 1) index = pagenum - 1;
			}
			changeControl(index);
			switchPage(index);
		});
}

// 设置鼠标移入产品区不自动切换
function listsenMous() {
	$(".star .goods-list")
		.mouseover(function() {
			clearTimeout(timer);
		}).mouseout(function() {
			timer = window.setTimeout(auto, offset);
		});
}
/**
 * 图片切换实现
 * 1、图片区域显示在页面上，设置好样式
 * 2、第一张图片显示，其他图片隐藏
 * 3、实现上页下页按钮绑定点击事件，切换banner图
 * 		需要定义一个变量index，保存当前图片的索引
 * 		点击下页时，index++，根据索引切换图片
 * 		定义切换图片的方法slideImage(index)：根据索引找到banner图，调用动画show(),找当前Banner的兄弟标签，将其中显示的都隐藏掉
 * 		同理实现：点击上页。且需要注意，超出索引范围时回正。
 * 
 * 4、定义图片自动切换的方法auto
 * 		index++
 * 		slideImage(index)
 * 		定义定时器：传入auto，设置切换间隔时间
 * 
 * 5、定义切换小圆点样式的方法changeDot(index)，图片切换时，同时调用此方法
 * 
 * 6、定义点击小圆点，切换图片的方法（类似点击上页下页）
 * 
 * 7、监听鼠标移动到图片上时，清除定时器
 * 
**/

var index = 0; /*索引*/
var timer = null; /*定时器*/
var offset = 10000; /*图片切换间隔时间*/

$(function() {
	auto();//设置自动切换
	hookDot();//设置小点的切换事件
	bighookBtn();//设置上页下页的切换事件
	listsenMous();// 鼠标移到图片区时清除定时器
	
});

// 自动切换
function auto() {
	index++; //索引增加
	if(index > 2) {
		index = 0;
	}
	changeDot(index);
	slideImage(index);
	timer = window.setTimeout(auto, offset);
}

// 点击上页下页的切换
function bighookBtn() {
	$('.banner .page-prev,.banner .page-next')
		.bind('click', function() {
			if(timer) {
				clearTimeout(timer);
			}
			var classname = $(this).attr("class");
			if(classname == 'page-prev') /*判断点击的是上一页*/
			{
				index--;
				if(index < 0) index = 2;/*判断是否超出索引范围*/
			} else 
			{
				index++;
				if(index > 2) index = 0;
			}
			/*通过上面的判断代码，得到了一个index*/
			
			changeDot(index);
			slideImage(index);
		});
}

//banner图交替轮换
function slideImage(index) 
{
	$('.banner .slide').eq(index)
		.animate({ opacity: 1 }, 800).show()
		.siblings(':visible').animate({ opacity: 0 }, 800).hide();
}

//切换点的样式
function changeDot(index){
    $('.banner .banner-dot a.active').removeClass('active');
    $('.banner .banner-dot a').eq(index).addClass('active');
}

// 点击小圆点切换图片
function hookDot(){    
    $('.banner .banner-dot-item')
        .bind('click', function(){
            if (timer) {
                clearTimeout(timer);//清除定时器，是DOM容器的方法
            }                
            index = $(this).index();
            changeDot(index);
            slideImage(index);
        });
}
// 设置鼠标移入图区不自动切换
function listsenMous(){ 
	$(".banner .slide,.banner .banner-dot,.banner-paging")
	.mouseover(function(){
		clearTimeout(timer);
	}).mouseout(function(){
		timer = window.setTimeout(auto, offset);
	});
}

var isClickGetFish = false;
//偷鱼手
function changeHands(opt, id) {
	if(id === "nav4") {
		$('#get_fish .' + id).mousedown(function() {
			$('.' + id).css({
				'cursor': 'url(http://myproject-1253666256.cosgz.myqcloud.com/fish/mouse6.ico),auto'
			});
		})
		$('#get_fish .' + id).mouseup(function() {
			$('.' + id).css({
				'cursor': 'url(http://myproject-1253666256.cosgz.myqcloud.com/fish/mouse4.ico),auto'
			});
		})
	} else {

		$('#get_net .' + id).mousedown(function() {
			$('.' + id).css({
				'cursor': 'url(http://myproject-1253666256.cosgz.myqcloud.com/fish/net3.ico),auto'
			});
		})
		$('#get_net .' + id).mouseup(function() {
			$('.' + id).css({
				'cursor': 'http://myproject-1253666256.cosgz.myqcloud.com/fish/net2.ico),auto'
			});
		})
	}
}

function getNavBtn(opt, id) {
	//点击偷鱼按钮后
	if(id === 'nav4') { //偷鱼
		$('.wrap').attr('id', 'get_fish');
		$("#get_fish .boat .arr").hide();
		changeHands(opt, id)
	}
	if(id === 'nav2') { //捕鱼
		isClickGetFish = true;
		$('.wrap').attr('id', 'get_net');
		$("#get_net .boat").find(".arr").show();
		//$('.wrap').removeAttr('id');
	}

}

//获取撒网的位置
//点击wrap捕鱼
var x, y;

function getNetPosition(event, obj) {
	var w = document.documentElement.clientWidth;
	var border_w = (w - 1024) / 2;
	x = event.clientX - border_w;
	y = event.clientY - obj.offsetTop - 30;
	return x, y
};

/*
function clickBoat(opt){
	$("body").on("mousemove","#get_net .fish_area", function(e) {
			getNetPosition(e,this);
			var nets = $("#net"); 
		    if (!nets){
		        return; 
		    } 
		    $(nets).css({'left':x,'top':y});
 		});
}*/

//撒网
function castNet() {
	$('#get_net .fish_area').mousedown(function() {
		$('#net').show();
		$('#net').attr('src', 'images/net3.gif');
	})

	/*$("body").on("click", "#get_net .fish_area", function(e) {
		console.log("捕鱼点击事件", e);
		var nets = $("#net img");
		nets.attr("src", "images/net3.gif");
	});*/
}

$(function() {
	var fish_number = $('.num').html() + '';
	if(parseInt(fish_number) > 0) {
		$('.action_fish').css({
			'display': 'block'
		});
	}
	$("body").on("click", ".nav div", function(e) {
		var id = e.currentTarget.id;
		getNavBtn(this, id);
	});


	//点击大船 --捕鱼
	$("body").on("click", "#get_net .boat", function(e) {
		var id = e.currentTarget.id;
		$(this).find(".arr").hide();
		changeHands(null, id)
		totalFishes();
	});
	
	//点击大船 --偷鱼
	$("body").on("click", "#get_fish .boat", function(e) {
		var id = e.currentTarget.id;
		totalFishes();
	});

	//点购买渔船
	$("body").on("click",".nav1", function(e) {
		$("#up").show();
	});
	//点关闭
	$("body").on("click",".close", function(e) {
		$("#up").hide();
	});
})

function totalFishes() {
	var box_num = parseInt($("#nav3 .num").html());
	var addAfter = ++box_num;
	$("#nav3 .num").html(addAfter);
}

//构造函数
var Parabola = function(eleBtn, eleCaret) {
	$(document).on('ontouchend' in document ? 'touchend' : 'click', eleBtn, function() {
		goCart(getPoint($(this)));
	});

	$(document).on('webkitAnimationEnd animationEnd', '.cart-ball', function(event) {
		$(this).remove();
		$('#fallin').remove();
	});

	function goCart(postion) {
		var endX = postion.endX,
			endY = postion.endY,
			startX = postion.startX,
			startY = postion.startY+50,
			time = (endY - startY) / 300,
			o = $('<div class="cart-ball"></div>'),
			style = "";
		style += "<style type='text/css' id='fallin'>"
		style += "    @-webkit-keyframes fallIn{"
		style += "      0%{"
		style += "        left:" + startX + "px;"
		style += "        top:" + startY + "px;"
		style += "        transform:translateZ(0);"
		style += "        -webkit-transform:translateZ(0);"
		style += "        opacity: 0;"
		style += "      }"
		style += "     20%{"
		style += "        top:" + (startY - 20) + "px;"
		style += "        opacity: 1;"
		style += "      }"
		style += "      100%{"
		style += "        left:" + endX + "px;"
		style += "        top:" + endY + "px;"
		style += "        transform:translateZ(0);"
		style += "        -webkit-transform:translateZ(0);"
		style += "      }"
		style += "    }"
		
		style += "    @keyframes fallIn{"
		style += "      0%{"
		style += "        left:" + startX + "px;"
		style += "        top:" + startY + "px;"
		style += "        transform:translateZ(0);"
		style += "        -webkit-transform:translateZ(0);"
		style += "        opacity: 0;"
		style += "      }"
		style += "     20%{"
		style += "        top:" + (startY - 20) + "px;"
		style += "        opacity: 1;"
		style += "      }"
		style += "      100%{"
		style += "        left:" + endX + "px;"
		style += "        top:" + endY + "px;"
		style += "        transform:translateZ(0);"
		style += "        -webkit-transform:translateZ(0);"
		style += "      }"
		style += "    }"
		style += "</style>";
		$('head').append(style);
		o.css({
			'left': startX + "px",
			'top': startY + "px",
			'animation': 'fallIn 0.5s ease-in both',
			'animation-play-state': 'running'
		});
		$("body").append(o);
	}

	function getPoint(n) {
		var endX = $(eleCaret).offset().left,
			endY = $(eleCaret).offset().top - $(window).scrollTop(),
			startX = n.offset().left,
			startY = n.offset().top - $(window).scrollTop(),
			postion = {
				endX: endX,
				endY: endY,
				startX: startX,
				startY: startY
			};
		return postion;
	}
}
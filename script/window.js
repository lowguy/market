function iosGoodsToCart(image, offset_x, page_y, width, height, ratio, cart_x, cart_y){

		ratio = ratio || 0.01;
		var frame_name = 'to_cart_' + Math.random();
		var offset_y = page_y + parseInt($('header').height());
		api.openFrame({
            name: frame_name,
            url: 'widget://html/common/ios_goods_to_cart.html',
            rect: {
	            x:offset_x + 10,
	            y:offset_y,
	            w:width,
	            h:height
            },
            bgColor:'rgba(0,0,0,0)',
            pageParam:{
            	image:image
            },
            reload:true
        });

		if(!cart_x || !cart_y){
			var cart_offset = $('.cart .icon').offset();
			var cart_width = parseInt($('.cart .icon').width());
			var cart_height =  parseInt($('.cart .icon').height());
			var cart_x = cart_offset.left + cart_width / 2;
			var cart_y = cart_offset.top + cart_height / 2;
		}
		else{
		    cart_y += parseInt($('header').height());
		}

		var x = cart_x - offset_x;
		var y = cart_y - offset_y;

		api.animation({
			delay:150,
            name: frame_name,
            duration: 500,
            alpha:0.1,
            translation:{
            	x:-(x - 10 - width / 2) / ratio,
            	y:-(y - height / 2) / ratio
            },
            scale:{
            	x:ratio,
            	y:ratio
            },
            rotation: {
		        degree: 180,
		        x: 0,
		        y: 0,
		        z: 1
			}
    	}, function(){
           	api.closeFrame({
       		    name: frame_name
        	});
    	});

}

function openNavigator(dom){

	var animation = {
       		type:'none',
       		duration:500
    };

    var delay = 0;

    if(!$(dom).hasClass('active')){
	    var name = $(dom).attr('class');
	    var html = name;
	    if('home' == name){
	        if('ios' == api.systemType){
	            html += '_ios';
	        }
	        else{
	            html += '_android';
	        }
	    }
    	api.openWin({
            name: name,
        	url: 'widget://html/' + html + '.html',
            slidBackEnabled:false,
            animation:animation,
            delay:delay,
            vScrollBarEnabled:false,
            reload:false
    	});
    }
}
function openSearch(){
	var animation = {
       		type:'none',
            duration:500
        };
    var delay = 0;

    api.openWin({
        name: 'search',
        url: 'widget://html/search.html',
        bgColor:'#FFFFFF',
        slidBackEnabled:false,
        animation:animation,
        reload:false,
        delay:delay,
        vScrollBarEnabled:false
    });
}

function openScanner(){
    var animation = {
            type:'none',
            duration:500
    };
    var delay = 0;
    api.openWin({
	    name: 'scanner',
	    url: 'widget://html/scanner.html',
	    animation:animation,
	    reload:false,
	    delay:delay
    });

}

function initNavigator(){
	var market = new Market();
	var current = market.getCurrent();
	if(current){
	    $('header .market span').html(current.district);
	}

    if(['home', 'mall', 'cart','activity'].indexOf(api.winName) > -1){
        touchEvent(".market",showMarket);
        touchEvent(".search",openSearch);
        touchEvent('.scanner', openScanner)
    }
	touchEvent('.navigator section',openNavigator);
}

function updateCartNumber(){
	var market = new Market();
	var current = market.getCurrent();	
	var number = 0;

	if(current){
		var cart = new Cart();
		number = cart.length(current.id);
	}
	
	var dom = $('.cart .number');
 
	dom.html(number);
	if(number == 0){
		dom.addClass('empty');
	}
	else{
		dom.removeClass('empty');
	}
}
function loading(){
	$('body').addClass('loading');
}
function loaded(){
	$('body').removeClass('loading');
}
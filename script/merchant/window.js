function openNavigator(dom){

	var animation = {
       		type:'none',
       		duration:500
       };

    var delay = 0;

    if(!$(dom).hasClass('active')){
	    var name = $(dom).attr('class');

    	api.openWin({
            name: 'merchant_' + name,
        	url: 'widget://html/merchant/' + name + '.html',
            slidBackEnabled:false,
            animation:animation,
            delay:delay,
            reload:false
    	});
    }
}


function initNavigator(){
	var market = new Market();
	var current = market.getCurrent();
	if(current){
	    $('header .market span').html(current.district);
	}
    touchEvent(".market",showMarket);
	touchEvent('.navigator section',openNavigator);
}

function loading(){
	$('body').addClass('loading');
}
function loaded(){
	$('body').removeClass('loading');
}

function checkLogin(){
    var server = new Server();
    if(server.cookieIsExpired()){
        api.openWin({
            name: 'login',
            url: 'widget://html/login.html'
        });
    }
}
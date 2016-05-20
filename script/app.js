function fixStatusBar(dom){
    var version = api.systemVersion;
	if(api.systemType == 'ios'){

        var version = parseInt(version,10);
        if (version >= 7 && !api.fullScreen && api.iOS7StatusBarAppearance) {
            dom.css('padding-top', '20px');
        }
	}
//	else{
//      version = parseFloat(version);
//      if(version >= 4.4){
//          dom.css('padding-top', '25px');
//      }
//	}
}
function getStorage(){
	return 'ios' == api.systemType ? window.localStorage : os.localStorage();
}

function marketChange(){
	api.sendEvent({
   		name: 'MARKET_CHANGED',
	});
}

function onMarketChange(callback){
	api.addEventListener({
	    name:'MARKET_CHANGED'
    },function(ret,err){
		callback();
    });
}

function timestamp(){
	var now = new Date();
	return parseInt(now.getTime()/1000);
}


function isCellPhone(number){
	var result = false;
	if(number){
		var pattern = /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}|15[012356789]|18[01236789]\d{8}$/;
		result = pattern.test(number);
	}

	return result;
}

function showMarket(){

	api.openWin({
	    name: 'market',
	    url: 'widget://html/market.html',
        slidBackEnabled:false,
	    animation:{
	    	type:'none',
	    	duration:300
	    }
    });
}

function hideMarket(){
	api.closeWin({
		name: 'market',
	    animation:{
	    	type:'none',
	    	duration:300
	    }
    });
}

function touchEvent(selector,callback){


    $(document).on('touchstart', selector, function(){
        $(this).addClass('not-moved');
    });

    $(document).on('touchmove', selector, function(){
        $(this).removeClass('not-moved');
    });
    
    $(document).on('touchend', selector, function(){
        if($(this).hasClass('not-moved')){
            $(this).removeClass('not-moved');
            if(callback && $.isFunction(callback)){
                callback(this);
            }
        }
    });
}

function openWin(name,url,animation,delay,pageParam,reload){
	api.openWin({
        name: name,
        url: 'widget://html/' + url + '.html',
        slidBackEnabled:false,
   		animation:animation,
    	delay:delay,
    	pageParam:pageParam,
		reload:reload
	});
}

function openURL(url){
    api.openWin({
	    name: 'url',
	    url: 'widget://html/url.html',
	    reload:true,
	    animation:{
	       type:'none'
	    },
	    bgColor:'#FFFFFF',
	    pageParam:{
	        url:url
	    }
    });
}



function pushAddAlias(uid){
    var push = api.require('ajpush');
    var param = {alias:uid};
    push.bindAliasAndTags(param,function(ret) {
        console.log(ret.statusCode);
    });
}
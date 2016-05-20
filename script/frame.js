function setRefreshHeader(callback, visible) {
	api.setRefreshHeaderInfo({
		visible : visible,
		textLoading : '加载...',
		textDown : '用力...',
		textUp : '放手...',
		showTime : true,
		bgColor:'rgba(255,255,255,1)',
		textColor:'rgba(102,102,102,1)',
		loadingImg:'widget://image/icons/push-down.png',
	}, function(ret, err) {
		if (callback && $.isFunction(callback)) {
			callback();
		}
	});
}

function onNetworkChanged(request, lasyRequest){

	if(api.connectionType == 'none' || api.connectionType == 'unknown'){
		$('.network-error').addClass('show');
		setRefreshHeader(request, false);
	}
	else{
		setRefreshHeader(request, true);
	}

	api.addEventListener({
        name:'offline'
    },function(ret,err){
 		setRefreshHeader(request, false);
    	$('.network-error').addClass('show');
	});

	api.addEventListener({
        name:'online'
    },function(ret,err){
    	setRefreshHeader(request, true);
    	$('.network-error').removeClass('show');
    	if(lasyRequest && $.isFunction(lasyRequest)){
    		setTimeout(lasyRequest,  2000);
    	}
	});
}
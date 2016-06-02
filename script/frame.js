function setRefreshHeader(callback) {
	api.setCustomRefreshHeaderInfo({
        bgColor: '#FFFFFF',
        isScale: true,
        image: {
            pull: [
                'widget://image/pulldown/1.png',
                'widget://image/pulldown/2.png',
                'widget://image/pulldown/3.png',
                'widget://image/pulldown/4.png',
                'widget://image/pulldown/5.png',
                'widget://image/pulldown/6.png',
                'widget://image/pulldown/7.png',
                'widget://image/pulldown/8.png',
                'widget://image/pulldown/9.png',
                'widget://image/pulldown/10.png',
                'widget://image/pulldown/11.png',
                'widget://image/pulldown/12.png'
            ],
            load: [
                'widget://image/pulldown/r1.png',
                'widget://image/pulldown/r2.png',
                'widget://image/pulldown/r3.png',
                'widget://image/pulldown/r4.png'
            ]
        }
    }, function() {
        callback();
    });
}

function onNetworkChanged(request, lasyRequest){

	if(api.connectionType == 'none' || api.connectionType == 'unknown'){
		$('.network-error').addClass('show');
	}
	setRefreshHeader(request);

	api.addEventListener({
        name:'offline'
    },function(ret,err){
    	$('.network-error').addClass('show');
	});

	api.addEventListener({
        name:'online'
    },function(ret,err){
    	$('.network-error').removeClass('show');
    	if(lasyRequest && $.isFunction(lasyRequest)){
    		setTimeout(lasyRequest,  2000);
    	}
	});
}
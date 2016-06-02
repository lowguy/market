function openGoodsFrame(goods){
	var header = parseInt($('header').height());
	if('mall' == api.winName){
	    header -= parseInt($('.top-category-area').height());
	}

	if('activity' == api.winName){
       header -= parseInt($('.activity-area').height());
	}

	if('home' == api.winName && 'ios' != api.systemType){
	    header = 50;
	}
	var footer = parseInt($('footer').height());
	var winHeight = parseInt(api.winHeight);
	var height = winHeight - header - footer;
	if('search' == api.winName){
	    height = winHeight - header;
	}
	api.openFrame({
	    name: 'goods_detail',
	    url: 'widget://html/common/goods_detail.html',
	    rect: {
		    x:0,
		    y:header,
		    w:'auto',
		    h:height
	    },
	    bgColor:'rgba(0,0,0,0)',
	    reload:true,
	    animation:{
	    	type:'movein',
	    	subType:'from_bottom',
	    	duration:300
	    },
	    pageParam:{
	    	goods:goods
	    },
	    bounces:false
    });
}

function closeGoodsFrame(){
	api.execScript({
		frameName:'goods_detail',
	    script: 'hideContainer();'
    });
    api.setFrameAttr({
	    name: 'goods_detail',
	    hidden:true
    });
}
/**
 * 商品
 */
function Goods() {
    if ( typeof Goods.prototype.instance === 'object') {
        return Goods.prototype.instance;
    }
    Goods.prototype.instance = this;
}

Goods.prototype.goods = [];


/**
 * 加载文件
 * @param {Object} callback
 */
Goods.prototype.load = function(callback){
	var thiz = this;
	api.readFile({
    	path: 'widget://data/goods.json'
	}, function( ret, err ){
	    thiz.goods = JSON.parse(ret.data);
	    if(callback && $.isFunction(callback)){
	    	callback();
	    }
	});
};
/**
 *将云端的数据和本地化的数据合并在一起 
 */
Goods.prototype.merge = function(obj){
    var result = [];
    var thiz =  this;
    $.each(obj, function(index, item){
        var goods = thiz.get(item[0]);
        if(null != goods){
            goods.price = item[1];
            goods.stock = item[2];
            goods.status = item[4];
            goods.sales = item[3];
            goods.activity = item[5];
            goods.discount = item[6];
            result.push(goods);
        }
    });

    return result;
}

Goods.prototype.get = function(id){
	var result = null;
	$.each(this.goods, function(index, item){
		if(item.id == id){
			result = item;
			return false;
		}
	});

	return result;
}

Goods.prototype.clear = function(){
	var storage = getStorage();
	storage.removeItem(this.STORAGE_KEY);
}
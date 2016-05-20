/**
 * 分类
 */
function Category() {
    if ( typeof Category.prototype.instance === 'object') {
        return Category.prototype.instance;
    }
    Category.prototype.instance = this;
}

Category.prototype.categories = [];

Category.prototype.STORAGE_KEY = "CATEGORY_STORAGE_KEY";

/**
 * 加载文件
 * @param {Object} callback
 */

Category.prototype.load = function(callback){
	var thiz = this;
	api.readFile({
    	path: 'widget://data/category.json'
	}, function( ret, err ){
	    thiz.categories = JSON.parse(ret.data);
	    if(callback && $.isFunction(callback)){
	    	callback();
	    }
	});
};

/**
 * 通过ID获取顶级分类
 */
Category.prototype.listTop = function(ids){
	var result = [];
	var thiz =  this;
	$.each(ids, function(index, id){
		var category = thiz.getTop(id);
		if(null != category){
			result.push(category);
		}
	});

	return result;
}

Category.prototype.getTop = function(id){
	var result = null;
	$.each(this.categories, function(index, item){
		if(item.id == id){
			result = item;
			return false;
		}
	});

	return result;
}


/**
 * 获取二级分类
 */
Category.prototype.listLow = function(top, ids){
	var result = [];
	var thiz =  this;
	var topCategory = this.getTop(top);

	$.each(ids, function(i, id){
		$.each(topCategory.children, function(j, child){
			if(id == child.id){
				result.push(child);
				return false;
			}
		});
	});

	return result;
}

Category.prototype.clear = function(){
	var storage = getStorage();
	storage.removeItem(this.STORAGE_KEY);
}
/**
 * 购物车
 */
function Cart() {
    if ( typeof Cart.prototype.instance === 'object') {
        return Cart.prototype.instance;
    }
    Cart.prototype.instance = this;
}

Cart.prototype.STORAGE_KEY = "CART_STORAGE_KEY";

/**
 *购物车商品数量 
 *@param {Integer} marketID
 */
Cart.prototype.length =  function(marketID){
	var result = 0;
	var items = this.list(marketID);
	$.each(items, function(index, item){
	    result += item.number;
	});

	return result;
}

/**
 *获取购物车商品列表 
 *@param {Integer} marketID
 */
Cart.prototype.list = function(marketID){
	var result = [];
	var storage = getStorage();

	var str = storage.getItem(this.STORAGE_KEY);

	if(str){
		var data = JSON.parse(str);
		var key = 'market' + marketID;
		if(data.hasOwnProperty(key)){

			result = data[key];
		}
	}

	return result;
}

/**
 *添加某一商品到购物车 
 * @param {Integer} marketID
 * @param {Integer} goodsID
 */
Cart.prototype.add = function(marketID, goodsID){
	var key = 'market' + marketID;
	var storage = getStorage();
	var data = {};
	var str = storage.getItem(this.STORAGE_KEY);

	if(str){
		data = JSON.parse(str);
		if(data.hasOwnProperty(key)){

			var exist = false;
			$.each(data[key], function(index, item){
				if(item.id == goodsID){
					data[key][index].number++;
					exist = true;
					return false;
				}
			});
			if(!exist){

				data[key].push({
					id:goodsID,
					number:1
				});
			}
		}
		else{

			data[key] = [];
			data[key].push({
				id:goodsID,
				number:1
			});
		}
	}
	else{

		data[key] = [];
		data[key].push({
			id:goodsID,
			number:1
		});
	}

	storage.setItem(this.STORAGE_KEY, JSON.stringify(data));
}

/**
 * 从购物车减少一个商品 
 * @param {Integer} marketID
 * @param {Integer} goodsID
 * @param {Integer} number
 */
Cart.prototype.sub = function(marketID, goodsID, number){
	var key = 'market' + marketID;
	var storage = getStorage();

	var str = storage.getItem(this.STORAGE_KEY);

	if(str){
		var data = JSON.parse(str);
		if(data.hasOwnProperty(key)){

			for(var i = 0; i < data[key].length; i++){
				if(data[key][i].id == goodsID){
					if(!number){
						data[key][i].number--;
					}else{
						data[key][i].number -= number;
					}
					if(data[key][i].number == 0){
						data[key].splice(i, 1);  
					}
					storage.setItem(this.STORAGE_KEY, JSON.stringify(data));
					break;
				}
			}
		}
	}
}

/**
 * 从购物车删除某商品 
 * @param {Integer} marketID
 * @param {Integer} goodsID
 */
Cart.prototype.remove = function(marketID, goodsID){
	var key = 'market' + marketID;
	var storage = getStorage();

	var str = storage.getItem(this.STORAGE_KEY);

	if(str){
		var data = JSON.parse(str);
		if(data.hasOwnProperty(key)){
			var len = data[key].length;
			for(var i = 0; i < len; i++){
				if(data[key][i].id == goodsID){
					data[key].splice(i, 1);  
					storage.setItem(this.STORAGE_KEY, JSON.stringify(data));
					break;
				}
			}
		}
	}
}

Cart.prototype.clear = function(){
	var storage = getStorage();
	storage.removeItem(this.STORAGE_KEY);
}
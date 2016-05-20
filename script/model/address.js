/**
 * 收货地址
 */
function Address() {
    if ( typeof Address.prototype.instance === 'object') {
        return Address.prototype.instance;
    }
    Address.prototype.instance = this;
}

Address.prototype.STORAGE_KEY = "ADDRESS_STORAGE_KEY";


/**
 *列出收货地址
 * @param {Integer} marketID
 */
Address.prototype.list = function(marketID){
	var result = [];
	var key = 'market_' + marketID;
	var storage = getStorage();
	var str = storage.getItem(this.STORAGE_KEY);
	var data = {};
	if(str){
		data = JSON.parse(str);
		if(data.hasOwnProperty(key)){
			result = data[key];
		}
	}
	return result;
}
/**
 * 获取收货地址
 * @param {Integer} marketID
 * @param {Integer} id
 */
Address.prototype.get = function(marketID,id){
	var result = null;
	var key = 'market_' + marketID;
	var storage = getStorage();
	var str = storage.getItem(this.STORAGE_KEY);
	var data = {};
	if(str){
		data = JSON.parse(str);
		if(data.hasOwnProperty(key)){
			$.each(data[key],function(index,item){
				if(item.id == id){
					result=item;
				}
			});
		}
	}
	return result;
}
/**
 * 添加收货地址 
 * @param {Integer} marketID
 * @param {String} phone
 * @param {String} address
 */
Address.prototype.add = function(marketID, phone, lon, lat ,address, detail){
	if(marketID && phone && address){
		address = address.trim();
		phone = phone.trim();
		var key = 'market_' + marketID;
		var storage = getStorage();
		var str = storage.getItem(this.STORAGE_KEY);
		var data = {};
		var exists = false;
		if(str){
			data = JSON.parse(str);
			if(data.hasOwnProperty(key)){
				var len = data[key].length;
				var id = len == 0 ? 1 : len+1;
				data[key].push({
						id:id,
						phone:phone,
						lon:lon,
						lat:lat,
						address:address,
						detail:detail,
						status:0
				});
				storage.setItem(this.STORAGE_KEY, JSON.stringify(data));
				this.setDefault(marketID,id);
			}else{
				data[key] = [];
				data[key].push({
					id:1,
					phone:phone,
					lon:lon,
					lat:lat,
					address:address,
					detail:detail,
					status:1
				});
				storage.setItem(this.STORAGE_KEY, JSON.stringify(data));
			}			
		}else{
			data[key] = [];
			data[key].push({
				id:1,
				phone:phone,
				lon:lon,
				lat:lat,
				address:address,
				detail:detail,
				status:1
			});
			storage.setItem(this.STORAGE_KEY, JSON.stringify(data));
		}	
			
	}
}

/**
 * 编辑收货地址 
 * @param {Integer} marketID
 * @param {Integer} id
 */
Address.prototype.edit = function(marketID, id, phone, lon, lat ,address, detail, number){
	if(marketID && id && phone && address){
		address = address.trim();
		phone = phone.trim();
		
		var key = 'market_' + marketID;
		var storage = getStorage();
		var str = storage.getItem(this.STORAGE_KEY);
		var data = {};
		if(str){
			data = 	JSON.parse(str);
			if(data.hasOwnProperty(key)){
				var len = data[key].length;
				for(var i = 0; i <　len; i++){
					if(data[key][i].id == id){
						data[key][i].phone = phone;
						data[key][i].lon = lon;
						data[key][i].lat = lat;
						data[key][i].detail = detail;
						data[key][i].address = address;
						storage.setItem(this.STORAGE_KEY, JSON.stringify(data));
						this.setDefault(marketID,id);
					}
				}			
			}
		}
	}
}

/**
 * 删除收货地址 
 * @param {Integer} marketID
 * @param {Integer} id
 */
Address.prototype.remove = function(marketID, id){
	if(marketID && id){
		var key = 'market_' + marketID;
		var storage = getStorage();
		var str = storage.getItem(this.STORAGE_KEY);
		var data = {};
		if(str){
			data = JSON.parse(str);
			if(data.hasOwnProperty(key)){
				var len = data[key].length;
				for(var i = 0; i < len; i++){
					if(data[key][i].id == id){
						var removed = data[key].splice(i, 1);
						if(removed[0].status == 1){
							if(data[key].length > 0){
								data[key][0].status = 1;
							}
						}
						storage.setItem(this.STORAGE_KEY,JSON.stringify(data));
						removed = null;
						break;
					}
				}
			}
		}
	}
}

/**
 * 设置默认的收货地址
 * @param {Integer} id
 */
Address.prototype.setDefault = function(marketID,id){
	if(marketID&&id){
		var key = 'market_' + marketID;
		var storage = getStorage();
		var str = storage.getItem(this.STORAGE_KEY);
		var data = {};
		var exist = false;
		if(str){
			data = JSON.parse(str);
			if(data.hasOwnProperty(key)){
				$.each(data[key],function(index,item){
					data[key][index].status = item.id == id ? 1 : 0 ;
				})
				storage.setItem(this.STORAGE_KEY, JSON.stringify(data));
			}
		}
	}
}

/**
 * 获取默认的收货地址
 */
Address.prototype.getDefault = function(marketID){
	var result = null;
	if(marketID){	
		var key = 'market_' + marketID;
		var storage = getStorage();
		var str = storage.getItem(this.STORAGE_KEY);
		var data = {};
		if(str){		
			data = JSON.parse(str);
			if(data.hasOwnProperty(key)){
				$.each(data[key],function(index,item){
					if(item.status == 1){
						result = item;
					}
				});
			}
		}
		
	}
	return result;
}

Address.prototype.clear = function(){
	var storage = getStorage();
	storage.removeItem(this.STORAGE_KEY);
}
function Search(){
    if ( typeof Search.prototype.instance === 'object') {
        return Search.prototype.instance;
    }
    Search.prototype.instance = this;
}

Search.prototype.STORAGE_KEY = "SEARCH_STORAGE_KEY";

Search.prototype.add = function (val){
	if(val){
		var storage = getStorage();
		var res     = storage.getItem(this.STORAGE_KEY);
		var data    = {}; 
		if(res){
			data = JSON.parse(res);
			var len = data.length; 
			if(len>=9){
			    var exists = false;
				for(var i = 0; i < len; i++){
					if(data[i] == val){
						data.splice(i,1);
						exists = true;
						break;
					}
				}
				if(!exists){
					data = data.splice(1,8);
				}
				len--;
			}
			
			for(var i = 0; i < len; i++){
				if(data[i] == val){
					data.splice(i,1);
					break;
				}
			}			
			data.push(val);
			storage.setItem(this.STORAGE_KEY,JSON.stringify(data));
		}else{
			data = [];
			data.push(val);
			storage.setItem(this.STORAGE_KEY,JSON.stringify(data));
		}
	}
}

Search.prototype.list = function(){
	var result = [];
	var storage = getStorage();
	var res     = storage.getItem(this.STORAGE_KEY);
	var data    = {}; 
	if(res){
		data = JSON.parse(res);
		var len = data.length; 
		result = len > 0 ? data : [];	
	}
	if(result){
		result = result.reverse();
	}
	return result;
}

Search.prototype.clear = function(){
	var storage = getStorage();
	storage.removeItem(this.STORAGE_KEY);
}
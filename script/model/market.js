/**
 * 市场
 */
function Market() {
    if ( typeof Market.prototype.instance === 'object') {
        return Market.prototype.instance;
    }
    Market.prototype.instance = this;
}

Market.prototype.markets = [];

Market.prototype.STORAGE_KEY = "MARKET_STORAGE_KEY";
Market.prototype.HISTORY_KEY = "MARKET_HISTORY_KEY";

Market.prototype.getHistory = function(){
	var result = [];
	var storage = getStorage();
	var stored = storage.getItem(this.HISTORY_KEY);
	if(stored){
		result = JSON.parse(stored);
		result.pop();
	}

	return result;
}

Market.prototype.addHistory = function(market){
	var markets = [];
	var storage = getStorage();
	var stored = storage.getItem(this.HISTORY_KEY);
	if(stored){
		markets = JSON.parse(stored);

		$.each(markets, function(index, item){
			if(item.id == market.id){
				markets.splice(index, 1);
			}
		});
	}

	markets.push(market);

	markets = markets.splice(-4, 4);
	stored = JSON.stringify(markets);
	storage.setItem(this.HISTORY_KEY, stored);
}

Market.prototype.getCurrent = function(){
	var result = null;
	var storage = getStorage();
	var stored = storage.getItem(this.STORAGE_KEY);

	if(stored){
		result = JSON.parse(stored);
	}
	return result;
};

/**
 *设置当前的市场 
 * @param {Object} market
 */
Market.prototype.setCurrent = function(market){
	var storage = getStorage();

	storage.setItem(this.STORAGE_KEY, JSON.stringify(market));

	this.addHistory(market);
};


Market.prototype.getMarket = function(city, district){
	var market = null;

	$.each(this.markets, function(index, item){
  		if(item.city == city && item.district == district){
  			market = item;
  			return false;
  		}
	});

	return market;
};

Market.prototype.getMarketsOfCity = function(city){
	var markets = [];

	$.each(this.markets, function(index, item){
  		if(item.city == city){
  			markets.push(item);
  		}
	});

	return markets;
}

Market.prototype.getCities = function(){
	var cities = [];

	$.each(this.markets, function(index, item){
  		if(-1 == $.inArray(item.city, cities)){
  			cities.push(item.city);
  		}
	});

	return cities;
}

Market.prototype.load = function(callback){
	var thiz = this;
	api.readFile({
    	path: 'widget://data/market.json'
	}, function( ret, err ){
	    thiz.markets = JSON.parse(ret.data);
	    if(callback && $.isFunction(callback)){
	    	callback();
	    }
	});
};

Market.prototype.clear = function(){
	var storage = getStorage();
	storage.removeItem(this.STORAGE_KEY);
}
/**
 *  服务器相关， 包括Cookie管理
 */
function Server() {
    if ( typeof Server.prototype.instance === 'object') {
        return Server.prototype.instance;
    }
    Server.prototype.instance = this;
}

Server.prototype.STORAGE_KEY = "SERVER_STORAGE_KEY";
Server.prototype.COOKIE_TIME_KEY = "COOKIE_TIME_KEY";

Server.prototype.data = ['http://101.200.204.155'];

Server.prototype.getOne = function() {
    var index = Math.random() * this.data.length;
    index = Math.floor(index);
    return this.data[index];
}

Server.prototype.getCookie = function() {
    var storage = getStorage();
    var result = '';
    var str = storage.getItem(this.STORAGE_KEY);
    if(str){
    	var arr = str.split('=');
    	if(arr.length > 1){
    		result = arr[1];
    	}
    }
    return result;
}

Server.prototype.setCookie = function(header) {
    if (header && header['Set-Cookie']) {
        var storage = getStorage();
        console.log(header['Set-Cookie']);
        var arr = header['Set-Cookie'].split(';');
        for (var i = 0; i < arr.length; i++) {
            var str = arr[i];
            if (-1 != str.indexOf('XXJID')) {
                storage.setItem(this.STORAGE_KEY, str);
                storage.setItem(this.COOKIE_TIME_KEY, "" + timestamp());
                break;
            }
        }
    }
}

Server.prototype.cookieNeedUpdate = function(){
    var result = true;
    var storage = getStorage();
    var time = storage.getItem(this.COOKIE_TIME_KEY) || 0;

    if(timestamp() - parseInt(time) < 1800){
        result = false;
    }

    return result;
}

Server.prototype.cookieIsExpired = function(){
    var result = true;
    var storage = getStorage();
    var time = storage.getItem(this.COOKIE_TIME_KEY) || 0;

    if(timestamp() - parseInt(time) < 3000){
        result = false;
    }

    return result;
}

Server.prototype.clear = function(){
    var storage = getStorage();
    storage.removeItem(this.COOKIE_TIME_KEY);
    storage.removeItem(this.STORAGE_KEY);
}
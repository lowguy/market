/**
 *  服务器相关， 包括Cookie管理
 */
function Server() {
    if ( typeof Server.prototype.instance === 'object') {
        return Server.prototype.instance;
    }
    Server.prototype.instance = this;
}

Server.prototype.COOKIE_TIME_KEY = "COOKIE_TIME_KEY";

Server.prototype.data = ['http://api.xxj365.com'];

Server.prototype.getOne = function() {
//  var index = Math.random() * this.data.length;
//  index = Math.floor(index);
    return this.data[0];
}

Server.prototype.setCookie = function(header) {
    if (header && header['Set-Cookie']) {
        var storage = getStorage();
        var arr = header['Set-Cookie'].split(';');
        for (var i = 0; i < arr.length; i++) {
            var str = arr[i];
            if (-1 != str.indexOf('XXJID')) {
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
}
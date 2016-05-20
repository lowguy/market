function Schema(){
    if ( typeof Schema.prototype.instance === 'object') {
        return Schema.prototype.instance;
    }
    Schema.prototype.instance = this;
}


Schema.prototype.isHTTP = function(uri){
    var result = false;
    if(uri && uri.indexOf('http') > -1){
        result = true;
    }

    return result;
}

Schema.prototype.isInvited = function(uri){
    var result = false;
    if(uri && uri.indexOf('xiaoxiaojia') > -1){
        result = true;
    }

    return result;
}
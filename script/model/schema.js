function Schema(){
    if ( typeof Schema.prototype.instance === 'object') {
        return Schema.prototype.instance;
    }
    Schema.prototype.instance = this;
}


Schema.prototype.isHTTP = function(uri){
    var result = false;
    if(uri){
        if( 0 == uri.indexOf('http://') || 0 == uri.indexOf('https://')){
            result = true;
        }
    }

    return result;
}

Schema.prototype.isXXJ = function(uri){
    var result = false;
    if(uri && 0 == uri.indexOf('xiaoxiaojia://')){
        result = true;
    }

    return result;
}

Schema.prototype.isFans = function(uri){
    var result = false;
    result = this.isXXJ(uri);
    if(result){
        if(uri.indexOf('/fans/') > -1){
            result = true;
        }
    }

    return result;
}

Schema.prototype.getFansID = function(uri){
    return uri.replace('xiaoxiaojia://fans/', '');
}

Schema.prototype.isGoods = function(uri){
    var result = false;
    result = this.isXXJ(uri);
    if(result){
        if(uri.indexOf('/goods/') > -1){
            result = true;
        }
    }

    return result;
}

Schema.prototype.getGoods = function(uri){
    var result =  uri.replace('xiaoxiaojia://goods/', '');
    result =  decodeURIComponent(result);
    return result;
}
function User(){
    if ( typeof User.prototype.instance === 'object') {
        return User.prototype.instance;
    }
    User.prototype.instance = this;
}

User.prototype.STORAGE_KEY = "USER_STORAGE_KEY";

User.prototype.set = function(id, roles, account, password){
    var obj = {
        id:id,
        roles:roles,
        account:account,
        password:password
    }
    var storage = getStorage();
    storage.setItem(this.STORAGE_KEY, JSON.stringify(obj));
}

User.prototype.setLogin = function(status){
    var obj = this.get();
    obj.login = status;
    var storage = getStorage();
    storage.setItem(this.STORAGE_KEY, JSON.stringify(obj));
}

User.prototype.get = function(){
    var obj = null;
    var storage = getStorage();
    var str = storage.getItem(this.STORAGE_KEY);
    if(str){
        obj = JSON.parse(str);
    }

    return obj;
}

User.prototype.clear = function(){
    var storage = getStorage();
    storage.removeItem(this.STORAGE_KEY);
}
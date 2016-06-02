/**
 * 商品
 */
function Goods() {
    if ( typeof Goods.prototype.instance === 'object') {
        return Goods.prototype.instance;
    }
    Goods.prototype.instance = this;
}

/**
 *将云端的数据和本地化的数据合并在一起 
 */
Goods.prototype.merge = function(obj){
    var result = [];
    var less = [];
    $.each(obj, function(index, item){
        var goods = {};
        goods.id = item[0];
        goods.price = item[1];
        goods.stock = item[2];
        goods.status = item[4];
        goods.sales = item[3];
        goods.activity = item[5];
        goods.discount = item[6];
        goods.category_id = item[7];
        goods.title = item[8];
        goods.slogan = item[9];
        goods.version = item[10];
        if(goods.status > 0 && goods.stock > 0){
            result.push(goods);
        }
        else{
            less.push(goods);
        }
    });
    result = result.concat(less);
    return result;
}


/**
 *购物车专用
 */
Goods.prototype.mergeWithComment = function(obj){
    var result = [];
    var less = [];
    $.each(obj, function(index, item){
        var goods = {};
        goods.id = item[0];
        goods.price = item[1];
        goods.stock = item[2];
        goods.status = item[4];
        goods.sales = item[3];
        goods.activity = item[5];
        goods.discount = item[6];
        goods.category_id = item[7];
        goods.title = item[8];
        goods.slogan = item[9];
        goods.version = item[10];
        goods.enableComment = item[11];
        if(goods.status > 0 && goods.stock > 0){
            result.push(goods);
        }
        else{
            less.push(goods);
        }
    });
    result = result.concat(less);
    return result;
}
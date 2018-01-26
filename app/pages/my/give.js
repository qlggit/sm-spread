var WY = global.WY;
Page({
    name:'member-index',
    data:{
        pageData:[],
        giveProductCount:0,
        giveProductAmount:0,
        giveAmount:0,
        selectList:[],
    },
    onLoad:function(options){
        WY.wxInit(this);
        this.options = options;
        this.doSearch();
        var that = this;
        WY.oneBind('number-select',function(data , dataset ){
            that.data.pageData.find(function(a){
                return a.goodsId === dataset.item.goodsId;
            }).number = data.number;
            that.doSum();
        },this);
        this.searchGiveAmount();
    },
    searchGiveAmount:function(){
        var that = this;
        WY.request({
            url:WY.url.order.giveAmount,
            data:{
            },
            success:function(a){
                var data = a.result && a.result.find(function(a){
                    return a.supplierId - 0 === that.options.supplierId - 0
                });
                if(data)that.setData({
                    giveAmount:data.amount / 100
                })
            }
        });
    },
    doSum:function(){
        var count=0,sum=0;
        this.data.pageData.forEach(function(a){
            if(a.number > 0){
                count++;
                sum+= a.number * a.unitPrice;
            }
        });
        this.setData({
            giveProductCount:count,
            giveProductAmount:sum.toFixed(2)
        })
    },
    doSearch:function(){
        var that = this;
        WY.trigger('get-product',this.options.supplierId,function(data){
            data.forEach(function(a){
                a.unitPrice = a.unitPrice.turnMoney();
            });
            that.setData({
                pageData:data
            })
        });
    },
    submitGive:function(){
        var that = this;
        var goodsLs = [];
        this.data.pageData.forEach(function(a){
            if(a.number > 0){
                goodsLs.push({
                    goodsId:a.goodsId,
                    quantity:a.number
                })
            }
        });
        if(!goodsLs.length){
            WY.newToast('请先选择商品');
            return false;
        }
        if(this.data.giveAmount - 0 < this.data.giveProductAmount){
            WY.newToast('赠送额度不足');
            return false;
        }
        WY.confirm('确定赠送给'+this.options.nickname+'?',function(v){
            if(v){
                WY.request({
                    url:WY.url.order.give,
                    method:'POST',
                    data:{
                        goodsLs:goodsLs,
                        seatOrderNo :that.options.orderNo,
                    },
                    success:function(a){
                        WY.toast(a.message);
                        WY.navigateBack();
                    }
                })
            }
        })
    }
});
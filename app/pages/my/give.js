var WY = global.WY;
Page({
    name:'member-index',
    data:{
        searchData:{
            showList:[
                {
                    title:'名称',
                    name:'goodsName',
                    width:'300'
                },
                {
                    title:'单价',
                    name:'unitPrice',
                    width:'300'
                },
                {
                    title:'选择',
                    type:'btn',
                    btnType:'numberSelect'
                },
            ]
        },
        pageData:[],
        giveProductCount:'',
        giveProductAmount:'',
        selectList:[],
    },
    onLoad:function(options){
        WY.wxInit(this);
        this.options = options;
        this.setData({
            showMainWidth:WY.common.sum(this.data.searchData.showList , function(a){
                return a.width || 0;
            }),
        });
        this.doSearch();
        var that = this;
        WY.oneBind('number-select',function(data , dataset ){
            that.data.pageData.find(function(a){
                return a.goodsId === dataset.item.goodsId;
            }).number = data.number;
            that.doSum();
        },this);
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
                tableDataAble:1,
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
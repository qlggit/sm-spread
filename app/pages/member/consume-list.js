var WY = global.WY;
Page({
    name:'member-index',
    data:{
        showData:'',
        pageData:[],
        activeList:[0,0],
    },
    onLoad:function(options){
        WY.wxInit(this);
        this.options = options;
        this.searchSeat();
    },
    onShow:function(options){
        if(this.data.showData){
            this.searchOrder();
        }
    },
    activeChange:function(e){
        this.data.activeList[e.target.dataset.index] = !this.data.activeList[e.target.dataset.index];
        this.setData({
            activeList:this.data.activeList
        });
    },
    searchSeat:function(){
        var that = this;
        WY.request({
            url: WY.url.order.seatInfo,
            data: {
                orderNo: this.options.orderNo,
            },
            success: function (a) {
                var data = a.result[0];
                var showData = {
                    amount: 0,
                    userId: that.options.userId,
                    nickname: data.nickName || data.nickname,
                    orderNo: data.orderNo,
                    supplierId: data.supplierId,
                    supplierName: data.supplierName,
                    bookTime: WY.common.parseDate(data.bookTime),
                    giveAble: new Date(data.bookTime) > new Date(WY.common.getStartBookTime())
                    && new Date(WY.common.getStartBookTime())< (new Date(data.bookTime)-0+24*3600*1000)
                };
                if (data.arrivedTime) {
                    showData.arrivedTime = WY.common.parseDate(data.arrivedTime)
                }
                that.setData({
                    showData: showData,
                });
                that.searchOrder();
            },
        });
    },
    searchOrder:function(){
        var that = this;
        var all = [];
        var detailLs = [];
        var showData = that.data.showData;
        var sumAmount = 0,sumNumber=0;
        var giveAmount = 0,giveNumber = 0;
        [
            {
                url:WY.url.order.infoBySeat,
                data:{
                    seatOrderNo:this.options.orderNo,
                    pageNum:1,
                    pageSize:10,
                },
                type:'buy',
            }
        ,{
            url:WY.url.order.giveInfo,
            data:{
                seatOrderNo:this.options.orderNo,
                pageNum:1,
                pageSize:10,
            }
        }].forEach(function(data){
            all.push(new Promise(function(rev){
                WY.request({
                    url:data.url,
                    data:data.data,
                    notToast:1,
                    success:function(a){
                        var dataList = a.result && a.result.list || a.result;
                        if(dataList)dataList.forEach(function(b){
                            if(1 || b.userId === that.options.userId){
                                detailLs = detailLs.concat(b.detailLs.map(function(c){
                                    var amount = c.unitPrice.turnMoney()*c.quantity;
                                    if(data.type === 'buy'){
                                        sumAmount+= amount;
                                        sumNumber+= c.quantity;
                                    }else{
                                        giveAmount += amount;
                                        giveNumber += c.quantity;
                                    }

                                    return {
                                        goodsName:c.goodsName,
                                        quantity:c.quantity,
                                        unitPrice :c.unitPrice.turnMoney().toMoney(),
                                        amount :amount.toMoney(),
                                        autoType:data.type,
                                        type:data.type === 'buy'?'购买':'赠送'
                                    }
                                }));
                            }
                        });
                        rev();
                    }
                })
            }))
        });
        Promise.all(all).then(function(){
            showData.amount = sumAmount.toMoney();
            showData.number = sumNumber.toMoney();
            showData.giveAmount = giveAmount.toMoney();
            showData.giveNumber = giveNumber.toMoney();
            that.setData({
                buyData:detailLs.filter(function(a){return a.autoType === 'buy'}),
                giveData:detailLs.filter(function(a){return a.autoType !== 'buy'}),
                pageData:detailLs,
                showData:showData,
                tableDataAble:1,
            });
        });
    }
});
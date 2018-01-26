var WY = global.WY;
Page({
    name:'member-index',
    data:{
        endTime:WY.common.parseDate(new Date , 'Y-m-d'),
        pickerData:{
            startDate:{
                value:0,
            },
            endDate:{
                value:0,
            } ,
        },
        pageNum:1,
        pageData:[]
    },
    onLoad:function(options){
        WY.wxInit(this , {
            pickerChangeHandler: ['startDate', 'endDate']
        });
        this.options = options;
        var that = this;
        WY.oneReadyOnce('user-info' , function(data){
            that.doSearch();
        }, this);
    },
    doSearch:function(e){
        var that = this;
        if(e){
            this.reset();
        }
        var data = {
            payStatus:'ALREADY_PAY',
            userId:this.options.userId,
            supplierId:WY.session.userInfo.supplierId,
            pageNum:this.data.pageNum,
            pageSize:this.data.pageSize,
        };
        data.startDate = this.data.pickerData.startDate.value || '';
        data.endDate = this.data.pickerData.endDate.value || '';
        WY.request({
            url:WY.url.order.seat,
            data:data,
            success:function(a){
                that.pageDataHandler(a,function(a,i){
                    a.date = WY.common.parseDate(a.bookTime , 'Y-m-d');
                    a.place = a.supplierName;
                    a.amount = a.lowCostAmount && a.lowCostAmount.turnMoney();
                    a.bookTime = a.bookTime.slice(0,10);
                    return a;
                });
                that.setAllPageData(a);
            }
        })
    }
});
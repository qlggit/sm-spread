var WY = global.WY;
Page({
    name:'withdraw-index',
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
        pageData:[],
        menuCurrent:0,
        balance:0
    },
    onLoad:function(options){
        WY.wxInit(this , {
            pickerChangeHandler:['startDate','endDate']
        });
        this.doSearch();
    },
    doSearch:function(e){
        var data = {};
        if(e){
            this.reset();
        }
        data.startDate = this.data.pickerData.startDate.value || '';
        data.endDate = this.data.pickerData.endDate.value || '';
        data.pageNum = this.data.pageNum;
        var that = this;
        WY.request({
            url:WY.url.withdraw.list,
            data:data,
            success:function(a){
                that.pageDataHandler(a,function(a){
                    a.typeName = WY.enum.text('withdrawType',a.type);
                    a.statusName = ['pass','success'].indexOf(a.status)===-1?WY.enum.text('withdrawStatus',a.status):(-a.amount/100);
                    return a;
                })
                that.setAllPageData(a)
            }
        })
    }
});
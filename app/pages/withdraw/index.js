var WY = global.WY;
Page({
    name:'withdraw-index',
    data:{
        searchData:{
            list:[
                {
                    title:'开始时间',
                    name:'startDate',
                    type:'picker',
                    pickerData:{
                        title:'日期',
                        mode:'date',
                        end:WY.common.parseDate(new Date , 'Y-m-d'),
                        value:0,
                    }
                },
                {
                    title:'结束时间',
                    name:'endDate',
                    type:'picker',
                    pickerData:{
                        title:'日期',
                        mode:'date',
                        end:WY.common.parseDate(new Date , 'Y-m-d'),
                        value:0,
                    }
                }
            ],
            showList:[
                {
                    title:'日期',
                    name:'rowAddTime',
                    width:'200'
                },
                {
                    title:'金额',
                    name:'amount',
                    dataType:'money',
                    filter:function(val){
                        return val.turnMoney();
                    },
                    width:'150'
                },
                {
                    title:'提现方式',
                    name:'type',
                    width:'150',
                    enumData:{
                        alipay:'支付宝',
                        weixin:'微信'
                    }
                },
                {
                    title:'账号',
                    name:'account',
                    width:'200'
                },
                {
                    title:'状态',
                    name:'status',
                    width:'150',
                    enumData:{
                        online:'申请中',
                        pass:'成功',
                        fail:'失败',
                        refuse:'拒绝',
                    }
                },
            ]
        },
        dataList:[{

        },{

        }],
        pageData:[],
        menuCurrent:0,
        balance:0
    },
    onLoad:function(options){
        WY.wxInit(this , {
            pickerChangeHandler:['startDate','endDate']
        });
        var that = this;
        WY.oneReady('user-info',function(){
            that.setData({
                balance:WY.session.userInfo.balance.turnMoney(),
            });
        });
        this.setData({
            showMainWidth:WY.common.sum(this.data.searchData.showList , function(a){
                return a.width || 0;
            }),
        })
    },
    onShow:function(){
        this.reset();
        this.doSearch();
    },
    doSearch:function(data){
        data = data || {};
        data.startDate = data.startDate || '';
        data.endDate = data.endDate || '';
        data.pageNum = this.data.pageNum;
        var that = this;
        WY.request({
            url:WY.url.withdraw.list,
            data:data,
            success:function(a){
                that.setPageData(a)
            }
        })
    }
});
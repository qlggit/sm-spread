var WY = global.WY;
Page({
    name:'member-index',
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
                    name:'date',
                    width:'150'
                },
                {
                    title:'订单',
                    name:'orderNo',
                    width:'250'
                },
                {
                    title:'场所',
                    name:'place',
                    width:'250'
                },
                {
                    title:'最低消费',
                    name:'amount',
                    width:'150'
                },
                {
                    title:'操作',
                    type:'btn',
                    btn:[{
                        navigateTo:'/pages/member/consume-list',
                        code:'',
                        params:{
                            orderNo:'',
                            userId:'',
                        },
                        name:'详情'
                    }]
                },
            ]
        },
        dataList:[{

        },{

        }],
        pageData:[]
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
    },
    doSearch:function(){
        var that = this;
        WY.request({
            url:WY.url.order.seat,
            data:{
                payStatus:'ALREADY_PAY',
                userId:this.options.userId,
                pageNum:this.data.pageNum,
                pageSize:this.data.pageSize,
            },
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
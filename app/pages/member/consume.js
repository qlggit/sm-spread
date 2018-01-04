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
                    title:'场所',
                    name:'place',
                    width:'150'
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
        this.setData({
            showMainWidth:WY.common.sum(this.data.searchData.showList , function(a){
                return a.width || 0;
            }),
        })
    },
    doSearch:function(){
        var that = this;
        WY.request({
            url:WY.url.order.seat,
            data:{
                pageNum:this.data.pageNum,
                pageSize:this.data.pageSize,
            },
            success:function(a){
                a.data.list.forEach(function(a){
                    a.date = WY.common.parseDate(a.bookTime , 'Y-m-d');
                    a.place = a.supplierName;
                    a.amount = a.lowCostAmount && a.lowCostAmount.turnMoney();
                });
                that.setData({
                    pageData:that.data.pageData.concat(a.data.list),
                    tableDataAble:1
                })
            }
        })
    }
});
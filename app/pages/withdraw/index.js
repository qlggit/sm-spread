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
                    width:'30'
                },
                {
                    title:'金额',
                    name:'amount',
                    width:'30'
                },
                {
                    title:'状态',
                    name:'status',
                    width:'30'
                },
            ]
        },
        dataList:[{

        },{

        }],
        pageData:[],
        menuCurrent:0
    },
    onLoad:function(options){
        WY.wxInit(this , {
            pickerChangeHandler:['startDate','endDate']
        });
        var data = [];
        for(var i=0;i<5;i++){
            data.push({
                date:WY.common.parseDate(new Date(Date.now() - 3600 * 1000 * 24 * Math.ceil((Math.random()*1000))),'Y-m-d'),
                amount:Math.ceil(Math.random()*10000),
                status:['申请中','提现中','已完成'].sort(function(){return .5 - Math.random()}).pop()
            })
        }
        this.setData({
            pageData:data
        })
    }
});
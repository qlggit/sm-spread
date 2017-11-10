var WY = global.WY;
Page({
    name:'member-index',
    data:{
        menuList:[
            {
                name:'会员'
            },
            {
                name:'下级'
            },
            {
                name:'场所'
            },
            {
                name:'提现'
            },
            {
                name:'赠送'
            }
        ],
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
                    title:'名称',
                    name:'name',
                    width:'20'
                },
                {
                    title:'次数',
                    name:'count',
                    width:'20'
                },
                {
                    title:'金额',
                    name:'amount',
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
            pickerChangeHandler: ['startDate', 'endDate']
        });
        var data = [];
        for(var i=0;i<5;i++){
            data.push({
                name:'name' + i,
                count:Math.random() * 100 | 0,
                amount:Math.random() * 1000 | 0
            })
        }
        this.setData({
            pageData:data
        })
    }
});
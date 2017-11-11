var WY = global.WY;
Page({
    name:'member-index',
    data:{
        searchData:{
            list:[
                {
                    title:'场所名称',
                    name:'name',
                },
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
                    width:'20'
                },
                {
                    title:'场所',
                    name:'place',
                    width:'20'
                },
                {
                    title:'金额',
                    name:'amount',
                    width:'20'
                },
                {
                    title:'操作',
                    type:'btn',
                    width:'20',
                    navigateTo:'/pages/member/consume-list'
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
        var data = [];
        for(var i=0;i<5;i++){
            data.push({
                date:WY.common.randomDate(),
                place:WY.common.randomArray() + '酒吧',
                amount:WY.common.randomInt(10000,1000)
            })
        }
        this.setData({
            pageData:data,
            tableDataAble:1
        })
    }
});
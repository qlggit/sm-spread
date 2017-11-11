var WY = global.WY;
Page({
    name:'member-index',
    data:{
        searchData:{
            showList:[
                {
                    title:'名称',
                    name:'name',
                    width:'20'
                },
                {
                    title:'数量',
                    name:'count',
                    width:'20'
                },
                {
                    title:'单价',
                    name:'price',
                    width:'20'
                },
                {
                    title:'金额',
                    name:'amount',
                    width:'20'
                },
                {
                    title:'时间',
                    name:'pushDate',
                    width:'20'
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
                name:WY.common.randomArray()+'酒',
                count:WY.common.randomInt(10),
                price:WY.common.randomInt(1000 , 10),
                amount:WY.common.randomInt(2000 , 10),
                pushDate:WY.common.randomDate()
            })
        }
        this.setData({
            pageData:data,
            tableDataAble:1
        })
    }
});
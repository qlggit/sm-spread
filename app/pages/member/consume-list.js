var WY = global.WY;
Page({
    name:'member-index',
    data:{
        searchData:{
            showList:[
                {
                    title:'名称',
                    name:'name',
                    width:'150'
                },
                {
                    title:'数量',
                    name:'count',
                    width:'150'
                },
                {
                    title:'单价',
                    name:'price',
                    width:'150'
                },
                {
                    title:'金额',
                    name:'amount',
                    width:'150'
                },
                {
                    title:'时间',
                    name:'pushDate',
                    width:'150'
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
            showMainWidth:WY.common.sum(this.data.searchData.showList , function(a){
                return a.width || 0;
            }),
            pageData:data,
            tableDataAble:1
        })
    }
});
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
            }
        ],
        searchData:{
            list:[
                {
                    title:'昵称',
                    name:'nickname',
                },
                {
                    title:'电话',
                    name:'phone',
                },
                {
                    title:'上级',
                    name:'parentPhone',
                }
            ],
            showList:[
                {
                    title:'Id',
                    name:'id',
                    width:'20'
                },
                {
                    title:'昵称',
                    name:'nickname',
                    width:'20'
                },
                {
                    title:'手机号',
                    name:'phone',
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
        WY.wxInit(this);
        var data = [];
        for(var i=0;i<5;i++){
            data.push({
                nickname:'nickname' + i,
                id:'id'+i,
                phone:1334567890+''+i
            })
        }
        this.setData({
            pageData:data
        })
    }
});
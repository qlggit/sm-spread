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
                    width:'150'
                },
                {
                    title:'昵称',
                    name:'nickname',
                    width:'150'
                },
                {
                    title:'手机号',
                    name:'phone',
                    width:'300'
                },
                {
                    title:'金额',
                    name:'money',
                    width:'150'
                },
                {
                    title:'会员等级',
                    name:'lvl',
                    width:'150'
                },
                {
                    title:'操作',
                    type:'btn',
                    btn:[{
                        navigateTo:'/pages/member/consume',
                        code:'',
                        name:'详情'
                    }]
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
                phone:1334567890+''+i,
                money:WY.common.randomInt(100 , 10000),
                lvl:WY.common.randomInt(1 , 10)
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
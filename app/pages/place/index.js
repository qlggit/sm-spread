var WY = global.WY;
Page({
    name:'member-index',
    data:{
        menuList:[
            {
                name:'我的'
            },
            {
                name:'所有'
            }
        ],
        searchData:{
            list:[
                {
                    title:'名称',
                    name:'name',
                },
                {
                    title:'类型',
                    name:'type',
                    type:'picker',
                    pickerData:{
                        mode:'selector',
                        value:0,
                        range:['有额度','无额度'],
                    }
                }
            ],
            showList:[
                {
                    title:'Id',
                    name:'id',
                    width:'200'
                },
                {
                    title:'昵称',
                    name:'nickname',
                    width:'200'
                },
                {
                    title:'手机号',
                    name:'phone',
                    width:'200'
                },
                {
                    title:'手机号',
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
        WY.wxInit(this, {
            pickerChangeHandler:['type']
        });
        var data = [];
        for(var i=0;i<5;i++){
            data.push({
                nickname:'nickname' + i,
                id:'id'+i,
                phone:1334567890+''+i
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
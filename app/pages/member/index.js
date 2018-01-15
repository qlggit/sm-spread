var WY = global.WY;
Page({
    name:'member-index',
    data:{
        menuList:[
            {
                name:'会员'
            },
            {
                name:'商家'
            }
        ],
        searchData:{
            list:[
                {
                    title:'昵称',
                    name:'nickname',
                }
            ],
            showList:[
                {
                    title:'昵称',
                    name:'nickname',
                    width:'150'
                },
                {
                    title:'消费',
                    name:'totalCostAmount',
                    width:'150'
                },
                {
                    title:'性别',
                    name:'gender',
                    width:'100',
                    enumData:{
                        3:'未知',
                        1:'男',
                        2:'女',
                    }
                },
                {
                    title:'地区',
                    name:'cityName',
                    width:'150'
                },
                {
                    title:'等级',
                    name:'lvl',
                    width:'100'
                },
                {
                    title:'操作',
                    type:'btn',
                    btn:[{
                        navigateTo:'/pages/member/consume',
                        code:'',
                        params:{userId:''},
                        name:'详情'
                    }]
                },
            ]
        },
        pageData:[],
        menuCurrent:0,
        pageNum:1,
        tableDataAble:0,
        autoSearch:{},
    },
    onLoad:function(options){
        WY.wxInit(this);
        this.setData({
            showMainWidth:WY.common.sum(this.data.searchData.showList , function(a){
                return a.width || 0;
            }),
        });
        var that = this;
        WY.oneReadyOnce('user-info' , function(data){
            that.doSearch();
        }, this);
    },
    doSearch:function(data){
        data = data || this.data.autoSearch;
        this.data.autoSearch = data;
        data.pageNum = this.data.pageNum;
        var that = this;
        WY.request({
            url:WY.url.member.spreadLs,
            data:data,
            success:function(a){
                console.log(a);
                that.pageDataHandler(a,function(a){
                    a.genderName = WY.enum.text('gender',a.gender);
                    return a;
                });
                that.setAllPageData(a);
            }
        })
    },
});
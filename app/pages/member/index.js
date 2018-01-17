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
        pageData:[],
        pageNum:1,
        searchValue:''
    },
    onLoad:function(options){
        WY.wxInit(this);
        var that = this;
        WY.oneReadyOnce('user-info' , function(data){
            that.doSearch();
        }, this);
    },
    searchInput:function(e){
        this.data.searchValue = e.detail.value;
    },
    doSearch:function(e){
        var data = {};
        if(e){
            this.reset();
        }
        data.pageNum = this.data.pageNum;
        var searchValue = this.data.searchValue;
        if(searchValue){
            if(/^1\d{10}$/.test(searchValue)){
                data.moblie = searchValue;
            }else{
                data.nickname = searchValue;
            }
        }
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
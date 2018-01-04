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
                    name:'supplierName',
                },
                {
                    title:'类型',
                    name:'typeCode',
                    type:'picker',
                    pickerData:{
                        mode:'selector',
                        value:0,
                        range:Object.values(WY.enumData.typeCode),
                    }
                }
            ],
            showList:[
                {
                    title:'序号',
                    name:'showIndex',
                    width:'100'
                },
                {
                    title:'名称',
                    name:'supplierName',
                    width:'200'
                },
                {
                    title:'地址',
                    name:'supplierAddr',
                    width:'300'
                },
                {
                    title:'星级',
                    name:'supplierStar',
                    width:'100'
                },
                {
                    title:'类型',
                    name:'typeCode',
                    width:'100',
                    enumData:WY.enumData.typeCode
                },
                {
                    title:'操作',
                    type:'btn',
                    btn:[{
                        tap:'openLocation',
                        data:{

                        },
                        dataset:['gps-dimension','gps-longitude'],
                        code:'',
                        name:'位置'
                    }]
                },
            ]
        },
        notBtn:1,
        menuCurrent:0
    },
    onLoad:function(options){
        WY.wxInit(this, {
            pickerChangeHandler:['typeCode']
        });
        this.setData({
            showMainWidth:WY.common.sum(this.data.searchData.showList , function(a){
                return a.width || 0;
            })
        });
        var that = this;
        WY.oneReady('get-location-wgs84' , function(data){
        }, this);
        WY.oneReady('user-info' , function(data){
            that.doSearch();
        }, this);
    },
    onUnload:function(){
        WY.oneUnBind(this);
    },
    doSearch:function(data){
        data = data || {};
        data.pageNum = this.data.pageNum;
        data.lat = WY.locationData.latitude;
        data.lon = WY.locationData.longitude;
        if(data.typeCode)data.typeCode = WY.enum.indexKey('typeCode',data.typeCode);
        var that = this;
        WY.request({
            url:WY.url.merchant.list,
            data:data,
            success:function(a){
                that.setPageData(a)
            }
        })
    }
});
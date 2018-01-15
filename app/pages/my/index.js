var WY = global.WY;
Page({
    data:{
        userInfo:'',
        current:0
    },
    onLoad:function(options){
        WY.wxInit(this);
        var that = this;
        WY.oneReady('user-info',function(userInfo){
            that.setData({
                userInfo:userInfo
            })
        },this);
    },
    onPullDownRefresh:function(){
        WY.trigger('user-info-flush')
    }
});
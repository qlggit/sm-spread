var WY = global.WY;
Page({
    name:'withdraw-index',
    data:{
        balance:0
    },
    onLoad:function(options){
        WY.wxInit(this);
        var that = this;
        WY.oneReady('user-info',function(){
            that.setData({
                balance:WY.session.userInfo.balance.turnMoney(),
            });
        });
    }
});
var WY = global.WY;
Page({
    data:{
        current:0
    },
    onShareAppMessage:function(){
        return WY.onShareAppMessage();
    },
    onLoad:function(options){
        WY.wxInit(this);
    }
});
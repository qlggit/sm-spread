var WY = global.WY;
Page({
    data:{
        current:0
    },
    onLoad:function(options){
        WY.wxInit(this);
    }
});
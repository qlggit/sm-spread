var WY = global.WY;
var qrcode = require('../../js/ui/qrcode');
Page({
    data:{
        canvasWidth:0,
        current:0
    },
    onShareAppMessage:function(){
        return WY.onShareAppMessage();
    },
    onLoad:function(options){
        WY.wxInit(this);
        var width = WY.systemInfo.windowWidth * .8;
        this.setData({
            canvasWidth:width
        });
        var canvas = wx.createCanvasContext('my-canvas');
        WY.qrcode(canvas , {
            text:'http://wx.yukew.com/spread/'+WY.session.userInfo.tokenModel.userId,
            width:width,
            height:width
        });
    }
});
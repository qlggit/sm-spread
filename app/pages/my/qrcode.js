var WY = global.WY;
var qrcode = require('../../js/ui/qrcode');
Page({
    data:{
        canvasWidth:0,
        current:0,
        userInfo:'',
    },
    onShareAppMessage:function(){
        return WY.onShareAppMessage();
    },
    onLoad:function(options){
        WY.wxInit(this);
        var width = 200;
        this.setData({
            canvasWidth:width
        });
        var canvas = wx.createCanvasContext('my-canvas');
        WY.qrcode(canvas , {
            text:WY.config.spreadUrl + '/server/qrcode/spread/' + WY.session.userInfo.userId,
            width:width,
            height:width
        });
        var that = this;
        WY.oneReady('user-info',function(userInfo){
            that.setData({
                userInfo:userInfo
            })
        },this);
    }
});
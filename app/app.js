App(
    {
        onLaunch: function(options) {
            global.WY = require('js/lib/wy');
            global.WY.systemInfo = wx.getSystemInfoSync();
        },
        onShow: function(options) {
            global.WY.ready('appShow');
        },
        onHide: function() {
            // Do something when hide.
        },
        onError: function(msg) {
            console.log(msg)
        },
        globalData:{

        }
    }

);
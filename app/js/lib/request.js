var request = function(options){
    var header = options.header = options.header || {};
    var done = options.done;
    var success = options.success;
    var error = options.error;
    if(options.method === 'POST' && options.notBody){
        header['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    console.log('request');
    console.log(options);
    wx.request(Object.assign({},options,{
        success:function(res){
            var data = global.WY.common.parse(res.data);
            if(data && (data.code === '10000' || data.code === 0)){
                success && success(data);
            }else{
                global.WY.toast(data && data.message || '系统繁忙！' , 1);
            }
            done && done(res);
        },
        error:function(e){
            error && error(e);
            done && done(null , e);
        }
    }));
};
var sessionId;
request.init = function(WY){
    WY.bind('sessionId' , function(id){
        console.log('sessionId' , id);
        sessionId = id;
    });
};
request.clearSessionId = function(){
    sessionId = null;
};
module.exports = request;
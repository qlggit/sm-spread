module.exports = function(config){
    var h5api = config.h5api;
    var appapi = config.appapi;
    return {
        login:{
            sessionKey :h5api + '/wechat/jscode/smspread',
            login :appapi + '/api/user/v_1/login',
            bind :appapi + '/api/user/v_1/bindPhone',
        },
        de:{
            info :h5api + '/wechat/key/de/smspread',
        },
        merchant:{
            list :appapi + '/api/supplier/v_1/list',
        },
        member:{
            list:appapi + '/mgr/user/v_1/list',
        },
        sms:{
            send:appapi + '/api/sms/v_1/send',
            check:appapi + '/api/sms/v_1/invalidSms',
        },
        order:{
            seat:appapi + '/api/seat/v_1/orderList',
            infoBySeat:appapi + '/api/shopping/v_1/orderGoodsInfo',
        },
    }
};
module.exports = function(config){
    var h5api = config.h5api;
    var appapi = config.appapi;
    return {
        login:{
            sessionKey :appapi + '/wechat/jscode/smspread',
            login :appapi + '/api/user/v_1/login',
            bind :appapi + '/api/user/v_1/bindPhone',
            infoById :appapi + '/api/user/v_1/infoById',
        },
        de:{
            info :appapi + '/wechat/key/de/smspread',
        },
        merchant:{
            list :appapi + '/api/supplier/v_1/list',
        },
        member:{
            list:appapi + '/mgr/user/v_1/list',
            spreadLs:appapi + '/mgr/supplier/staff/v_1/spreadLs',
        },
        sms:{
            send:appapi + '/api/sms/v_1/send',
            check:appapi + '/api/sms/v_1/invalidSms',
        },
        order:{
            seat:appapi + '/api/seat/v_1/orderList',
            seatInfo:appapi + '/api/seat/v_1/info',
            infoBySeat:appapi + '/api/shopping/v_1/orderGoodsInfo',

            give:appapi + '/api/give/v_1/give',
            giveInfo:appapi + '/api/give/v_1/list',
            giveAmount:appapi + '/api/give/v_1/spreadInfolist',
        },
        product:{
            list:appapi + '/product/spread',
        },
        withdraw:{
            do:appapi + '/api/withdraw/v_1/apply',
            info:appapi + '/api/withdraw/v_1/info',
            list:appapi + '/api/withdraw/v_1/list',
        },
    }
};
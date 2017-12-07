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
    }
};
module.exports = function(WY){
    WY.session = {};
    var sessionKeyData = WY.session.sessionKeyData = WY.common.parse(wx.getStorageSync('sessionKeyData') || '');
    var loginData = WY.session.loginData = WY.common.parse(wx.getStorageSync('loginData') || '');
    var userInfo = WY.session.userInfo = WY.common.parse(wx.getStorageSync('userInfo') || '');
    function login(){
        wx.login({
            success: function(res) {
                console.log(res);
                if (res.code) {
                    WY.ready('has-login');
                    getSessionKey(res.code);
                } else {

                }
            }
        });
    }
    function getSessionKey(code){
        WY.request({
            url:WY.url.login.sessionKey,
            data:{
                js_code:code
            },
            success:function(data){
                console.log(data);
                sessionKeyData = data;
                wx.setStorageSync('sessionKeyData',JSON.stringify(sessionKeyData));
                WY.session.sessionKeyData = sessionKeyData;
                getUserInfo();
            }
        });
    }
    function checkSession(){
        wx.checkSession({
            success:function(){
                WY.ready('has-login');
                if(userInfo){
                    WY.ready('user-info',userInfo);
                    checkPhone();
                    return;
                }
                if(loginData){
                    checkUser();
                    return;
                }
                if(sessionKeyData){
                    getUserInfo();
                    return;
                }
                login();
            },
            fail:function(){
                login();
            }
        })
    }
    WY.bind('check-session',checkSession);
    function getUserInfo(){
        wx.getUserInfo({
            withCredentials:1,
            success:function(res){
                console.log(res);
                deInfo(res , function(data){
                    loginData = data.data;
                    wx.setStorageSync('loginData',JSON.stringify(loginData));
                    WY.session.loginData = loginData;
                    checkUser();
                });
            }
        })
    }
    function deInfo(options , call){
        WY.request({
            url:WY.url.de.info,
            data:{
                encryptedData:options.encryptedData,
                iv:options.iv,
                sessionKey:sessionKeyData.session_key,
            },
            method:'POST',
            success:function(data){
                call && call(data);
            }
        });
    }
    WY.bind('de-key-info' , deInfo);
    var hasDoLogin;
    function checkUser(){
        WY.request({
            url:WY.url.login.login,
            data:{
                deviceType :'xcx',
                headImg :loginData.avatarUrl,
                nickname  :loginData.nickName,
                openId   :loginData.openId ,
                sType    :'weixin'  ,
                uid     :loginData.unionId ,
            },
            method:'POST',
            success:function(data){
                hasDoLogin = 1;
                userInfo = data.result;
                wx.setStorageSync('userInfo',JSON.stringify(userInfo));
                WY.session.userInfo = userInfo;
                checkPhone();
            }
        });
    }
    function checkPhone(){
        if(!userInfo.mobile){
            if(!hasDoLogin)return checkUser();
            WY.ready('do-bind-phone');
        }
    }
    WY.bind('send-bind-phone' , function(phone , call){
        WY.request({
            url:WY.url.login.bind,
            method:'POST',
            data:{
                userId:WY.session.userInfo.tokenModel.userId,
                phone:phone
            },
            notBody:1,
            success:function(a){
                WY.session.userInfo.mobile = phone;
                WY.newToast(a.message);
                call && call(a.code - 0 === 10000);
            }
        })
    })
};
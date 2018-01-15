module.exports = function(WY){
    var session = WY.session = {};
    var sessionKeyData = session.sessionKeyData = WY.common.parse(wx.getStorageSync('sessionKeyData') || '');
    var loginData = session.loginData = WY.common.parse(wx.getStorageSync('loginData') || '');
    var userInfo = session.userInfo = WY.common.parse(wx.getStorageSync('userInfo') || '');
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
                session.sessionKeyData = sessionKeyData;
                getUserInfo();
            },
        });
    }
    function checkSession(){
        wx.checkSession({
            success:function(){
                WY.ready('has-login');
                if(userInfo || loginData){
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
                    session.loginData = loginData;
                    checkUser();
                });
            },
            fail:function(){
                console.log('getUserInfo fail');
                global.WY.newToast('您已拒绝使用此产品')
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
                stype     :'weixin'  ,
                sType     :'weixin'  ,
                uid     :loginData.unionId ,
                gender      :loginData.gender  ,
            },
            method:'POST',
            success:function(data){
                wx.stopPullDownRefresh();
                hasDoLogin = 1;
                userInfo = data.result;
                checkPhone();
            }
        });
    }
    function checkPhone(){
        if(!userInfo.mobile){
            if(!hasDoLogin)return checkUser();
            WY.ready('do-bind-phone');
        }else{
           WY.trigger('bind-phone-success');
        }
    }
    WY.bind('bind-phone-success',function(){
        wx.setStorageSync('userInfo',JSON.stringify(userInfo));
        session.userInfo = userInfo;
        WY.ready('user-info',userInfo);
    });
    WY.bind('send-bind-phone' , function(phone , call){
        WY.request({
            url:WY.url.login.bind,
            method:'POST',
            data:{
                userId:userInfo.tokenModel.userId,
                phone:phone,
                sType:'weixin',
                bindWay:'y',
                uid:loginData.unionId
            },
            notBody:1,
            success:function(a){
                userInfo = session.userInfo = a.result;
                WY.ready('user-info' , session.userInfo);
                WY.toast(a.message);
                WY.trigger('bind-phone-success');
                call && call(1);
            }
        })
    });
    WY.bind('request-error-401',function(){
        checkUser();
    });
    WY.session.getTokenInfo = function(){
        userInfo = session.userInfo || userInfo ;
        if(!userInfo)return '';
       return [userInfo.tokenModel.userId,userInfo.tokenModel.token].join('_');
    };
    WY.bind('user-info-flush',checkUser);
    WY.ready('wx-authorize-userInfo',checkSession);
    WY.session.isOwner = function(userId){
        return userId === session.userInfo.userId.split('-')[0];
    }
};
module.exports = function(WY){
    WY.loading = function(msg){
        wx.showLoading({
            title:msg || '加载中',
            mask:true
        })
    };
    WY.toast = function(msg , type){
        var sendData;
        if(typeof msg ==='object'){
            sendData = msg;
            if(sendData.done){
                setTimeout(sendData.done , sendData.duration || 1500);
            }
        }
        else{
            if(msg)msg+='';
            sendData = {
                title:msg || '加载中',
                mask:true,
            };
        }
        if(type || sendData.type){
            sendData.image = '/images/warn.png'
        }
        wx.showToast(sendData)
    };
    WY.newToast = function(msg , delay){
        msg+='';
        WY.trigger('wy-toast' , msg , delay);
    };
    WY.onShareAppMessage = function(title , url){
        return {
            title: title||'娱客',
            path: url || '/pages/index',
            success: function(res) {
                // 转发成功
            },
            fail: function(res) {
                // 转发失败
            }
        };
    };
    //绑定事件相关
    WY.oneReady = function(type , func , oneObj){
        oneObj.vueWyHandler = oneObj.vueWyHandler || [];
        oneObj.vueWyHandler.push(oneObj);
        WY.ready(type , func);
    };
    WY.oneReadyOnce = function(type , func , oneObj){
        oneObj.vueWyHandler = oneObj.vueWyHandler || [];
        oneObj.vueWyHandler.push(oneObj);
        WY.readyOnce(type , func);
    };
    WY.oneBind = function(type , func , oneObj){
        oneObj.vueWyHandler = oneObj.vueWyHandler || [];
        oneObj.vueWyHandler.push(oneObj);
        WY.bind(type , func);
    };
    WY.oneUnBind = function(oneObj){
        var vueWyHandler = oneObj.vueWyHandler;
        if(vueWyHandler){
            vueWyHandler.forEach(function(a){
                WY.clearBind(a);
            })
        }
    };
    WY.wxInit = function(wxObj , options){
        options = options || {};
        wxObj.allEventHandler = function(){

        };
        wxObj.menuChange = function(e){
            this.setData({
                menuCurrent:e.target.dataset.index
            });
        };
        wxObj.onUnload = function(){
            console.log('on unload');
            WY.oneUnBind(this);
        };
        wxObj.menuSwiperCurrentChange = function(e){
            this.setData({
                menuCurrent:e.detail.current
            });
        };
        wxObj.navigateTo = function(e){
            var link = e.currentTarget.dataset.link || e.target.dataset.link;
            if(link)wx.navigateTo({
                url:e.currentTarget.dataset.link || e.target.dataset.link
            });
        };
        wxObj.tableScroll = function(e){
            this.setData({
                tableScrollLeft:e.detail.scrollLeft,
                tableScrollTop:e.detail.scrollTop,
            })
        };
        if(!wxObj.formReset){
            wxObj.formReset = function(){
                console.log('formReset');
                var searchData = this.data.searchData;
                console.log(searchData);
                var hasPickerReset = 0;
                searchData.list.forEach(function(a){
                    if(a.type === 'picker'){
                        hasPickerReset = 1;
                        a.pickerData.value = 0;
                    }
                });
                console.log(searchData);
                if(hasPickerReset)this.setData({
                    searchData:searchData
                })
            }
        }
        function pickerChange(name){
            return function(e){
                var searchData = this.data.searchData;
                var list;
                if(Array.isArray(searchData)){
                    list = searchData[this.menuCurrent].list;
                }else{
                    list = searchData.list;
                }
                if(list && !list.every(function(a){
                        if(a.type === 'picker' && a.name === name){
                            a.pickerData.value = e.detail.value;
                            return false;
                        }
                        return true;
                    }))
                    this.setData({
                        searchData:searchData
                    })
            }
        }
        if(options.pickerChangeHandler){
            options.pickerChangeHandler.forEach(function(a){
                wxObj[a+'PickerChange'] = pickerChange(a);
            });
        }



        wxObj.getPhoneNumber = function(data){
            if(data.iv)WY.trigger('de-key-info',data , function(o){
                wxObj.writePhoneNumber = o.purePhoneNumber;
                wxObj.setData({
                    bindPhoneNumber:o.purePhoneNumber,
                })
            });
        };
        WY.ready('do-bind-phone' , function(){
            wxObj.setData({
                doBindPhone:1,
            })
        });
        wxObj.inputPhoneNumber = function(e){
            this.writePhoneNumber = e.detail.value;
        };
        wxObj.doBindPhone = function(e){
            var data = e.detail.value;
            if(!data.phone || !/^1\d{10}$/.test(data.phone)){
                WY.toast('请输入有效的手机号！');
                return false;
            }
            if(!data.sendCode || !/^\d{6}$/.test(data.sendCode)){
                WY.toast('请输入有效的验证码！');
                return false;
            }
            WY.trigger('send-bind-phone' , data.phone , function(){
                wxObj.setData({
                    doBindPhone:0,
                });
            });
        };
        wxObj.sendSms = function(){
            var phone = this.writePhoneNumber;
            if(!phone || !/^1\d{10}$/.test(phone)){
                WY.toast('请输入有效的手机号！');
                return false;
            }
        };
        WY.trigger('check-session' );
        var toastTimer;
        WY.oneBind('wy-toast' ,function(txt , delay){
            clearTimeout(toastTimer);
            wxObj.setData({
                doShowToast:1,
                showToastContent:txt
            });
            toastTimer = setTimeout(function(){
                wxObj.setData({
                    doShowToast:0
                })
            } , delay || 1500);
        } , wxObj);
    }
};
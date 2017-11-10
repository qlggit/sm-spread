module.exports = function(WY){
    WY.loading = function(msg){
        wx.showLoading({
            title:msg || '加载中',
            mask:true
        })
    };
    WY.toast = function(msg , type){
        var sendData;
        if(typeof msg =='object'){
            sendData = msg;
            if(sendData.done){
                setTimeout(sendData.done , sendData.duration || 1500);
            }
        }
        else sendData = {
            title:msg || '加载中',
            mask:true,
        };
        if(type || sendData.type){
            sendData.image = '/images/warn.png'
        }
        wx.showToast(sendData)
    };
    WY.onShareAppMessage = function(title , url){
        return {
            title: title||'图片识别',
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
            console.log(e);
            this.setData({
                menuCurrent:e.detail.current
            });
        }
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
    }
};
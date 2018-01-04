module.exports = function(WY){
    var hasAuthorize = {};
    var authorizeSuccessCount = 0;
    var authorizeCompleteCount = 0;
    function doAuthorize(key , sts){
        if(!sts && hasAuthorize[key]){
            authorizeCompleteCount++;
            authorizeSuccessCount++;
            checkAuthorize();
            return false;
        }
        wx.authorize({
            scope:'scope.'+key,
            success:function(){
                hasAuthorize[key] = 1;
                WY.ready('wx-authorize-'+key);
                authorizeSuccessCount++;
            },
            fail:function(){

            },
            complete:function(){
                authorizeCompleteCount++;
                checkAuthorize();
            }
        });
    }
    function checkAuthorize(){
        if(authorizeCompleteCount >= authorizeType.length){
            if(authorizeSuccessCount < authorizeType.length){
                openSetting();
            }
        }
    }
    function openSetting(){
        wx.openSetting({
            success:function(e){
                getSetting();
            }
        })
    }
    var authorizeType = ['userInfo','userLocation'];
    function doAuthorizeAll(){
        authorizeType.forEach(function(a){
            doAuthorize(a);
        })
    }
    function getSetting(){
        wx.getSetting({
            success:function(e){
                authorizeType.every(function(a){
                    if( ! e.authSetting['scope.' + a ]){
                        hasAuthorize[a] = 0;
                        checkAuthorize();
                        return false
                    }else{
                        authorizeCompleteCount --;
                        doAuthorize(a);
                        return true;
                    }
                });
            }
        })
    }
    doAuthorizeAll();
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
            var dataset = e.currentTarget.dataset;
            var link = dataset.link;
            console.log(dataset);
            if(link){
                var item = dataset.item;
                var params = dataset.params;
                if(params){
                    link = WY.common.addUrlParam(link , WY.common.copyProp(item,params))
                }
                wx.navigateTo({
                    url:link
                });
            }
        };
        wxObj.tableScroll = function(e){
            this.setData({
                tableScrollLeft:e.detail.scrollLeft,
                tableScrollTop:e.detail.scrollTop,
            })
        };
        if(!wxObj.searchFormReset){
            wxObj.searchFormReset = function(){
                console.log('searchFormReset');
                var searchData = this.data.searchData;
                var hasPickerReset = 0;
                searchData.list.forEach(function(a){
                    if(a.type === 'picker'){
                        hasPickerReset = 1;
                        a.pickerData.value = 0;
                    }
                });
                if(hasPickerReset)this.setData({
                    searchData:searchData
                })
            }
        }
        if(!wxObj.searchFormSubmit){
            wxObj.searchFormSubmit = function(e){
                console.log('searchFormSubmit');
                this.reset();
                this.doSearch(e.detail.value);
            }
        }
        if(!wxObj.showPrev){
            wxObj.showPrev = function(e){
                if(e.target.dataset.status - 0 === 1){
                    wxObj.setData({
                        pageNum:wxObj.data.pageNum - 1,
                        pageData:[],
                    });
                    wxObj.doSearch();
                }
            }
        }
        if(!wxObj.showNext){
            wxObj.showNext = function(e){
                if(e.target.dataset.status - 0 === 1){
                    wxObj.setData({
                        pageNum:wxObj.data.pageNum + 1,
                        pageData:[],
                    });
                    wxObj.doSearch();
                }
            }
        }
        if(!wxObj.setPageData){
            wxObj.setPageData = function(a){
                wxObj.setData({
                    pageData:a.result.list,
                    tableDataAble:1,
                    totalData:a.result
                })
            }
        }
        if(!wxObj.reset){
            wxObj.setData({
                pageNum:1,
                pageSize:10,
                pageData:[],
            });
            wxObj.reset = function(){
                this.data.pageNum = 1;
                this.data.pageData = [];
            }
        }
        if(!wxObj.pageDataScrollToLower){
            wxObj.pageDataScrollToLower = function(){
                this.data.pageNum++;
                this.doSearch();
            }
        }
        if(!wxObj.openLocation){
            wxObj.openLocation = function(e){
                var item = e.target.dataset.item;
                var gps = WY.wgs84togcj02(item.gpsLongitude - 0,item.gpsDimension - 0);
                console.log(item);
                console.log(gps);
                wx.openLocation({
                    latitude:gps[1],
                    longitude:gps[0],
                    name:item.supplierName,
                });
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
            data.sendType = 'BINDING';
            WY.request({
                url:WY.url.sms.check,
                data:data,
                method:'POST',
                notBody:1,
                success:function(a){
                    WY.trigger('send-bind-phone' , data.phone , function(){
                        wxObj.setData({
                            doBindPhone:0,
                        });
                    });
                }
            })
        };
        wxObj.sendSms = function(e){
            if(wxObj.smsDisabled)return false;
            var phone = this.writePhoneNumber;
            if(!phone || !/^1\d{10}$/.test(phone)){
                WY.toast('请输入有效的手机号！');
                return false;
            }
            WY.request({
                url:WY.url.sms.send,
                data:{
                    sendType:'BINDING',
                    phone:phone,
                },
                method:'POST',
                notBody:1,
                success:function(a){
                    wxObj.smsDisabled = 1;
                    WY.timer(e.target , 0 , function(){
                        wxObj.smsDisabled = 0;
                    });
                }
            })
        };
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
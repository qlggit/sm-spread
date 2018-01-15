var WY = global.WY;
Page({
    name:'withdraw-info',
    data:{
        balance:0,
        withdrawTypes:[
            {title:'支付宝',code:'alipay'},
            {title:'微信',code:'weixin'},
        ],
        withdrawTypeIndex:0,
    },
    onLoad:function(options){
        WY.wxInit(this );
        this.setData({
            balance:WY.session.userInfo.balance.turnMoney()
        })
    },
    withdrawTypeValue:function(e){
        this.setData({
            withdrawTypeIndex:e.detail.value-0
        })
    },
    doWithdraw:function(e){
        var data = e.detail.value;
        console.log(data);
        if(!data.amount){
            WY.newToast('请输入提现金额');
            return false;
        }
        if(data.amount < 100){
            WY.newToast('最低提现金额100');
            return false;
        }
        if(data.amount > this.data.balance){
            WY.newToast('余额不足');
            return false;
        }
        if(!data.account){
            WY.newToast('请输入提现账号');
            return false;
        }
        data.type = this.data.withdrawTypes[this.data.withdrawTypeIndex].code;
        data.applyContent = '';
        data.amount *= 100;
        WY.request({
            url:WY.url.withdraw.do,
            data:data,
            method:'POST',
            success:function(a){
                WY.trigger('user-info-flush');
                WY.toast('申请成功');
                WY.navigateBack();
            }
        })
    }
});
module.exports = function(WY){
    WY.enumData = {
        typeCode:{
            '':'全部',
            bar:'酒吧',
            clear:'清吧',
            ktv:'KTV',
        },
        gender:{
            1:'男',
            2:'女',
            3:'未知',
        },
        withdrawType:{
            alipay:'支付宝',
            weixin:'微信'
        },
        withdrawStatus:{
            normal:'审核中',
            online:'审核中',
            pass:'审核通过',
            success:'提现成功',
            fail:'提现失败',
            refuse:'退回',
        }
    };
    WY.enum = {
        text:function(key , code){
            var o = WY.enumData[key];
            return o && o[code] || '';
        },
        indexValue:function(key  , index){
            var o = WY.enumData[key];
            return o && o[Object.keys(o)[index]] || '';
        },
        indexKey:function(key  , index){
            var o = WY.enumData[key];
            return o && Object.keys(o)[index] || '';
        }
    }
};
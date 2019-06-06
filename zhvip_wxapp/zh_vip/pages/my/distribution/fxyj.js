var app = getApp();

Page({
    data: {
        open: !0,
        txtype: 1,
        zhtext: "支付宝帐号",
        zhtstext: "请输入支付宝帐号",
        zhtype: "number",
        disabled: !1,
        logintext: "提现",
        fwxy: !0
    },
    lookck: function() {
        this.setData({
            fwxy: !1
        });
    },
    queren: function() {
        this.setData({
            fwxy: !0
        });
    },
    tradeinfo: function() {
        this.setData({
            open: !this.data.open
        });
    },
    radioChange: function(t) {
        console.log("radio发生change事件，携带value值为：", t.detail.value), "zfbtx" == t.detail.value && this.setData({
            txtype: 1,
            zhtext: "支付宝帐号",
            zhtstext: "请输入支付宝帐号",
            zhtype: "number"
        }), "wxtx" == t.detail.value && this.setData({
            txtype: 2,
            zhtext: "微信帐号",
            zhtstext: "请输入微信帐号",
            zhtype: "text"
        }), "yhktx" == t.detail.value && this.setData({
            txtype: 3,
            zhtext: "银行卡号",
            zhtstext: "请输入银行卡号",
            zhtype: "number"
        });
    },
    formSubmit: function(t) {
        var e = this;
        console.log("form发生了submit事件，携带数据为：", t.detail.value);
        var a = wx.getStorageSync("UserData").id, o = Number(this.data.userinfo.money), n = this.data.fxset.tx_rate, i = Number(this.data.fxset.tx_money), s = t.detail.value.je, u = t.detail.value.name, l = t.detail.value.zh, r = t.detail.value.checkbox.length, c = t.detail.value.radiogroup;
        console.log(a, o, n, i, s, u, l, r, c);
        var d = t.detail.formId;
        if (app.util.request({
            url: "entry/wxapp/AddFormId",
            data: {
                user_id: wx.getStorageSync("UserData").id,
                form_id: d
            },
            success: function(t) {
                console.log(t);
            }
        }), "zfbtx" == c) var x = 1;
        if ("wxtx" == c) x = 2;
        if ("yhktx" == c) x = 3;
        var h = Number(t.detail.value.je) * (100 - Number(n)) / 100;
        console.log(h);
        var f = "", p = !0;
        o < i ? f = "佣金满" + i + "才能申请提现" : "" == s ? f = "请填写提现金额！" : Number(s) < i ? f = "提现金额未满足提现要求" : Number(s) > o ? f = "提现金额超出您的实际佣金" : "" == u ? f = "请填写姓名！" : "" == l ? f = "请填写帐号！" : 0 == r ? f = "请阅读并同意分销商提现协议" : (e.setData({
            disabled: !0,
            logintext: "提交中..."
        }), p = !1, app.util.request({
            url: "entry/wxapp/Yjtx",
            cachetime: "0",
            data: {
                user_id: a,
                tx_type: x,
                name: u,
                account: l,
                tx_cost: s,
                sj_cost: h
            },
            success: function(t) {
                console.log(t), 1 == t.data ? (wx.showToast({
                    title: "提交成功"
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "txmx"
                    });
                }, 1e3)) : (wx.showToast({
                    title: "请重试！",
                    icon: "loading"
                }), e.setData({
                    disabled: !1,
                    logintext: "提现"
                }));
            }
        })), 1 == p && wx.showModal({
            title: "提示",
            content: f
        });
    },
    onLoad: function(t) {
        var e = this, a = wx.getStorageSync("UserData").id;
        app.util.request({
            url: "entry/wxapp/FxSet",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), e.setData({
                    fxset: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/GetUserInfo",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                console.log(t), e.setData({
                    userinfo: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/MyCommission",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                console.log(t), e.setData({
                    wdyj: t.data
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.onLoad();
    },
    onReachBottom: function() {}
});